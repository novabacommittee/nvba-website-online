import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MemberService } from '../../../shared/member/member.service';

interface DiffLine { key: string; type: 'added' | 'removed' | 'changed'; before: string; after: string; }

@Component({
  selector: 'app-membereditor',
  templateUrl: './membereditor.component.html',
  styleUrls: ['./membereditor.component.scss']
})
export class MemberEditorComponent implements OnInit {

  loading = true;
  rowData: any[] = [];
  private gridApi: any;

  defaultColDef = { resizable: true, sortable: true, filter: true };
  columnDefs: any[] = [
    { headerName: 'Id', field: 'id', width: 90 },
    { headerName: 'Email', field: 'email', flex: 2, minWidth: 200 },
    { headerName: 'Name', flex: 1, minWidth: 140,
      valueGetter: (p: any) => ((p.data && p.data.firstname || '') + ' ' + (p.data && p.data.lastname || '')).trim() },
    { headerName: 'Expires', field: 'expires', flex: 1, minWidth: 150,
      valueGetter: (p: any) => (p.data && ('expires' in p.data)) ? p.data.expires : '' },
    { headerName: 'Status', field: 'membershipstatus', width: 120 },
    { headerName: 'Actions', field: 'actions', width: 190, sortable: false, filter: false, cellClass: 'me-actions-cell',
      cellRenderer: () => '<button class="me-editbtn">Edit</button><button class="me-refundbtn">Refund</button>' }
  ];

  // ---- Modal state ----
  modalOpen = false;
  selectedKey: string | null = null;
  selectedEmail = '';
  jsonText = '';
  baselineObj: any = {};      // record as last loaded (for compare + concurrency)
  loadedStable = '';
  jsonValid = true;
  jsonError = '';
  statusMsg = '';
  saveMode: 'merge' | 'replace' = 'merge';
  saving = false;
  diff: DiffLine[] = [];
  diffComputed = false;
  log: string[] = [];

  constructor(private mds: MemberService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.mds.GetMembersWithKeys().subscribe((list: any[]) => {
      this.rowData = (list || []).filter(m => m && m.email);
      this.loading = false;
      if (this.gridApi) { this.gridApi.setRowData(this.rowData); }
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.rowData);
  }

  onCellClicked(e: any): void {
    if (!e || !e.data || !e.colDef || e.colDef.field !== 'actions') { return; }
    const cls = (e.event && e.event.target && e.event.target.className) ? String(e.event.target.className) : '';
    if (cls.indexOf('me-refundbtn') !== -1) { this.openRefunds(e.data); }
    else if (cls.indexOf('me-editbtn') !== -1) { this.openEditor(e.data); }
  }

  private stable(o: any): string {
    return JSON.stringify(o, (_k, v) => {
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        return Object.keys(v).sort().reduce((a: any, k) => { a[k] = v[k]; return a; }, {});
      }
      return v;
    });
  }

  openEditor(m: any): void {
    const rec = Object.assign({}, m);
    delete rec.$key;
    this.selectedKey = m.$key;
    this.selectedEmail = m.email;
    this.baselineObj = rec;
    this.jsonText = JSON.stringify(rec, null, 2);
    this.loadedStable = this.stable(rec);
    this.jsonValid = true; this.jsonError = '';
    this.diff = []; this.diffComputed = false;
    this.statusMsg = '';
    this.saveMode = 'merge';
    this.modalOpen = true;
  }

  close(): void { this.modalOpen = false; }

  onJsonChange(): void {
    try { JSON.parse(this.jsonText); this.jsonValid = true; this.jsonError = ''; }
    catch (e: any) { this.jsonValid = false; this.jsonError = String(e && e.message ? e.message : e); }
  }

  validate(): void {
    try { JSON.parse(this.jsonText); this.jsonValid = true; this.jsonError = ''; this.statusMsg = 'Valid JSON.'; }
    catch (e: any) { this.jsonValid = false; this.jsonError = String(e && e.message ? e.message : e); this.statusMsg = ''; }
  }

  loadLatest(): void {
    if (!this.selectedKey) { return; }
    this.mds.getMemberOnce(this.selectedKey).then(fresh => {
      const rec = fresh || {};
      this.baselineObj = rec;
      this.jsonText = JSON.stringify(rec, null, 2);
      this.loadedStable = this.stable(rec);
      this.jsonValid = true; this.jsonError = '';
      this.diff = []; this.diffComputed = false;
      this.statusMsg = 'Loaded latest from database.';
    });
  }

  compare(): void {
    let cur: any;
    try { cur = JSON.parse(this.jsonText); }
    catch (e: any) { this.jsonValid = false; this.jsonError = String(e); this.diff = []; this.diffComputed = true; return; }
    this.jsonValid = true; this.jsonError = '';
    const base = this.baselineObj || {};
    const keys = Array.from(new Set([...Object.keys(base), ...Object.keys(cur)])).sort();
    const out: DiffLine[] = [];
    keys.forEach(k => {
      const inBase = k in base, inCur = k in cur;
      const bs = JSON.stringify(base[k]);
      const cs = JSON.stringify(cur[k]);
      if (inBase && !inCur) { out.push({ key: k, type: 'removed', before: bs, after: '—' }); }
      else if (!inBase && inCur) { out.push({ key: k, type: 'added', before: '—', after: cs }); }
      else if (bs !== cs) { out.push({ key: k, type: 'changed', before: bs, after: cs }); }
    });
    this.diff = out; this.diffComputed = true;
    this.statusMsg = out.length ? (out.length + ' field(s) changed vs loaded baseline.') : 'No changes vs loaded baseline.';
  }

  async save(): Promise<void> {
    if (!this.selectedKey || this.saving) { return; }
    let obj: any;
    try { obj = JSON.parse(this.jsonText); }
    catch (e: any) { this.jsonValid = false; this.jsonError = String(e); this.statusMsg = 'Fix JSON before saving.'; return; }

    this.saving = true;
    const key = this.selectedKey;
    try {
      const current = await this.mds.getMemberOnce(key);
      if (this.stable(current || {}) !== this.loadedStable) {
        const ok = window.confirm(
          'This record CHANGED in the database since you loaded it.\nSaving now overwrites those changes.\n\n' +
          'Recommended: Cancel, click "Load latest", re-apply your edit.\n\nOverwrite anyway?');
        if (!ok) { this.saving = false; return; }
      }
      const summary = this.saveMode === 'replace'
        ? 'REPLACE the entire record for ' + this.selectedEmail + '.\nFields not present will be DELETED.'
        : 'MERGE into ' + this.selectedEmail + '.\nTop-level keys overwritten; a null value deletes that key.';
      if (!window.confirm(summary + '\n\nProceed?')) { this.saving = false; return; }

      if (this.saveMode === 'replace') { await this.mds.setMemberRaw(key, obj); }
      else { await this.mds.updateMemberRaw(key, obj); }

      this.log.unshift(new Date().toISOString() + '  ' + this.saveMode.toUpperCase() + '  ' + this.selectedEmail + '  -> saved');
      this.statusMsg = 'Saved.';

      const fresh = await this.mds.getMemberOnce(key);
      this.baselineObj = fresh || {};
      this.jsonText = JSON.stringify(fresh, null, 2);
      this.loadedStable = this.stable(fresh || {});
      this.diff = []; this.diffComputed = false;
      this.updateGridRow(key, fresh);
    } catch (e: any) {
      this.statusMsg = 'Save failed.';
      this.log.unshift(new Date().toISOString() + '  ERROR  ' + this.selectedEmail + '  -> ' + (e && e.message ? e.message : e));
      window.alert('Save failed: ' + (e && e.message ? e.message : e));
    } finally {
      this.saving = false;
    }
  }

  // ── Manage Refunds ───────────────────────────────────────────────────────────
  refundOpen = false;
  refundKey: string | null = null;
  refundEmail = '';
  refundItems: any[] = [];     // flattened purchase items of the loaded record
  refundYear = '';
  refundEvent = '';
  refundSku = '';
  refundQty = 1;
  refundSaving = false;
  refundMsg = '';

  private itemYear(it: any): string {
    if (it && it.paymentTime) {
      const y = moment(it.paymentTime).year();
      if (!isNaN(y) && y > 2000) { return String(y); }
    }
    const m = String(it && it.sku || '').match(/(20\d{2})/);
    return m ? m[1] : 'Unknown';
  }
  private itemEvent(it: any): string {
    const s = String(it && it.sku || '');
    if (s.indexOf('MM') === 0) { return 'Membership'; }
    if (s.indexOf('DP') === 0) { return 'Durga Puja'; }
    if (s.indexOf('SP') === 0) { return 'Saraswati Puja'; }
    if (s.indexOf('PICNIC') === 0) { return 'Picnic'; }
    if (s.indexOf('EOB') === 0) { return 'Echoes of Bengal'; }
    if (s.indexOf('KP') === 0) { return 'Kobi Pronam'; }
    return (it && it.name) ? it.name : s;
  }
  private flatItems(rec: any): any[] {
    const out: any[] = [];
    ((rec && rec.purchase) || []).forEach((g: any) => {
      (Array.isArray(g) ? g : [g]).forEach((it: any) => {
        if (it && it.sku) {
          out.push({
            sku: it.sku, name: it.name, description: it.description,
            quantity: it.quantity, price: it.price, paymentTime: it.paymentTime,
            status: it.status || '', year: this.itemYear(it), event: this.itemEvent(it)
          });
        }
      });
    });
    return out;
  }

  private uniq(a: string[]): string[] { return Array.from(new Set(a)); }

  get refundYears(): string[] { return this.uniq(this.refundItems.map(i => i.year)).sort().reverse(); }
  get refundEvents(): string[] {
    return this.uniq(this.refundItems.filter(i => !this.refundYear || i.year === this.refundYear).map(i => i.event));
  }
  get refundSkus(): string[] {
    return this.uniq(this.refundItems
      .filter(i => (!this.refundYear || i.year === this.refundYear) && (!this.refundEvent || i.event === this.refundEvent))
      .map(i => i.sku));
  }
  get refundMatches(): any[] {
    if (!this.refundSku) { return []; }
    return this.refundItems.filter(i => i.sku === this.refundSku && i.year === this.refundYear && i.event === this.refundEvent);
  }

  // Quantity still available to refund for the current selection (sum of non-refunded qty).
  get refundAvailableQty(): number {
    return this.refundMatches
      .filter(i => i.status !== 'Refunded')
      .reduce((sum, i) => sum + (Number(i.quantity) || 0), 0);
  }
  get refundQtyOptions(): number[] {
    const n = this.refundAvailableQty;
    return Array.from({ length: n > 0 ? n : 0 }, (_, i) => i + 1);
  }
  onRefundSkuChange(): void { this.refundQty = 1; }

  openRefunds(m: any): void {
    this.refundKey = m.$key;
    this.refundEmail = m.email;
    this.refundYear = ''; this.refundEvent = ''; this.refundSku = ''; this.refundMsg = '';
    this.mds.getMemberOnce(m.$key).then(rec => {
      this.refundItems = this.flatItems(rec || {});
      this.refundOpen = true;
    });
  }
  closeRefund(): void { this.refundOpen = false; }
  onRefundYearChange(): void { this.refundEvent = ''; this.refundSku = ''; this.refundQty = 1; }
  onRefundEventChange(): void { this.refundSku = ''; this.refundQty = 1; }

  private matchesSelection(it: any): boolean {
    return it && it.sku === this.refundSku
      && this.itemYear(it) === this.refundYear
      && this.itemEvent(it) === this.refundEvent;
  }

  // Refund a chosen quantity. Full-item refunds flip status to 'Refunded';
  // partial refunds split the line (reduce the active qty, add a Refunded sibling).
  async doRefund(): Promise<void> {
    if (!this.refundKey || !this.refundSku || this.refundSaving) { return; }
    let qty = Number(this.refundQty) || 0;
    if (qty <= 0) { return; }
    this.refundSaving = true;
    const key = this.refundKey;
    try {
      const rec = await this.mds.getMemberOnce(key);
      const purchase = (rec && rec.purchase) ? rec.purchase : [];
      let remaining = qty;
      for (const group of purchase) {
        const items = Array.isArray(group) ? group : [group];
        for (const it of [...items]) {                       // snapshot so pushed siblings aren't re-processed
          if (remaining <= 0) { break; }
          if (!this.matchesSelection(it) || it.status === 'Refunded') { continue; }
          const q = Number(it.quantity) || 0;
          if (q <= 0) { continue; }
          if (remaining >= q) {
            it.status = 'Refunded';                          // whole line refunded
            remaining -= q;
          } else {
            it.quantity = q - remaining;                     // keep the balance active
            items.push({ ...it, quantity: remaining, status: 'Refunded' });  // refunded portion
            remaining = 0;
          }
        }
        if (remaining <= 0) { break; }
      }
      const done = qty - remaining;
      if (done <= 0) { this.refundMsg = 'Nothing available to refund (it may have changed).'; this.refundSaving = false; return; }
      if (!window.confirm('Refund ' + done + ' of SKU ' + this.refundSku + ' (' + this.refundEvent + ' ' + this.refundYear + ') for ' + this.refundEmail + '?')) {
        this.refundSaving = false; return;
      }
      await this.mds.updateMemberRaw(key, { purchase });
      this.refundMsg = 'Refunded ' + done + ' item(s).';
      this.refundItems = this.flatItems(rec);
      this.refundQty = 1;
      this.updateGridRow(key, rec);
      this.log.unshift(new Date().toISOString() + '  REFUND  ' + this.refundEmail + '  ' + this.refundSku + '  x' + done);
    } catch (e: any) {
      this.refundMsg = 'Refund failed: ' + (e && e.message ? e.message : e);
    } finally {
      this.refundSaving = false;
    }
  }

  // Revert all refunded lines for the current selection back to active.
  async undoRefund(): Promise<void> {
    if (!this.refundKey || !this.refundSku || this.refundSaving) { return; }
    this.refundSaving = true;
    const key = this.refundKey;
    try {
      const rec = await this.mds.getMemberOnce(key);
      const purchase = (rec && rec.purchase) ? rec.purchase : [];
      let n = 0;
      purchase.forEach((g: any) => {
        (Array.isArray(g) ? g : [g]).forEach((it: any) => {
          if (this.matchesSelection(it) && it.status === 'Refunded') { delete it.status; n++; }
        });
      });
      if (n === 0) { this.refundMsg = 'No refunded items to revert for this selection.'; this.refundSaving = false; return; }
      if (!window.confirm('Revert ' + n + ' refunded line(s) of SKU ' + this.refundSku + ' back to active for ' + this.refundEmail + '?')) {
        this.refundSaving = false; return;
      }
      await this.mds.updateMemberRaw(key, { purchase });
      this.refundMsg = 'Reverted ' + n + ' line(s).';
      this.refundItems = this.flatItems(rec);
      this.updateGridRow(key, rec);
      this.log.unshift(new Date().toISOString() + '  UNREFUND  ' + this.refundEmail + '  ' + this.refundSku + '  x' + n);
    } catch (e: any) {
      this.refundMsg = 'Failed: ' + (e && e.message ? e.message : e);
    } finally {
      this.refundSaving = false;
    }
  }

  private updateGridRow(key: string, fresh: any): void {
    const idx = this.rowData.findIndex(r => r.$key === key);
    if (idx !== -1) {
      this.rowData[idx] = Object.assign({ $key: key }, fresh || {});
      if (this.gridApi) { this.gridApi.applyTransaction({ update: [this.rowData[idx]] }); }
    }
  }
}

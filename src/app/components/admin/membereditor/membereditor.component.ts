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
    { headerName: '', field: 'edit', width: 100, sortable: false, filter: false,
      cellRenderer: () => '<button class="me-editbtn">Edit</button>' }
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
    if (e && e.colDef && e.colDef.field === 'edit' && e.data) { this.openEditor(e.data); }
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

  private updateGridRow(key: string, fresh: any): void {
    const idx = this.rowData.findIndex(r => r.$key === key);
    if (idx !== -1) {
      this.rowData[idx] = Object.assign({ $key: key }, fresh || {});
      if (this.gridApi) { this.gridApi.applyTransaction({ update: [this.rowData[idx]] }); }
    }
  }
}

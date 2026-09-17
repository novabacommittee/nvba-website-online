import { Component, OnInit } from '@angular/core';
import { MemberService } from './../../../shared/member/member.service';
import 'ag-grid-community';
import * as moment from 'moment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {

  members:any;
  rowData:any;
  private gridApi:any;
  private gridColumnApi:any;

  constructor(private mds: MemberService) {

    this.mds.GetMembersList().subscribe(m=>{
      this.members = m;
      this.applyReport();
    })
   }

  ngOnInit(): void {

    try{
      [...this.rowData].forEach( m =>{ 
        if(m.membershipstatus != 'Valid')
          m.membershipstatus = 'Expired';
      });
    }
    catch (e) {
      console.error(e);
    }
  }

  title = 'app';

	columnDefs = [
    { field: 'id', sortable: true, filter: true, width: 90, cellClass: 'id-class center' },
		{ field: 'firstname', sortable: true, filter: true , cellClass: 'center' },
		{ field: 'lastname', sortable: true, filter: true, cellClass: 'center' },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },
    { field: 'joined', sortable: true, filter: true},
    { field: 'expires', sortable: true, filter: true},
    { field: 'membershipstatus', sortable: true , filter: true},
    { field: 'address1', sortable: true , filter: true},
    { field: 'address2', sortable: true , filter: true},
    { field: 'city', sortable: true , filter: true},
    { field: 'state', sortable: true , filter: true},
    { field: 'zipcode', sortable: true , filter: true},
    { field: 'country', sortable: true , filter: true},
	];


  // ── Membership report generator ──────────────────────────────────────────────
  reportType: 'all' | 'active' | 'expiry' = 'all';
  expiryMonths = 1;
  monthOptions = [1,2,3,4,5,6,7,8,9,10,11,12];

  private parseExp(e: any): any {
    if (!e) { return null; }
    let d = moment(e, moment.ISO_8601, true);
    if (!d.isValid()) { d = moment(e); }         // fall back for legacy YYYY-MM-DD etc.
    return d.isValid() ? d : null;
  }

  // Members matching the currently selected report.
  buildReportRows(): any[] {
    const all = (this.members || []).filter((m: any) => m && m.email);
    if (this.reportType === 'all') { return all; }
    const now = moment();
    const cutoff = moment(now).add(this.expiryMonths, 'months');
    return all.filter((m: any) => {
      const d = this.parseExp(m.expires);
      if (!d || !d.isAfter(now)) { return false; }        // must be currently active
      if (this.reportType === 'active') { return true; }
      return d.isSameOrBefore(cutoff);                     // expiring within N months
    });
  }

  // Re-filter the grid to match the current selection.
  applyReport(): void {
    this.rowData = this.buildReportRows();
    if (this.gridApi) { this.gridApi.setRowData(this.rowData); }
  }

  get reportCount(): number { return this.buildReportRows().length; }

  downloadCsv(): void {
    const rows = this.buildReportRows();
    const cols = ['Id','First Name','Last Name','Email','Phone','Joined','Expires','Status'];
    const esc = (v: any) => {
      const t = (v === undefined || v === null) ? '' : String(v);
      return /[",\n\r]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t;
    };
    const lines = [cols.join(',')];
    rows.forEach((m: any) => lines.push([
      m.id, m.firstname, m.lastname, m.email, (m.phone || m.phonenumber || ''),
      m.joined, m.expires, m.membershipstatus
    ].map(esc).join(',')));
    const csv = lines.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const fname = this.reportType === 'all'
      ? 'all-members.csv'
      : this.reportType === 'active'
        ? 'active-members.csv'
        : 'membership-expiry-due-' + this.expiryMonths + '-month' + (this.expiryMonths > 1 ? 's' : '') + '.csv';
    a.href = url; a.download = fname;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.applyReport();
  }
}

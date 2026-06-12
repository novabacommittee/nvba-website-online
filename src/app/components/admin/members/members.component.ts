import { Component, OnInit } from '@angular/core';
import { MemberService } from './../../../shared/member/member.service';

import 'ag-grid-community';
import * as moment from 'moment';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})

export class MembersComponent implements OnInit {
  members:any = [];
  filteredList:any = [];
  private gridApi:any;

  filterStatus:string = 'active';      // active | inactive | expiring
  expiringUnit:string = 'days';        // days | months
  expiringValue:number = 30;
  expiringValueOptions:number[] = [];

  totalCount:number = 0;
  activeCount:number = 0;
  inactiveCount:number = 0;

  columnDefs = [
    { field: 'firstname', sortable: true, resizable: true, filter: true },
    { field: 'lastname', sortable: true, resizable: true, filter: true },
    { field: 'email', sortable: true, resizable: true, filter: true, width: 280 },
    { field: 'phone', sortable: true, resizable: true, filter: true },
    { field: 'expires', headerName: 'Expires', sortable: true, resizable: true, filter: true },
    { field: 'membershipstatus', headerName: 'Status', sortable: true, resizable: true, filter: true, width: 120 }
  ];

  constructor(private mds: MemberService) {

    this.setUnitOptions();

    this.mds.GetMembersList().subscribe(m => {
      this.members = [];
      m.forEach((e:any) => {
        if(!e || !e.email){ return; }

        const exp = e.expires ? moment(e.expires) : null;
        const isActive = !!(exp && exp.isValid() && exp.isAfter(moment()));

        this.members.push({
          firstname: e.firstname || e.billingFirstname || e.displayName || '',
          lastname: e.lastname || e.billingLastname || '',
          email: e.email,
          phone: e.phone || e.phonenumber || '',
          expires: (exp && exp.isValid()) ? exp.format('YYYY-MM-DD') : '',
          expiresMoment: (exp && exp.isValid()) ? exp : null,
          membershipstatus: isActive ? 'Active' : 'Inactive',
          isActive: isActive
        });
      });

      this.totalCount = this.members.length;
      this.activeCount = this.members.filter((x:any) => x.isActive).length;
      this.inactiveCount = this.totalCount - this.activeCount;

      this.applyFilter();
    });
  }

  ngOnInit(): void {
  }

  setUnitOptions(){
    const max = this.expiringUnit === 'days' ? 30 : 12;
    this.expiringValueOptions = Array.from({length: max}, (_, i) => i + 1);
    if(this.expiringValue > max){
      this.expiringValue = max;
    }
  }

  onUnitChange(){
    this.setUnitOptions();
    this.applyFilter();
  }

  applyFilter(){
    if(this.filterStatus === 'active'){
      this.filteredList = this.members.filter((m:any) => m.isActive);
    }
    else if(this.filterStatus === 'inactive'){
      this.filteredList = this.members.filter((m:any) => !m.isActive);
    }
    else {
      // expiring: active now, but expires within the selected window
      const cutoff = moment().add(this.expiringValue, this.expiringUnit === 'days' ? 'days' : 'months');
      this.filteredList = this.members.filter((m:any) =>
        m.isActive && m.expiresMoment && m.expiresMoment.isSameOrBefore(cutoff)
      );
    }
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
}

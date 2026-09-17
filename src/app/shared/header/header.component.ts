import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetjsonfileService } from './../../services/getjsonfile.service';
import { AuthService } from './../services/auth.service';
import { EXECUTIVE_COMMITTEE, EXECUTIVE_COMMITTEE_IT_ADMIN, EXECUTIVE_COMMITTEE_ADMIN, currentUserEmail } from './../guard/admin-groups';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dataObject :any=[];
  navbarCollapsed : any;
  isCollapsed = false;
  member: any={}

  // Group-based admin visibility (email compared lowercase; matches the route guards).
  get isExecCommittee(): boolean { return EXECUTIVE_COMMITTEE.indexOf(currentUserEmail()) !== -1; }
  get isIdAdmin(): boolean { return EXECUTIVE_COMMITTEE_IT_ADMIN.indexOf(currentUserEmail()) !== -1; }
  get isCommitteeAdmin(): boolean { return EXECUTIVE_COMMITTEE_ADMIN.indexOf(currentUserEmail()) !== -1; }

  private _jsonURL = '/assets/data/pages/header.json';

   constructor(private jsonFile:GetjsonfileService, public auth:AuthService) {

   }


  ngOnInit(): void {
    this.jsonFile.pageData('header').subscribe(data => {
         this.dataObject = JSON.parse( JSON.stringify(data ) )
       });
  }

  toggle(){

    let element:HTMLElement = document.getElementById('nvbaMenu') as HTMLElement;

    element.click();
    ////console.log('click');
  }

  signout(){
    this.auth.SignOut()
    .then((res) => {
      this.auth.cast.subscribe(m=> {
        this.member = m;
        ////console.log(this.member);
      });
   //   this.memberService.UpdateMember(this.member.id, this.member);
  //    this.location.back();
  //      localStorage.setItem('user', 'null');
    }, (error) => {
      ////console.log("Logout error", error);
    });
    this.toggle();
  }

}

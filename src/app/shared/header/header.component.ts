import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetjsonfileService } from './../../services/getjsonfile.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dataObject :any={};
  navbarCollapsed : any;
  isCollapsed = false;
  member: any={}

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

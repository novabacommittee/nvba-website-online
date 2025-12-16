import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { MemberService } from './../../shared/member/member.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  member:any;

  constructor(public authService: AuthService, 
              public memberService: MemberService,
              private fb: FormBuilder,
              ) 
  {
      this.authService.cast.subscribe( m => {
        this.member = m;
        ////console.log(this.member);
      });
  }

  ngOnInit(): void {
  
  }

  signout(){
    this.authService.SignOut()
    .then((res) => {
   //   this.memberService.UpdateMember(this.member.id, this.member);
  //    this.location.back();
  //      localStorage.setItem('user', 'null');
    }, (error) => {
      ////console.log("Logout error", error);
    });
  }

  ngOnDestroy(): void {
  //  this.subscription.unsubscribe();
    this.member;
  }
}
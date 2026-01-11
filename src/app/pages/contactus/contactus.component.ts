import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/services/auth.service';
import { MemberService } from './../../shared/member/member.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  member:any; 
  constructor( public auth: AuthService, public memberService: MemberService ) { }

  ngOnInit(): void {
      this.member = JSON.parse(localStorage.getItem('user')!);
      ////console.log(this.member);
      ////console.log(this.member.uid);
  
      // Only proceed if member exists
      if (this.member) {
        this.datafind();
        this.datafind1(); 
      }
  }

 datafind(){
    // this.memberService.memberRef.snapshotChanges().subscribe(m =>{
    //    let d =  m.payload.toJSON();
    //   ////console.log(d);
    // })
    ////console.log(this.member.email);
    if (this.member && this.member.email) {
      this.memberService.GetMemberbyEmail(this.member.email).snapshotChanges().subscribe(mm =>{
        let memberData = m.payload.toJSON()
        ////console.log(memberData);
        this.member = memberData;
        ////console.log('this.member - ');
        ////console.log(this.member.email);
      })
      this.memberService.GetMemberbyEmail(this.member.email).snapshotChanges().subscribe(mm =>{
        let md = mm.forEach(mmd=>{
         let s =  mmd.payload.toJSON()
         ////console.log( s?.valueOf())
        
          // if( s.email == this.member.email){

          // }
        })
        // ////console.log(memberData);
        // this.member = memberData;
        // ////console.log('this.member - ');
        // ////console.log(this.member);
      })
    }


  }

   async datafind1(){
   
     //  ////console.log( await this.auth.memberDetail());
   
   }



}

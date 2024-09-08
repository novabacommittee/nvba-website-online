import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/shared/member/member.service';
import 'base64-js';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-details-check',
  templateUrl: './user-details-check.component.html',
  styleUrls: ['./user-details-check.component.scss']
})
export class UserDetailsCheckComponent implements OnInit {
  userMember:any;
  ticketList:any =[];

  constructor(private ms: MemberService, public auth:AuthService, private route: ActivatedRoute ) {
    console.log(window.location.host);
  //   const emailId = this.route.snapshot.params['id'];
  //  // console.log(emailId);
    let decoded: string = atob(this.route.snapshot.params['id']);
   // console.log(decoded);
    this.ms.GetMembersList().subscribe( mList =>{
      [...mList].forEach( member => {
        if(member.email == decoded){
          this.userMember = member;
          console.log(this.userMember);

          // [...member.purchase].forEach( purchaseList =>{
          //   console.log('purchaseList >', purchaseList.length );
          //   for(let i=0; i< purchaseList.length; i++ ){
          //       if(purchaseList[i].sku.includes('DP2023')){
          //         this.ticketList.push(purchaseList[i]);
          //       }
          //   }
          // });

          // console.log('this.ticketList >',this.ticketList);

        }
      })
    });
   
  }

  ngOnInit(): void {
    // ngOnInit() {
    //   const id = this.route.snapshot.params['id'];
    // }
  }
}

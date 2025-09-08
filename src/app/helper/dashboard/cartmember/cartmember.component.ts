import { Component, OnInit } from '@angular/core';
import { CartService } from './../../../shared/services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { MemberService } from './../../../shared/member/member.service';

// declare var paypal;
import * as moment from 'moment';

@Component({
  selector: 'app-cartmember',
  templateUrl: './cartmember.component.html',
  styleUrls: ['./cartmember.component.scss']
})
export class CartmemberComponent implements OnInit {

  member:any;
  expired:any;
  currentDate:any;
  parts:any;
  oldUser:boolean = true;

  memberValidity : boolean = false;

  ticketData : any=[];
  dataObject :any=[];
  checkObject :any=[];
  cartObject : any=[];
  totalCost: number = 0;
  cartCheck: any;

  private  memberCart = [{
    "name": "NVBA Annual Membership",
    "description": "NVBA Annual Membership Fee - 2025",
    "quantity": 1,
    "price": 30,
    "tax": 0,
    "sku": "MM2025YY",
    "currency": "USD" 
  }];

  constructor(
    private auth: AuthService, 
    private memberservice:MemberService,
    private cs: CartService, 
    public router: Router
  ) { 
    this.cs.currentCart.subscribe( cartCheck => this.cartCheck = cartCheck);
    this.dataObject = this.memberCart;
    // this.member = this.auth.cast.subscribe((m)=>{this.member=m});
    // //console.log(this.member);

    this.auth.member.subscribe( m => {
      this.member = m;
      //console.log(moment(this.member.expires));

      this.currentDate = moment();

      if(moment(this.member.expires).isAfter(this.currentDate) ){
        this.memberValidity = true;
         this.member.membershipstatus = 'Valid';
         ////console.log('CartMember IF');
         ////console.log(this.member);
       }
       else{
         this.memberValidity = false;
         this.member.membershipstatus = 'Expire';
         ////console.log('CartMember Else');
         ////console.log(this.member);
       }

    });

  }


  ngOnInit(): void { } 

   addToCartobj(){
    this.cs.items = [];
    this.cs.addToCart(this.memberCart); 
    //console.log(this.memberCart);
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(): void {
      this.member;
  }

}
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService} from './../../../shared/services/cart.service';
import { MemberService } from './../../../shared/member/member.service';
import { from, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Location} from "@angular/common";
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';

import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare let paypal:any;


@Component({
  selector: 'app-foodcheckout',
  templateUrl: './foodcheckout.component.html',
  styleUrls: ['./foodcheckout.component.scss']
})
export class FoodcheckoutComponent implements OnInit {
  @ViewChild('cartElement', {static: false}) myElementRef: ElementRef | undefined;
  getInnerHtml() {
    if (this.myElementRef) {
      const innerHtml = this.myElementRef.nativeElement.innerHTML;
      console.log(innerHtml);
      return innerHtml;
    }
  }

  dataformail: any;
  
  cartCheck: any = [];
  subtotal: number = 0;
  tax: number = 0;
  addScript: boolean = false;
  paypalLoad: boolean = true;
  emptyCart: boolean = false;

  member:any;

  userDetails: any;
  move:boolean = false;


  public payPalConfig ? : IPayPalConfig;
  item: any;

  constructor( 
    private cart: CartService, 
    private toastr: ToastrService,
    private ar: ActivatedRoute,
    private mds: MemberService,
    private location: Location,
    private router: Router,
    private userService: AuthService,
    private http: HttpClient,
    ) {

      this.userService.cast.subscribe( m => {
        this.member = m;
        ////console.log(this.member);
      });

    this.cart.currentCart.subscribe( (cartCheck) => this.cartCheck = cartCheck);
    ////console.log(this.cartCheck.length);
    ////console.log(this.cart.getItems());

    }

  ngOnInit(): void {
        this.cartCheck.forEach((i:any)=>{
        //  ////console.log(parseFloat(i.price) * parseFloat(i.quantity));
          this.subtotal +=(( parseFloat(i.price)) * (parseFloat(i.quantity)));
          this.emptyCart = true;
        });
        // ////console.log( moment(this.member.expires).format('LL') );
        // ////console.log( 'Line 68 - expires date=> '+ this.member.expires );

        // var current = moment();
        // ////console.log(current.toString());

        // ////console.log( moment(this.member.expires).isSame(current)); // true
        // ////console.log( moment(this.member.expires).isAfter(current)); // false
        
        // if(moment(this.member.expires).isSame(current) ||  moment(current).isAfter(this.member.expires) ){
        //   ////console.log(moment(current).add(1, 'years').format('M-D-YYYY'));
        //   this.member.expires = moment(current).add(1, 'years').format('M-D-YYYY');
        // }
        // else{
        //  ////console.log( moment(current).add(1, 'years').format('M-D-YYYY') );
        //   this.member.expires = moment(this.member.expires).add(1, 'years').format('M-D-YYYY');
        //   ////console.log( this.member.expires );
        // }

  }


   ngAfterViewInit(): void {
    if(this.cartCheck){
      if (!this.addScript) {
        this.addPaypalScript().then(() => {
          paypal.Button.render(this.paypalConfig, '#paypal-button-container');
          this.paypalLoad = false;
           ////console.log(this.paypalConfig);  
        })
      }
    }
   } // }  // End of ngAfterViewInit

   addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
   //   ////console.log(scripttagElement);
    })
  } // End of AddPaypalScript


  paypalConfig = {
      env: 'sandbox',
    //  env: 'production',
      client: {
        sandbox: 'AeLhWUCfC2jHOZv7b-KDfZV6R6Mig-2FklW6iIxsuI0UROww652TU9SlVPHyW1ygMGohQo21TfXUVPrz',
      //  production: 'AVBsfj0Jw-jl5_63BPGwuduCaKDsPvbz1pwyqECm7N5FzKEi1Q_o-xQAiM_BTzQhAW064uAPf1v9uZdS'
      },
      style: {
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
        label: 'paypal',
      },
      commit: true,
      payment: (data:any, actions:any) => {
        return actions.payment.create({
          payment: {
            transactions: [ 
              {
                "amount": {
                  "total": (this.subtotal + this.tax),
                  "currency": "USD",
                  "details": {
                    "subtotal": this.subtotal,
                    "tax": this.tax
                  }
                },
                "description": "NVBA Website Payment.", 
                "item_list": {
                  "items": this.cartCheck
                }  
              }
            ]
          }
        });
      },
      onAuthorize: (data:any, actions:any) => {
        return actions.payment.execute().then((payment:any) => {
          let paymentTrans = {...payment};
  
          //Do something when payment is successful.
           ////console.log(payment);
           ////console.log(this.member);

           //Adjust Expiretion Date
          //  if( payment.transactions[0].item_list.items[0].name == 'NVBA Annual Membership' ){
              
          //     let current = moment(); 
          //     ////console.log( moment(this.member.expires).isSame(current)); ////  true
          //     ////console.log( moment(this.member.expires).isAfter(current)); ////  false
              
          //     if(moment(this.member.expires).isSame(current) ||  moment(current).isAfter(this.member.expires) ){
          //       this.member.expires = moment(current).add(1, 'years'); 
          //       this.member.membershipstatus = 'Valid';
          //     }
          //     else{
          //       this.member.expires = moment(this.member.expires).add(1, 'years'); 
          //       this.member.membershipstatus = 'Valid'; 
          //     }

          //     if(!this.member.expires){
          //       this.member.expires = moment(current).add(1, 'years'); 
          //     }
          //   }


          //  if((!this.member.payments) && (!this.member.purchase) ){ 
          //   ////console.log('First Time');
          //   this.member.payments = [];
          //   this.member.purchase = [];
          //  }
          //  else {
          //   console.log('regular Member');
          //  }
            
        //     console.log(paymentTrans);
        //     console.log(...this.cartCheck);
        //     console.log( this.member.payments);

        //   //  this.member.payments = paymentTrans.con

        //  //  this.member.payments.unshift(paymentTrans);
        //    this.member.purchase.unshift(this.cartCheck);
        //    console.log(this.member);
        //    this.mds.UpdateMember(this.member.id, this.member);
          this.mds.dp2024(payment);
           console.log('update done');
          this.toastr.success('Your payment is successful.','Payment Process');
          console.log(payment);
          const htmlvalue = this.getInnerHtml();

          this.dataformail = {
            subject: 'Durga Puja food Tickets',
            id: payment.id,
            create_time: payment.create_time,
            cart: payment.cart,
            fname: payment.payer.payer_info.first_name,
            lname: payment.payer.payer_info.last_name,
            email: payment.payer.payer_info.email,
            emailtemplate: 'durgapuja.html',
            items: this.getInnerHtml()
          };
       // for Send Mail
          this.postData(this.dataformail);
   
       
             this.cart.clearCart();
             this.cleanup();
            // this.router.navigate(['/durgapuja2020']);
  
            setTimeout(()=>{                           
              this.router.navigate(['/durgapuja2024']);
            }, 2000);
        })
      }
    };


  goBack(){
      this.location.back();
  }

  cleanup(){
    this.cartCheck = [];
    this.subtotal = 0;
    this.tax= 0;
    this.emptyCart= true;
  }
  

  postData(data: any) {
    const url = 'https://dhrubajyoti.com/nvbamail';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    this.http.post(url, data, { headers });
    console.log(data);
  }

}

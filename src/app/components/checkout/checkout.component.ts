import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService} from './../../shared/services/cart.service';
import { MemberService } from './../../shared/member/member.service';
import { ToastrService } from 'ngx-toastr';
import { Location} from "@angular/common";
import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  cartCheck: any = [];
  subtotal: number = 0;
  tax: number = 0;
  addScript: boolean = false;
  paypalLoad: boolean = true;
  emptyCart: boolean = false;
  member:any;
  move:boolean = false;
  currentPurches: any =[];
  memberValidity : boolean = false;
  currentDate:any;

  public payPalConfig ? : IPayPalConfig;

  constructor( 
    private cart: CartService, 
    private toastr: ToastrService,
    private ar: ActivatedRoute,
    private mds: MemberService,
    private location: Location,
    private router: Router,
    private userService: AuthService
    ) 
    {

      this.userService.cast.subscribe( m => {
        this.member = m;

        // Only process member data if it exists
        if (this.member) {
          this.currentDate = moment();
            
          if(this.member.expires && moment(this.member.expires).isAfter(this.currentDate) )
          {
              this.memberValidity = true;
          }
          else
          {
              this.memberValidity = false;
          }
          console.log(this.member);
        }
      });

      this.cart.currentCart.subscribe( (cartCheck) => this.cartCheck = cartCheck);
      //console.log(this.cartCheck.length);
      console.log(this.cart.getItems());
    }

  private calculateSubtotal(): void {
    this.subtotal = 0;
    this.cartCheck.forEach((item: any) => {
        this.subtotal += parseFloat(item.price) * parseFloat(item.quantity);
    });
    this.emptyCart = this.cartCheck.length > 0;
  }

  private initPayPalConfig(): void {
    this.payPalConfig = {
      currency: environment.paypal.currency,
      clientId: environment.paypal.clientId,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: environment.paypal.currency,
            value: this.subtotal.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: environment.paypal.currency,
                value: this.subtotal.toFixed(2)
              }
            }
          },
          items: this.cartCheck.map((item: any) => ({
            name: item.name,
            quantity: item.quantity.toString(),
            unit_amount: {
              currency_code: environment.paypal.currency,
              value: parseFloat(item.price).toFixed(2)
            },
            sku: item.sku || item.id || 'N/A'  // Replace with real SKU if available
          }))
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
        label: 'paypal',
        },
      onApprove: (data, actions) => {
        actions.order.get().then((details: any) => {
          console.log('Order approved: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('Transaction authorized', data);
        this.toastr.success('Payment successful');

        // Optionally clear cart or redirect
        if(data.status == 'COMPLETED')
        {
            const items = data?.purchase_units?.[0]?.items;
            if(items)
            {
              items.forEach(item => 
              {
                console.log('Item:', item.name, item.sku, item.quantity, item.unit_amount.value);
                if(item.name == 'NVBA Annual Membership' )
                {
                  let current = moment(); 
                  
                  if(this.member.expires && (moment(this.member.expires).isSame(current) ||  moment(current).isAfter(this.member.expires))){
                    this.member.expires = moment(current).add(1, 'years'); 
                    this.member.membershipstatus = 'Valid';
                  }
                  else{
                    this.member.expires = moment(this.member.expires).add(1, 'years'); 
                    this.member.membershipstatus = 'Valid'; 
                  }

                  if(!this.member.expires){
                    this.member.expires = moment(current).add(1, 'years'); 
                  }
                }
              });

              if((!this.member.payments) && (!this.member.purchase) )
              { 
                  this.member.payments = [];
                  this.member.purchase = [];
              }
              else {
                console.log('regular Member');
              }
            
            this.currentPurches = [];
            [...this.cartCheck].forEach(e => {
              this.currentPurches.unshift({ ...e, paymentTime: data.create_time });
            });

            this.member.purchase.unshift(this.currentPurches);
            console.log(this.member);
            this.mds.UpdateMember(this.member.id, this.member);
            console.log('update done');
            const userNa = this.member.displayName?this.member.displayName:'';
            console.log(userNa);
            this.toastr.success('Hi '+ userNa +', \n  Thanks for your recent purchase. Your payment is successful. \n You will get confirmation emails form Paypal. \n You can varify your tickets at Membership page under order history tab. ','Payment Process');
            console.log(data.payer);
    
            this.cart.clearCart();
            this.cleanup();
    
            setTimeout(()=>{                           
              //this.router.navigate(['/membership?#orderHistory']);
              this.router.navigate(['/membership'], { queryParams: { tab: 'orderHistory' } });
            }, 2000);
          }
        }
      },
      onError: err => {
        console.error('PayPal error:', err);
        this.toastr.error('Payment failed');
      }
    };
  }

  ngOnInit(): void {
      this.calculateSubtotal();
      this.initPayPalConfig();
  }

  goBack(){
      this.location.back();
  }

  confirmFreeRegistration(){
    if(!this.member){
      this.toastr.error('Please sign in first');
      return;
    }

    if((!this.member.payments) && (!this.member.purchase))
    {
      this.member.payments = [];
      this.member.purchase = [];
    }

    this.currentPurches = [];
    const now = moment().toISOString();
    [...this.cartCheck].forEach(e => {
      this.currentPurches.unshift({ ...e, paymentTime: now });
    });

    this.member.purchase.unshift(this.currentPurches);
    this.mds.UpdateMember(this.member.id, this.member);

    const userNa = this.member.displayName ? this.member.displayName : '';
    this.toastr.success('Hi ' + userNa + ', \n  Your registration is confirmed! \n You can verify your registration at Membership page under order history tab.', 'Registration Complete');

    this.cart.clearCart();
    this.cleanup();

    setTimeout(() => {
      this.router.navigate(['/membership'], { queryParams: { tab: 'orderHistory' } });
    }, 2000);
  }

  cleanup(){
    this.cartCheck = [];
    this.subtotal = 0;
    this.tax= 0;
    this.emptyCart= true;
  }

}

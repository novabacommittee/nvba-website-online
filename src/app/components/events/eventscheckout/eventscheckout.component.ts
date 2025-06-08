import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService} from './../../../shared/services/cart.service';
import { MemberService } from './../../../shared/member/member.service';
import { ToastrService } from 'ngx-toastr';
import { Location} from "@angular/common";
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-eventscheckout',
  templateUrl: './eventscheckout.component.html',
  styleUrls: ['./eventscheckout.component.scss']
})

export class EventscheckoutComponent implements OnInit {

  cartCheck: any = [];
  subtotal: number = 0;
  tax: number = 0;
  addScript: boolean = false;
  paypalLoad: boolean = true;
  emptyCart: boolean = false;
  member:any;

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
        //console.log(this.member);
      });

      this.cart.currentCart.subscribe( (cartCheck) => this.cartCheck = cartCheck);
      //console.log(this.cartCheck.length);
      //console.log(this.cart.getItems());
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
        // Optionally clear cart or redirect
        if(data.status == 'COMPLETED')
        {
          console.log('Transaction authorized', data);
          this.toastr.success('Payment successful');

          const items = data?.purchase_units?.[0]?.items;
          if (items) {
            items.forEach(item => {
              console.log('Item:', item.name, item.sku, item.quantity, item.unit_amount.value);
            });
          }

          this.mds.concert(data);
          console.log('update done');
          this.toastr.success('Hi '+ data.payer.name?.given_name +', \n  Thanks for your recent purchase. Your payment is successful. \n You will get confirmation emails form PayPal. ','Payment Process');
          console.log(data.payer);
  
          this.cart.clearCart();
          this.cleanup();
  
          setTimeout(()=>{                           
            this.router.navigate(['/']);
          }, 2000);
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

  cleanup(){
    this.cartCheck = [];
    this.subtotal = 0;
    this.tax= 0;
    this.emptyCart= true;
  }
}

import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { CartService } from './../../../shared/services/cart.service';
import { MemberService } from './../../../shared/member/member.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

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

  public payPalConfig ? : IPayPalConfig;

constructor( 
    private cart: CartService, 
    private toastr: ToastrService,
    private mds: MemberService,
    private location: Location,
    private router: Router,
    private userService: AuthService,
    private http: HttpClient,
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
          if (items) 
          {
            items.forEach(item => {
              console.log('Item:', item.name, item.sku, item.quantity, item.unit_amount.value);
            });
          }

          this.mds.kp2025(data);
          console.log('update done');
          this.toastr.success('Your payment is successful.','Payment Process');
          console.log(data.payer);
  
          const htmlvalue = this.getInnerHtml();
          this.dataformail = {
            subject: 'Kobi Pronam 2025 food Tickets',
            id: data.id,
            create_time: data.update_time,
            cart: data.purchase_units,
            fname: data.payer.name?.given_name,
            lname: data.payer.name?.surname,
            email: data.payer.email_address,
            emailtemplate: 'durgapuja.html',
            items: this.getInnerHtml()
          };
          // for Send Mail
          this.postData(this.dataformail);
        
          this.cart.clearCart();
          this.cleanup();
  
          setTimeout(()=>{                           
            this.router.navigate(['/kobipronam2025']);
          }, 2000);
        }
      },
      onError: err => {
        console.error('PayPal error:', err);
        this.toastr.error('Payment failed');
      }
    };
  }

  ngOnInit(): void 
  {
      console.log("ngOnInit called");
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

  postData(data: any) {
    const url = 'https://dhrubajyoti.com/nvbamail';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    this.http.post(url, data, { headers });
    console.log(data);
  }
}

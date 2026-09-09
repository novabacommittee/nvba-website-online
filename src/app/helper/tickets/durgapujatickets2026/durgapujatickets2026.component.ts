import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService } from './../../../shared/services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-durgapujatickets2026',
  templateUrl: './durgapujatickets2026.component.html',
  styleUrls: ['./durgapujatickets2026.component.scss']
})

export class Durgapujatickets2026Component implements OnInit, OnChanges, AfterViewChecked {

  private  memberCart = [{
    "name": "NVBA Annual Membership",
    "description": "NVBA Annual Membership Fee - 2026",
    "quantity": 1,
    "price": 30,
    "tax": 0,
    "sku": "MM2026YY",
    "currency": "USD"
  }];
  expired:any;
  currentDate:any;

  member:any;

  dataObject :any=[];
  culturalObject :any=[];
  checkObject :any=[];
  totalCost: number = 0;
  cartCheck: any;
  customClass = 'customClass';
  memberValidity : boolean = false;
  addtoCartBtn: boolean = true;

  // Set to true to release the Cultural Only tickets (Saturday & Sunday cultural program).
  // These are NOT part of the Early Bird / Regular pricing tiers.
  culturalReleased: boolean = false;

  // Switch this to '/assets/data/tickets/durgapuja-2026-regular.json' when Early Bird ends.
  private _jsonURLcart = '/assets/data/tickets/durgapuja-2026-earlybird.json';
  private _jsonURLcultural = '/assets/data/tickets/durgapuja-2026-cultural.json';

  constructor(
      private http: HttpClient,
      private cs: CartService,
      public router: Router,
      private auth: AuthService,
      private cdr: ChangeDetectorRef)
  {
      this.cs.currentCart.subscribe( cartCheck => this.cartCheck = cartCheck);

      forkJoin({
        tickets: this.getJSON(this._jsonURLcart),
        cultural: this.getJSON(this._jsonURLcultural).pipe(catchError(() => of([])))
      }).subscribe(({ tickets, cultural }: any) => {
        this.dataObject = tickets;
        this.culturalObject = cultural;

        this.auth.member.subscribe( m => {
          this.member = m;

          if (!m) {
            this.memberValidity = false;
            return;
          }

          this.currentDate = moment();

          if(moment(this.member.expires).isAfter(this.currentDate) ){
            this.memberValidity = true;
            this.member.membershipstatus = 'Valid';
          }
          else{
            this.memberValidity = false;
            this.member.membershipstatus = 'Expired';
          }
        });

        this.checkData();
      });
  }


  ngOnInit(): void {
  }

   public getJSON(url: string): Observable<any> {
     return this.http.get(url);
   }

   checkData(){
    [...this.dataObject, ...this.culturalObject].forEach(value => {
      [...this.cartCheck].forEach(element => {
        if(value.sku === element.sku){
          value.quantity = element.quantity;
        }
      });
    });
   }


  ngOnChanges(): void{

  }

  ngAfterViewChecked(): void {
    let tc = 0;

    [...this.dataObject, ...this.culturalObject].forEach(value => {
      if(value.quantity > 0){
        tc += (value.price * value.quantity);
      }
    });

    this.totalCost = tc;
    this.cdr.detectChanges();
  }

  addMembershipToCartobj(){
    this.cs.items = [];
    this.cs.addToCart(this.memberCart);
    this.router.navigate(['/checkout']);
  }

  addToCartobj(){
    this.cs.items = [];
    [...this.dataObject, ...this.culturalObject].forEach((value:any) => {
      if(value.quantity > 0){
        this.cs.items.push(value);
      }
    });
    this.cs.addToCart(this.cs.items);
    if(this.member?.expires)
    this.router.navigate(['/checkout']);
  }

  clearCart(){
    [...this.dataObject, ...this.culturalObject].forEach(value => {
      value.quantity = 0;
    });
  }
}

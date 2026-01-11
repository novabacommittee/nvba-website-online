import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sptickets2026',
  templateUrl: './sptickets2026.component.html',
  styleUrls: ['./sptickets2026.component.scss']
})

export class SPtickets2026Component implements OnInit, OnChanges, AfterViewChecked {

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

  private  priorityPassCart = [{
    "name": "NVBA Saraswati Puja 2026 Priority Pass(Skip line at registration, food and auditorium priority seating for everyone)",
    "description": "Priority Pass - 2026",
    "quantity": 0,
    "price": 5,
    "tax": 0,
    "sku": "SP2026PRPASS",
    "currency": "USD"
  }];

  member:any;

  dataObject :any=[];
  checkObject :any=[];
  totalCost: number = 0;
  cartCheck: any;
  customClass = 'customClass';
  memberValidity : boolean = false;
  addtoCartBtn: boolean = true;
  priorityPassChecked: boolean = false;
  priorityPassLimit : boolean = false;

  private _jsonURLcart = '/assets/data/tickets/tickets-2026-SP-regular.json';

  constructor(
      private http: HttpClient,
      private cs: CartService,
      public router: Router,
      private auth: AuthService,
      private cdr: ChangeDetectorRef)
  {
      this.cs.currentCart.subscribe( cartCheck => this.cartCheck = cartCheck);
      this.getJSON().subscribe((data: any) => {
//      console.log(data);
      this.dataObject = data;

      this.auth.member.subscribe( m => {
        this.member = m;
        console.log(moment(this.member.expires));

        this.currentDate = moment();

        if(moment(this.member.expires).isAfter(this.currentDate) )
        {
            this.memberValidity = true;
            this.member.membershipstatus = 'Valid';
        }
        else
        {
            this.memberValidity = false;
            this.member.membershipstatus = 'Expired';
        }

        this.priorityPassLimit = false;
      });

      this.checkData();
     });
  }


  ngOnInit(): void {
  }

   public getJSON(): Observable<any> {
     return this.http.get(this._jsonURLcart);
   }

   checkData(){
    [...this.dataObject].forEach(value => {
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

    [...this.dataObject].forEach(value => {
      console.log(value.quantity);
      if(value.quantity > 0){
        if(!this.memberValidity)
        {
          if(value.sku != 'SP2026EBKIDS' && value.sku != 'SP2026KIDSREGULAR')
            tc += ((value.price+15) * value.quantity);
          else
            tc += (value.price * value.quantity);
        }
        else
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
    let ticketCount = 0;
    this.cs.items = [];
    this.dataObject.forEach((value:any) => {
//    console.log(value.quantity);
      if(value.quantity > 0){
          //console.log(value.quantity);
          if(!this.memberValidity)
          {
            if(value.sku != 'SP2026EBKIDS' && value.sku != 'SP2026KIDSREGULAR')
              value.price = value.price+15;
          }
          this.cs.items.push(value);
  //        console.log(value);
          if(value.sku != 'SP2026EBKIDS' && value.sku != 'SP2026KIDSREGULAR')
            ticketCount += value.quantity;
      }
    });

    if(this.priorityPassChecked && ticketCount > 0){
        this.priorityPassCart.forEach((value:any) => {
          //value.price = (ticketCount * 5);
          value.quantity = ticketCount;
          this.cs.items.push(value);
        });
    }

    this.cs.addToCart(this.cs.items);
    this.router.navigate(['/checkout']);
  }

  clearCart(){

    [...this.dataObject].forEach(value => {
      value.quantity = 0;
    });
  }

  onRowChecked(label: string, event: Event) {
    this.priorityPassChecked = (event.target as HTMLInputElement).checked;
    console.log(label, this.priorityPassChecked);
  }
}

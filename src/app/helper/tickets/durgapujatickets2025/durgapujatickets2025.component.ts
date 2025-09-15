import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService } from './../../../shared/services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-durgapujatickets2025',
  templateUrl: './durgapujatickets2025.component.html',
  styleUrls: ['./durgapujatickets2025.component.scss']
})

export class Durgapujatickets2025Component implements OnInit, OnChanges, AfterViewChecked {

  private  memberCart = [{
    "name": "NVBA Annual Membership",
    "description": "NVBA Annual Membership Fee - 2025",
    "quantity": 1,
    "price": 30,
    "tax": 0,
    "sku": "MM2025YY",
    "currency": "USD" 
  }];
  expired:any;
  currentDate:any;

  member:any;

  dataObject :any=[];
  checkObject :any=[];
  totalCost: number = 0;
  cartCheck: any;
  customClass = 'customClass';
  memberValidity : boolean = false;


  addtoCartBtn: boolean = true;

  private _jsonURLcart = '/assets/data/tickets/durgapuja-2025-earlybird.json';

  constructor(
      private http: HttpClient, 
      private cs: CartService, 
      public router: Router, 
      private auth: AuthService, 
      private cdr: ChangeDetectorRef) 
  {
      this.cs.currentCart.subscribe( cartCheck => this.cartCheck = cartCheck);
      this.getJSON().subscribe((data: any) => {
      //console.log(data);
      this.dataObject = data;

      this.auth.member.subscribe( m => {
        this.member = m;
        //console.log(moment(this.member.expires));
  
        this.currentDate = moment();
  
        if(moment(this.member.expires).isAfter(this.currentDate) ){
          this.memberValidity = true;
            this.member.membershipstatus = 'Valid';
          }
          else{
            this.memberValidity = false;
            this.member.membershipstatus = 'Expire';
          }
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
      //console.log(value);
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
    //console.log(this.cs.items);
    this.dataObject.forEach((value:any) => {
    //console.log(value.quantity);
    //console.log(value);
    if(value.quantity > 0){ 
        //console.log(value.quantity);
        this.cs.items.push(value);
       
        //console.log(value);
     } 
    });
    this.cs.addToCart(this.cs.items);
    if(this.member?.expires)
    this.router.navigate(['/checkout']);
  }

  clearCart(){

    [...this.dataObject].forEach(value => {
      value.quantity = 0;
    });
  }
}

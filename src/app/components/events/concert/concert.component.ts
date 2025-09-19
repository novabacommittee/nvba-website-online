import { Component, OnInit, OnChanges, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { CartService  } from '../../../shared/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.scss']
})

export class ConcertComponent implements OnInit, OnChanges, AfterViewChecked {

  dataObject :any=[];
  checkObject :any=[];
  cartObject : any=[];
  totalCost: number = 0;
  cartCheck: any;
  customClass = 'customClass';

  addtoCartBtn: boolean = true;
  headCount!: number;

  kkticket:boolean = false;


  private _jsonURLcart = '/assets/data/tickets/tickets-2025-concert.json';
   constructor(private http: HttpClient, private cs: CartService, public router: Router, private cdr: ChangeDetectorRef) {
    this.cs.currentCart.subscribe( cartCheck => this.cartCheck = cartCheck);
    this.getJSON().subscribe(data => {
      //console.log(data);
      this.dataObject = data;
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
    this.headCount = 0;
    let ticketCount = 0;
    
    [...this.dataObject].forEach(value => {
      //console.log(value);
      if(value.quantity > 0){ 
        tc += (value.price * value.quantity);
      }
    });
    
    if(ticketCount>this.headCount){
      this.addtoCartBtn = false;
    }
    else{
      this.addtoCartBtn = true;
    }

    this.totalCost = tc;
    this.cdr.detectChanges();
  }
  
  addToCartobj(){
    //console.log(this.dataObject);
    //console.log(this.cs.items);
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
    //console.log(this.cs.items);
    this.cs.addToCart(this.cs.items);

    this.router.navigate(['/concertcheckout']);
  }

  clearCart(){
    [...this.dataObject].forEach(value => {
      value.quantity = 0;
    });
  }
}

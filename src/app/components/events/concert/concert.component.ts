import { Component, OnInit, OnChanges, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { CartService  } from '../../../shared/services/cart.service';
import { Router } from '@angular/router';
import { timestamp } from 'rxjs/operators';

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
  kidsCount!: number;

  kkticket:boolean = false;
  // kkAdultsCount: number = 0;
  // kkkidsCount: number = 0;
  // headCount: number = 0;


  private _jsonURLcart = '/assets/data/tickets/tickets-2024-concert.json';
   constructor(private http: HttpClient, private cs: CartService, public router: Router, private cdr: ChangeDetectorRef) {
    this.cs.currentCart.subscribe( cartCheck => this.cartCheck = cartCheck);
    this.getJSON().subscribe(data => {
   //   ////console.log(data);
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
 //   ////console.log('this.dataObject - Check data');
 //   ////console.log(this.dataObject);
   }

  
  ngOnChanges(): void{

  }

  ngAfterViewChecked(): void {
    let tc = 0;
    this.headCount = 0;
    let ticketCount = 0;
    this.kidsCount = 0;
    let kidsTicketKK = 0;
    
    [...this.dataObject].forEach(value => {
   //   ////console.log(value);
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
    ////console.log(this.dataObject);
    ////console.log(this.cs.items);
    this.cs.items = [];
    ////console.log(this.cs.items);
    this.dataObject.forEach((value:any) => {
  //    ////console.log(value.quantity);
    //  ////console.log(value);
      if(value.quantity > 0){ 
       // this.cs.addToCart(value);
        ////console.log(value.quantity);
        this.cs.items.push(value);
      //  this.totalCost += (parseFloat(value.price) * parseFloat(value.quantity));
        // value.tax = (value.price * value.quantity) * 0.00; 
        // value.tax = parseFloat(value.tax).toFixed(2);
       // this.cs.addToCart(value);
       
        ////console.log(value);
     //   this.checkObject.push(value);
     } 
    });
    ////console.log(this.cs.items);
    this.cs.addToCart(this.cs.items);

 //   this.cs.addToCart(this.checkObject);
    this.router.navigate(['/concertcheckout']);
 //   this.router.navigate(['/heroes', { id: itemId }]);

 //   item.count = 
//    this.cartService.addToCart();
  }

  clearCart(){
    [...this.dataObject].forEach(value => {
      value.quantity = 0;
    });
  }




}


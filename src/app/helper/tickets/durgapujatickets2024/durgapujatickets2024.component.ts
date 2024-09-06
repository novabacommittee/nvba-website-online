import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-durgapujatickets2024',
  templateUrl: './durgapujatickets2024.component.html',
  styleUrls: ['./durgapujatickets2024.component.scss']
})
export class Durgapujatickets2024Component implements OnInit, OnChanges, AfterViewChecked {

  dataObject :any=[];
  checkObject :any=[];
  cartObject : any=[];
  totalCost: number = 0;
  cartCheck: any;
  customClass = 'customClass';


  addtoCartBtn: boolean = true;
  headCount!: number;
  kidsCount!: number;



  private _jsonURLcart = '/assets/data/tickets/durgapuja-2024-earlybird.json';
   constructor(private http: HttpClient, private cs: CartService, public router: Router, private cdr: ChangeDetectorRef) {
    this.cs.currentCart.subscribe( cartCheck => this.cartCheck = cartCheck);
    this.getJSON().subscribe((data: any) => {
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
    this.router.navigate(['/checkout']);
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


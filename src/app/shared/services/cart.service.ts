import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: any;

  constructor(  private http: HttpClient ) {}

  private cartvalue = new BehaviorSubject<any>('');
  currentCart = this.cartvalue.asObservable();

  addToCart(product:any) { 
    //console.log(product);
    this.items = [...product];
    //console.log(this.items);
    this.cartvalue.next(this.items);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    //console.log(" Clean Cart "+this.items);
    return this.items;
  }

  getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }

}

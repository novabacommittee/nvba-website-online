
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodticketsService {
  ticketsitems!: Observable<any[]>; 

  constructor(private db: AngularFireDatabase) {
    this.ticketsitems = db.list('/sp2025').valueChanges();
  }

  GetTicketsList() {
      return this.ticketsitems;
  }
}

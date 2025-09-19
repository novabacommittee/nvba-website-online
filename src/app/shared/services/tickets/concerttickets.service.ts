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
export class ConcertticketsService {
  ticketsitems!: Observable<any[]>; 

  constructor(private db: AngularFireDatabase) {
    this.ticketsitems = db.list('/concet-2025').valueChanges();
  }

  GetTicketsList() {
      return this.ticketsitems;
  }
}

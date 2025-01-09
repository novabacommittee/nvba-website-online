import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import 'firebase/database';
import { Observable } from 'rxjs';
import { MemberService } from '../member/member.service';


@Injectable({
  providedIn: 'root'
})
export class UserDetailsCheckService {

  constructor( ) {
  }

}

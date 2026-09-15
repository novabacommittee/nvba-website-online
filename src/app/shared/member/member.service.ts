import { Injectable } from '@angular/core';
// import { Member } from './member';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})

export class MemberService {
  membersRef!: AngularFireList<any>;
  memberRef!: AngularFireObject<any>;
  items!: Observable<any[]>; 
  pays!: Observable<any[]>; 

  constructor(private db: AngularFireDatabase) {
    this.items = db.list('/Members').valueChanges();
  }

  /* Create member */
  AddMember(member: any) {
    // this.membersRef
    //   .push({member})
    //   .catch((error) => {
    //     this.errorMgmt(error);
    //   });
    this.db.object('/Members/'+member.id).set({ ...member }).catch(error => 
    {
      ////console.log(error);
    }).then( c => {
      ////console.log("Success Create.");
    });
  }
  /* Get member */
  GetMember(id: string) {
    this.memberRef = this.db.object('/Members/' + id);
    return this.memberRef;
  }

  /* Get member */
  GetMemberbyEmail(email: string) {
    this.membersRef = this.db.list('/Members'+email);
 //   this.membersRef.valueChanges()
    return  this.membersRef;
  }

  /* Get members list */
  GetMembersList() {
  //  this.membersRef = this.db.list('/Members');
    return this.items;
  }

  /* Update member */
  UpdateMember(id: number, memb: any) {
    // console.log(id);
    // console.log(memb);
    // this.memberRef
    //   .update(member)
    //   .catch((error) => {
    //     this.errorMgmt(error);
    //   });

    this.db.object('/Members/' + memb.id).update( JSON.parse( JSON.stringify(memb ) )).catch(error => {
      this.errorMgmt(error);
      console.log(error);
    }).then( c => {
      console.log("success Update");
    });
  }

  /* Delete Member */
  // DeleteMember(id: string) {
  //   this.memberRef = this.db.object('books-list/' + id);
  //   this.memberRef.remove().catch((error) => {
  //     this.errorMgmt(error);
  //   });
  // }
  // Error management
  private errorMgmt(error: any) {
    ////console.log(error);
  }


  /* Members list WITH their DB keys (needed for targeted writes). */
  GetMembersWithKeys() {
    return this.db.list('/Members').snapshotChanges().pipe(
      map(changes => changes.map(c => ({ $key: c.payload.key, ...(c.payload.val() as any) })))
    );
  }

  /* Guarded clear: remove /Members/<key>/expires ONLY if it is still missing or
     invalid (never a valid future date). Transaction => race-safe. */
  clearExpires(key: string): Promise<any> {
    const ref = this.db.database.ref('Members/' + key + '/expires');
    return ref.transaction((cur: any) => {
      if (cur === null || cur === undefined) { return; }               // nothing to clear -> abort
      const m = (typeof cur === 'string') ? moment(cur, moment.ISO_8601, true) : null;
      if (m && m.isValid() && m.isAfter(moment())) { return; }          // legit future date -> abort
      return null;                                                      // delete the bad value
    });
  }

  /* Guarded set: write /Members/<key>/expires = iso ONLY if it is currently
     missing or invalid (do not overwrite a valid future date). */
  setExpires(key: string, iso: string): Promise<any> {
    const ref = this.db.database.ref('Members/' + key + '/expires');
    return ref.transaction((cur: any) => {
      const m = (typeof cur === 'string' && cur.trim() !== '') ? moment(cur, moment.ISO_8601, true) : null;
      if (m && m.isValid() && m.isAfter(moment())) { return; }          // already valid future -> abort
      return iso;                                                       // set corrected value
    });
  }

  /* Read one member record once (plain object, no key) — for concurrency checks. */
  getMemberOnce(key: string): Promise<any> {
    return this.db.database.ref('Members/' + key).once('value').then(snap => snap.val());
  }

  /* Replace the ENTIRE member record at /Members/<key> with obj. */
  setMemberRaw(key: string, obj: any): Promise<any> {
    return this.db.object('/Members/' + key).set(obj);
  }

  /* Merge obj into /Members/<key> (top-level keys; a null value deletes that key). */
  updateMemberRaw(key: string, obj: any): Promise<any> {
    return this.db.object('/Members/' + key).update(obj);
  }

  concert(purches:any){
      this.db.object('/concert-2025/'+purches.id).set({ ...purches }).catch(error => {
            console.log(error);
          }).then( c => {
            console.log("Success Create.");
          });
      }
  
  kp2023(purches:any){
        this.db.object('/kp2023/'+purches.id).set({ ...purches }).catch(error => {
              console.log(error);
            }).then( c => {
              console.log("Success Create.");
            });
        }

  kp2024(purches:any){
        this.db.object('/kp2024/'+purches.id).set({ ...purches }).catch(error => {
              console.log(error);
            }).then( c => {
              console.log("Success Create.");
            });
        }

  kp2025(purches:any){
    this.db.object('/kp2025/'+purches.id).set({ ...purches }).catch(error => {
          console.log(error);
        }).then( c => {
          console.log("Success Create.");
        });
    }
}

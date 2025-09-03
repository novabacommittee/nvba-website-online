import { Injectable } from '@angular/core';
// import { Member } from './member';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

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
    this.db.object('/Members/'+member.id).set({ ...member }).catch(error => {
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


  concert(purches:any){
  //  this.db.object('/concet-2022/').update( JSON.parse( JSON.stringify(memb ) )).catch(error => {
      this.db.object('/concet-2024/'+purches.id).set({ ...purches }).catch(error => {
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
  
  // dp2024(purches:any){
  //   this.db.object('/dp2024/'+purches.id).set({ ...purches }).catch(error => {
  //         console.log(error);
  //       }).then( c => {
  //         console.log("Success Create.");
  //       });
  //   }

  // sp2025(purches:any){
  //     this.db.object('/sp2025/'+purches.id).set({ ...purches }).catch(error => {
  //           console.log(error);
  //         }).then( c => {
  //           console.log("Success Create.");
  //         });
  //     }
  
}

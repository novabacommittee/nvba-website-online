import { Component, OnInit } from '@angular/core';
import { MemberService } from './../../../shared/member/member.service';
import { AuthService } from './../../../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import 'base64-js';
import { CartService } from './../../../shared/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  member:any;
  profileForm: FormGroup;
  showMyContainer: boolean = true;
  lastOrder:boolean = true;

  saveBtn: boolean = true;
  newUserCheck: boolean = true;
  newUserId: number = 0;
  

  sitehost = 'https://'+window.location.host +'/user-details-check/';
  siteUrl : any = null;
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  
  loadDiv:boolean = false;

  htmlContent:any = 'hello';

    private  memberCart = [{
    "name": "NVBA Annual Membership",
    "description": "NVBA Annual Membership Fee - 2026",
    "quantity": 1,
    "price": 30,
    "tax": 0,
    "sku": "MM2026YY",
    "currency": "USD" 
  }];


  constructor( 
    public ms:MemberService, 
    public as:AuthService,
    private fb: FormBuilder, 
    private cs: CartService, 
    public router: Router
) { 
  
    this.profileForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      photoURL: new FormControl(),
      address1: new FormControl(),
      address2: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      country: new FormControl(),
      zipcode: new FormControl
   });

   this.as.cast.subscribe( m => {
    this.member = m;
     console.log('this.member',this.member);
  // console.log(this.member);
    this.createForm(this.member?.id, this.member?.firstname, this.member?.lastname,this.member?.photoURL, this.member?.address1, this.member?.address2, this.member?.city, this.member?.state, this.member?.country, this.member?.zipcode );
    let encoded: string = btoa(this.member!.email);
  //  console.log(encoded);
    this.siteUrl = this.sitehost + encoded;
  //  console.log('this.siteUrl', this.siteUrl);
    setTimeout(() => {
      this.loadDiv = true;
    }, 10);
  });

   }

  ngOnInit(): void {}
   addToCartobj(){
    this.cs.items = [];
    this.cs.addToCart(this.memberCart); 
    //console.log(this.memberCart);
    this.router.navigate(['/checkout']);
  }


  createForm(id: any, firstname: any, lastname: any, photoURL: any, address1: any, address2: any, city: any, state: any, country: any, zipcode: any) {

//////console.log(id);
    this.profileForm = this.fb.group({
        id: [id, Validators.required],
        firstname: [firstname, Validators.required ],
        lastname: [lastname, Validators.required ],
        photoURL: [photoURL, Validators.required ],
        address1: [address1, Validators.required ],
        address2: [address2, Validators.required ],
        city: [city, Validators.required ],
        state: [state, Validators.required ],
        country: [country, Validators.required ],
        zipcode: [zipcode, Validators.required ]
      });
  }

  onSubmit(){
    ////console.log(this.profileForm.value);
    let merge = {...this.member, ...this.profileForm.value };
    ////console.log(merge);
    this.ms.UpdateMember(this.member.id, this.profileForm.value);
    alert('Your profile updated.');
//     this.saveBtn = false;
//  //   ////console.log(this.newUserCheck);
    
//   //  this.memberDetails.updateCustomer(this.profileForm);
// //   ////console.log(this.profileForm);
//     let v = {...this.member, ...this.profileForm.value };
// //    ////console.log(v);
//     if(this.newUserCheck){
//       this.memberDetails.createCustomer(v);
//     }
//     else{
//       this.memberDetails.updateCustomer(v);
//     }
//  //  this.userService.updateCurrentUser(v);
  }

  save(){ 
       ////console.log();
      //  this.userService.updateCurrentUser(value)
      //  .then(res => {
      //    ////console.log(res);
      //  }, err => ////console.log(err))
   
     }


onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
}   

}

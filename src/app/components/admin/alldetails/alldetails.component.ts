import { Component, OnInit } from '@angular/core';
import { MemberService } from './../../../shared/member/member.service';
import { ConcertticketsService } from './../../../shared/services/tickets/concerttickets.service';
import { FoodticketsService  } from './../../../shared/services/tickets/foodtickets.service';

import 'ag-grid-community';
import * as moment from 'moment';

@Component({
  selector: 'app-alldetails',
  templateUrl: './alldetails.component.html',
  styleUrls: ['./alldetails.component.scss']
})

export class AlldetailsComponent implements OnInit {
  members:any;
  rowData:any;
  concertTickets:any;
  foodTickets:any;
  private gridApi:any;
  private gridColumnApi:any;

  membershipList:any;
  dp2024TicketList:any;
  foodPurchaseList:any;
  membershipRenew:boolean = false;
  newPurches:boolean = false;

  MM2022YY: number = 0;
  MM2023YY: number = 0;
  MM2024YY: number = 0;

  SP2024AEBNON:number = 0;
  SP2024AEBVEG:number = 0;

  SP2024STUDENTEBNON:number =0;
  SP2024STUDENTEBVEG:number =0;

  SP2024KIDS:number =0;

  SP2023CTSATURDAY:number =0;

  KP2023NON:number = 0;
  KP2023VEG:number = 0;

  KP2024VEGCHOP:number = 0;
  KP2024GHUGNI:number = 0;
  KP2024TEA:number = 0;
  KP2024COLDDRINKS:number = 0;
  KP2024NONVEG:number = 0;
  KP2024VEG:number = 0;

  DP2024CTFRIDAY:number = 0;
  DP2024CTSATURDAY:number = 0;
  DP2024CTSUNDAY:number =0;

  DP2024EBALL01NON:number = 0;
  DP2024EBALL02VEG:number = 0;

  DP2024EBALL03NON:number = 0;
  DP2024EBALL04VEG:number = 0;

  DP2024EBALL05KID:number = 0;

  DP2024EBALL06NON:number = 0;
  DP2024EBALL07VEG:number = 0;

  DP2024EBFRI01NON:number = 0;
  DP2024EBFRI02VEG:number = 0;

  DP2024EBFRI03NON:number = 0;
  DP2024EBFRI04VEG:number = 0;

  DP2024EBFRI05KID:number = 0;

  // DP2024EBFRI06NON:number = 0;
  // DP2024EBFRI07VEG:number = 0;

  DP2024EBSAT01NON:number = 0;
  DP2024EBSAT02VEG:number = 0;

  DP2024EBSAT03NON:number = 0;
  DP2024EBSAT04VEG:number = 0;

  DP2024EBSAT05KID:number = 0;

  // DP2024EBSAT06NON:number = 0;
  // DP2024EBSAT07VEG:number = 0;

  DP2024EBSUN01NON:number = 0;
  DP2024EBSUN02VEG:number = 0;

  DP2024EBSUN03NON:number = 0;
  DP2024EBSUN04VEG:number = 0;

  DP2024EBSUN05KID:number = 0;

  // DP2024EBSUN06NON:number = 0;
  // DP2024EBSUN07VEG:number = 0;

  paymentTime:any;
  customAdult:number =0;
  customKid:number =0;

  user: { index:number; email: string; firstname: string; lastname: string; expires: string; phone:string} | undefined;

   kp2024FoodOurchaseDetails: { purchase_date_time:string;payer_id:string; email: string; firstname: string; lastname: string; payment_method: string; payment_status:string;total:number;
    vegchopcount:number;vegghugnicount:number;teacount:number;colddrinkscount:number;vegbiriyanicount:number;nonvegbiriyanicount:number
} | undefined;

  vegchopcount: number = 0;
  vegghugnicount: number = 0;
  teacount:number=0;
  colddrinkscount:number = 0;
  vegbiriyanicount:number = 0;
  nonvegbiriyanicount:number = 0;

  constructor(private mds: MemberService, private tds: ConcertticketsService, private foodds:FoodticketsService ) {

    this.mds.GetMembersList().subscribe(m=>{
      this.members = m;
    //  console.log(this.members);
      this.rowData =  this.members;
   //   console.log(this.rowData);
      this.checkDetails();
    })

    this.tds.GetTicketsList().subscribe(t => {
      this.concertTickets = t;
      console.log(t);
      this.checkConcertDetails();
    })

    this.foodds.GetTicketsList().subscribe(t => {
      this.foodTickets = t;
      console.log(t);
      this.checkKP2024Details();
    })

  }

  ngOnInit(): void {
  }

  membershipcolumnDefs = [
    { field: 'index',  sortable: true, resizable: true,  cellClass: 'id-class center' },
		{ field: 'firstname', sortable: true, resizable: true, filter: true , cellClass: 'center' },
		{ field: 'lastname', sortable: true, resizable: true, filter: true, cellClass: 'center' },
    { field: 'email', sortable: true, resizable: true, filter: true },
    { field: 'phone', sortable: true, resizable: true, filter: true },
    { field: 'paymentTime', headerName:'Renewed Last', sortable: true, resizable: true },
    { field: 'MM2024YY', headerName:'Membership', sortable: true, resizable: true },
    { field: 'expires', sortable: true, resizable: true, filter: true }
	];


  kp2024foodPurchasecolumnDefs = [
    // { field: 'payer_id',  sortable: true, resizable: true,  cellClass: 'id-class center' },
		{ field: 'purchase_date_time', headerName:'Purchase Date/Time',sortable: true, resizable: false, filter: true  },
		{ field: 'firstname', sortable: true, resizable: false, filter: true  },
		{ field: 'lastname', sortable: true, resizable: false, filter: true },
    // { field: 'email', sortable: true, resizable: true, filter: true },
    { field: 'vegchopcount', headerName:'Veg Chop', sortable: true, resizable: false },
    { field: 'vegghugnicount', headerName:'Veg Ghugni', sortable: true, resizable: false },
    { field: 'teacount', headerName:'Tea', sortable: true, resizable: false },
    { field: 'colddrinkscount', headerName:'Cold Drinks', sortable: true, resizable: false },
    { field: 'vegbiriyanicount', headerName:'Veg Biriyani', sortable: true, resizable: false },
    { field: 'nonvegbiriyanicount', headerName:'Non-Veg Biriyani', sortable: true, resizable: false },
    { field: 'total', sortable: true, resizable: true, filter: false },
    { field: 'payment_method', sortable: true, resizable: true, filter: false },
    { field: 'payment_status', headerName:'Status', sortable: true, resizable: false },
	];


  dp2024columnDefsTickets = [
    { field: 'index',  sortable: true, resizable: true,  cellClass: 'id-class center' },
		{ field: 'firstname', sortable: true, resizable: true, filter: true , cellClass: 'center' },
		{ field: 'lastname', sortable: true, resizable: true, filter: true, cellClass: 'center' },
    { field: 'email', sortable: true, resizable: true, filter: true },
    { field: 'phone', sortable: true, resizable: true, filter: true },
    { field: 'paymentTime', headerName:'Purchase Date', sortable: true, resizable: true },
    
    { field: 'DP2024EBALL01NON', headerName:'Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024EBALL02VEG', headerName:'Adult Veg', sortable: true, resizable: true },
    { field: 'DP2024EBALL03NON', headerName:'Kids [ 11 to 18 years ],Students and Visiting Parents Non-Veg ', sortable: true, resizable: true },
    { field: 'DP2024EBALL04VEG', headerName:'Kids [ 11 to 18 years ],Students and Visiting Parents Veg', sortable: true, resizable: true },
    { field: 'DP2024EBALL05KID', headerName:'Kids [ 0 to 10 years ]', sortable: true, resizable: true },
    // { field: 'DP2024EBALL06NON', headerName:'Students and Visiting Parents - Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2024EBALL07VEG', headerName:'Students and Visiting Parents - Veg', sortable: true, resizable: true },

    { field: 'DP2024EBFRI01NON', headerName:'Friday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024EBFRI02VEG', headerName:'Friday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2024EBFRI03NON', headerName:'Friday - Kids [ 11 to 18 years ],Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024EBFRI04VEG', headerName:'Friday - Kids [ 11 to 18 years ],Students and Visiting Parents Veg', sortable: true, resizable: true },
    { field: 'DP2024EBFRI05KID', headerName:'Friday - Kids[ 0 to 10years]', sortable: true, resizable: true },
    // { field: 'DP2024EBFRI06NON', headerName:'Friday - Students and Visiting Parents - Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2024EBFRI07VEG', headerName:'Friday - Students and Visiting Parents - Veg', sortable: true, resizable: true },

    { field: 'DP2024EBSAT01NON', headerName:'Saturday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSAT02VEG', headerName:'Saturday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSAT03NON', headerName:'Saturday - Kids [ 11 to 18 years ],Students and Visiting Parents - Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSAT04VEG', headerName:'Saturday - Kids [ 11 to 18 years ],Students and Visiting Parents - Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSAT05KID', headerName:'Saturday - Kids [ 0 to 10 years ]', sortable: true, resizable: true },
    // { field: 'DP2024EBSAT06NON', headerName:'Saturday - Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2024EBSAT07VEG', headerName:'Saturday - Students and Visiting Parents Veg', sortable: true, resizable: true },

    { field: 'DP2024EBSUN01NON', headerName:'Sunday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSUN02VEG', headerName:'Sunday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSUN03NON', headerName:'Sunday - Kids [ 11 to 18 years ],Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSUN04VEG', headerName:'Sunday - Kids [ 11 to 18 years ],Students and Visiting Parents Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSUN05KID', headerName:'Sunday - Kids [ 0 to 10 years ]', sortable: true, resizable: true },
    // { field: 'DP2024EBSUN06NON', headerName:'Sunday - Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2024EBSUN07VEG', headerName:'Sunday - Students and Visiting Parents Veg', sortable: true, resizable: true }

    // { field: 'MM2024YY', headerName:'Membership', sortable: true, resizable: true },
    // { field: 'expires', sortable: true, resizable: true, filter: true }
	];


  checkConcertDetails(){
    try{
    [...this.concertTickets].forEach( ct =>{
        console.log(' Each row ', ct.transactions[0].item_list.items[0].quantity);
       [...ct.transactions[0].item_list.items].forEach(tic =>{
          if(tic.sku == 'DP2024CTFRIDAY'){
            this.DP2024CTFRIDAY = this.DP2024CTFRIDAY + parseInt(tic.quantity );
          }
          if(tic.sku == 'DP2024CTSATURDAY'){
            this.DP2024CTSATURDAY = this.DP2024CTSATURDAY + parseInt(tic.quantity );
          }
          if(tic.sku == 'DP2024CTSUNDAY'){
            this.DP2024CTSUNDAY = this.DP2024CTSUNDAY + parseInt(tic.quantity );
          }
       });
     });
    }
    catch (e) {
      console.error(e);
    }
  }


  checkKP2023Details(){
    try{
    [...this.foodTickets].forEach( ct =>{
        console.log(' Each row KP');
       console.log(ct.transactions[0].item_list.items[0].quantity );
       [...ct.transactions[0].item_list.items].forEach( nonandveg =>{

        console.log(nonandveg);
        //"KP2023VEG"
       if(nonandveg.sku == 'KP2023VEG'){
        this.KP2023VEG = this.KP2023VEG + parseInt(nonandveg.quantity );
       }
       //"KP2023NON"
       if(nonandveg.sku == 'KP2023NON'){
        this.KP2023NON = this.KP2023NON + parseInt(nonandveg.quantity );
       }
       })

       //"KP2023VEG"
       if(ct.transactions[0].item_list.items[0].sku == 'KP2023VEG'){
        this.KP2023VEG = this.KP2023VEG + parseInt(ct.transactions[0].item_list.items[0].quantity );
       }
       //"KP2023NON"
       if(ct.transactions[0].item_list.items[0].sku == 'KP2023NON'){
        this.KP2023NON = this.KP2023NON + parseInt(ct.transactions[0].item_list.items[0].quantity );
       }
       if(ct.transactions[0].item_list.items[1].sku == 'KP2023VEG'){
        this.KP2023VEG = this.KP2023VEG + parseInt(ct.transactions[0].item_list.items[1].quantity );
       }
       //"KP2023NON"
       if(ct.transactions[0].item_list.items[1].sku == 'KP2023NON'){
        this.KP2023NON = this.KP2023NON + parseInt(ct.transactions[0].item_list.items[1].quantity );
       }
     });
    }
    catch (e) {
      console.error(e);
    }
  }


  checkKP2024Details(){
      this.foodPurchaseList = [];

      try{
      [...this.foodTickets].forEach( ct =>{
        console.log(' Each row KP2024');

        this.vegchopcount = 0;
        this.vegghugnicount = 0;
        this.teacount = 0;
        this.colddrinkscount = 0;
        this.vegbiriyanicount = 0;
        this.nonvegbiriyanicount = 0;

        console.log(ct.transactions[0].item_list.items[0].quantity );
        [...ct.transactions[0].item_list.items].forEach( item =>{

          console.log(item);
          //"KP2024VEGCHOP"
          if(item.sku == 'KP2024VEGCHOP'){
            this.KP2024VEGCHOP = this.KP2024VEGCHOP + parseInt(item.quantity );
            this.vegchopcount = parseInt(item.quantity );
          }
          //"KP2024GHUGNI"
          if(item.sku == 'KP2024GHUGNI'){
            this.KP2024GHUGNI = this.KP2024GHUGNI + parseInt(item.quantity );
            this.vegghugnicount = parseInt(item.quantity );
          }
          //"KP2024TEA"
          if(item.sku == 'KP2024TEA'){
            this.KP2024TEA = this.KP2024TEA + parseInt(item.quantity );
            this.teacount = parseInt(item.quantity );
          }
          //"KP2024COLDDRINKS"
          if(item.sku == 'KP2024COLDDRINKS'){
            this.KP2024COLDDRINKS = this.KP2024COLDDRINKS + parseInt(item.quantity );
            this.colddrinkscount = parseInt(item.quantity );
          }

          //"KP2024VEG"
          if(item.sku == 'KP2024VEG'){
            this.KP2024VEG = this.KP2024VEG + parseInt(item.quantity );
            this.vegbiriyanicount = parseInt(item.quantity );
          }
          //"KP2024NON"
          if(item.sku == 'KP2024NONVEG'){
            this.KP2024NONVEG = this.KP2024NONVEG + parseInt(item.quantity );
            this.nonvegbiriyanicount = parseInt(item.quantity );
          }
       })

       this.kp2024FoodOurchaseDetails = {
        payer_id : ct.payer.payer_info.payer_id,
        purchase_date_time: ct.create_time,
        email : ct.payer.payer_info.email,
        firstname : ct.payer.payer_info.first_name,
        lastname : ct.payer.payer_info.last_name,
        payment_method : ct.payer.payment_method,
        payment_status : ct.state,
        total : ct.transactions[0].amount.total,
        vegchopcount : this.vegchopcount,
        vegghugnicount:this.vegghugnicount,
        teacount:this.teacount,
        colddrinkscount:this.colddrinkscount,
        vegbiriyanicount:this.vegbiriyanicount,
        nonvegbiriyanicount:this.nonvegbiriyanicount
      };
      this.foodPurchaseList.unshift(this.kp2024FoodOurchaseDetails);
    // console.log(this.kp2024FoodOurchaseDetails);

     });
    }
    catch (e) {
      console.error(e);
    }
  }


  checkDetails(){
    let couter = 0;

    this.membershipList = [];
    this.dp2024TicketList = [];
    
    this.MM2022YY = 0;
    this.MM2023YY = 0;
    this.MM2024YY = 0;

    this.DP2024EBALL01NON= 0;
    this.DP2024EBALL02VEG= 0;

    this.DP2024EBALL03NON= 0;
    this.DP2024EBALL04VEG= 0;

    this.DP2024EBALL05KID= 0;

    this.DP2024EBALL06NON= 0;
    this.DP2024EBALL07VEG= 0;

    this.DP2024EBFRI01NON= 0;
    this.DP2024EBFRI02VEG= 0;

    this.DP2024EBFRI03NON= 0;
    this.DP2024EBFRI04VEG= 0;

    this.DP2024EBFRI05KID= 0;

    // this.DP2024EBFRI06NON= 0;
    // this.DP2024EBFRI07VEG= 0;

    this.DP2024EBSAT01NON= 0;
    this.DP2024EBSAT02VEG= 0;

    this.DP2024EBSAT03NON= 0;
    this.DP2024EBSAT04VEG= 0;

    this.DP2024EBSAT05KID= 0;

    // this.DP2024EBSAT06NON= 0;
    // this.DP2024EBSAT07VEG= 0;

    this.DP2024EBSUN01NON= 0;
    this.DP2024EBSUN02VEG= 0;

    this.DP2024EBSUN03NON= 0;
    this.DP2024EBSUN04VEG= 0;

    this.DP2024EBSUN05KID= 0;

    // this.DP2024EBSUN06NON= 0;
    // this.DP2024EBSUN07VEG= 0;

    this.customAdult = 0;
    this.customKid = 0;

    this.SP2024AEBNON = 0;
    this.SP2024AEBVEG = 0;
  
    this.SP2024STUDENTEBNON =0;
    this.SP2024STUDENTEBVEG =0;
  
    this.SP2024KIDS=0;

    try{
    //console.log(this.rowData);
    [...this.rowData].forEach( m =>{ 
       console.log(m.purchase? true : false);

       if(m.purchase? true : false){
         
          [...m.purchase].forEach(element => {
          
          const userPurchase = {};
          console.log(element);
          
          if(element != undefined){

            [...element].forEach(e => {
              console.log(e.sku);
              console.log(e.paymentTime);

              this.paymentTime = moment(e.paymentTime).format("YYYY-MM-DD HH:mm");
              if(e.sku.includes("MM2024YY")){
                  this.MM2024YY += e.quantity ;
                  Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,MM2024YY:e.quantity,sku:e.sku,tax:e.tax});
                  this.membershipRenew = true;
              }

              // if(e.sku.includes("SP2024AEBNON")){
              //   this.SP2024AEBNON += e.quantity ;
              //   Object.assign(userTicket,{ SP2024AEBNON : e.quantity });
              //   this.newPurches = true;
              // }

              // if(e.sku.includes("SP2024AEBVEG")){
              //   this.SP2024AEBVEG += e.quantity ;
              //   Object.assign(userTicket,{ SP2024AEBVEG : e.quantity });
              //   this.newPurches = true;
              // }

              // if(e.sku.includes("SP2024STUDENTEBNON")){
              //   this.SP2024STUDENTEBNON += e.quantity ;
              //   Object.assign(userTicket,{ SP2024STUDENTEBNON : e.quantity });
              //   this.newPurches = true;
              // }

              // if(e.sku.includes("SP2024STUDENTEBVEG")){
              //   this.SP2024STUDENTEBVEG += e.quantity ;
              //   Object.assign(userTicket,{ SP2024STUDENTEBVEG : e.quantity });
              //   this.newPurches = true;
              // }

              // if(e.sku.includes("SP2024KIDS")){
              //   this.SP2024KIDS += e.quantity ;
              //   Object.assign(userTicket,{ SP2024KIDS : e.quantity });
              //   this.newPurches = true;
              // }

              // if(e.sku.includes("SP2023CTSATURDAY")){  
              //   this.SP2023CTSATURDAY += e.quantity ;
              //   Object.assign(userTicket,{ SP2023CTSATURDAY : e.quantity });
              //   this.newPurches = true;
              // }

              // if(e.sku.includes("KP2023NON")){  
              //   this.KP2023NON += e.quantity ;
              //   Object.assign(userTicket,{ KP2023NON : e.quantity });
              //   this.newPurches = true;
              // }
              // if(e.sku.includes("KP2023VEG")){  
              //   this.KP2023VEG += e.quantity ;
              //   Object.assign(userTicket,{ KP2023VEG : e.quantity });
              //   this.newPurches = true;
              // }

              // if(e.sku.includes("MM2022YY")){  KP2023VEG
              //     this.MM2022YY += e.quantity ;
              //     Object.assign(userTicket,{ MM2022YY : e.quantity });
              //     this.newPurches = true;
              // }

              //All 3 days Ticket
              else if(e.sku.includes('DP2024EBALL01NON') || e.sku.includes('DP2024ALL01NON')){
                  this.DP2024EBALL01NON += e.quantity ;
                  Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL01NON:e.quantity,sku:e.sku,tax:e.tax});
                  this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBALL02VEG') || e.sku.includes('DP2024ALL02VEG')){
                  this.DP2024EBALL02VEG += e.quantity ;
                  Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL02VEG:e.quantity,sku:e.sku,tax:e.tax});
                  this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBALL03NON') || e.sku.includes('DP2024ALL03NON')){
                  this.DP2024EBALL03NON += e.quantity ;
                  Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL03NON:e.quantity,sku:e.sku,tax:e.tax});
                  this.newPurches = true;
              }

              else if(e.sku.includes('DP2024EBALL04VEG') || e.sku.includes('DP2024ALL04VEG')){
                this.DP2024EBALL04VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL04VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBALL05KID') || e.sku.includes('DP2024ALL05KID')){
                this.DP2024EBALL05KID += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL05KID:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBALL06NON') || e.sku.includes('DP2024ALL06NON')){
                this.DP2024EBALL06NON += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL06NON:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBALL07VEG') || e.sku.includes('DP2024ALL07VEG')){
                this.DP2024EBALL07VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL07VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
                
              //Single Day Ticket
              //Friday
              else if(e.sku.includes('DP2024EBFRI01NON') || e.sku.includes('DP2024FRI01NON')){
                this.DP2024EBFRI01NON += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBFRI01NON:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBFRI02VEG') || e.sku.includes('DP2024FRI02VEG')){
                this.DP2024EBFRI02VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBFRI02VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBFRI03NON') || e.sku.includes('DP2024FRI03NON')){
                this.DP2024EBFRI03NON += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBFRI03NON:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBFRI04VEG') || e.sku.includes('DP2024FRI04VEG')){
                this.DP2024EBFRI04VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBFRI04VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBFRI05KID') || e.sku.includes('DP2024FRI05KID')){
                this.DP2024EBFRI05KID += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBFRI05KID:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              // if(e.sku.includes('DP2024EBFRI06NON') || e.sku.includes('DP2024FRI06NON')){
              //   this.DP2024EBFRI06NON += e.quantity ;
              //   Object.assign(userTicket,{ DP2024EBFRI06NON : e.quantity });
              //   this.newPurches = true;
              // }
              // if(e.sku.includes('DP2024EBFRI07VEG') || e.sku.includes('DP2024FRI07VEG')){
              //   this.DP2024EBFRI07VEG += e.quantity ;
              //   Object.assign(userTicket,{ DP2024EBFRI07VEG : e.quantity });
              //   this.newPurches = true;
              // }

              //Satuerday
              else if(e.sku.includes('DP2024EBSAT01NON') || e.sku.includes('DP2024SAT01NON')){
                this.DP2024EBSAT01NON += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSAT01NON:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBSAT02VEG') || e.sku.includes('DP2024SAT02VEG')){
                this.DP2024EBSAT02VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSAT02VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBSAT03NON') || e.sku.includes('DP2024SAT03NON')){
                this.DP2024EBSAT03NON += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSAT03NON:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBSAT04VEG') || e.sku.includes('DP2024SAT04VEG')){
                this.DP2024EBSAT04VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSAT04VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBSAT05KID') || e.sku.includes('DP2024SAT05KID')){
                this.DP2024EBSAT05KID += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSAT05KID:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              // if(e.sku.includes('DP2024EBSAT06NON') || e.sku.includes('DP2024SAT06NON')){
              //   this.DP2024EBSAT06NON += e.quantity ;
              //   Object.assign(userTicket,{ DP2024EBSAT06NON : e.quantity });
              //   this.newPurches = true;
              // }
              // if(e.sku.includes('DP2024EBSAT07VEG') || e.sku.includes('DP2024SAT07VEG')){
              //   this.DP2024EBSAT07VEG += e.quantity ;
              //   Object.assign(userTicket,{ DP2024EBSAT07VEG : e.quantity });
              //   this.newPurches = true;
              // }

              //Sunday
              else if(e.sku.includes('DP2024EBSUN01NON') || e.sku.includes('DP2024SUN01NON')){
                this.DP2024EBSUN01NON += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSUN01NON:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBSUN02VEG') || e.sku.includes('DP2024SUN02VEG')){
                this.DP2024EBSUN02VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSUN02VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBSUN03NON') || e.sku.includes('DP2024SUN03NON')){
                this.DP2024EBSUN03NON += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSUN03NON:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBSUN04VEG') || e.sku.includes('DP2024SUN04VEG')){
                this.DP2024EBSUN04VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSUN04VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2024EBSUN05KID') || e.sku.includes('DP2024SUN05KID')){
                this.DP2024EBSUN05KID += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSUN05KID:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              // if(e.sku.includes('DP2024EBSUN06NON') || e.sku.includes('DP2024SUN06NON')){
              //   this.DP2024EBSUN06NON += e.quantity ;
              //   Object.assign(userTicket,{ DP2024EBSUN06NON : e.quantity });
              //   this.newPurches = true;
              // }
              // if(e.sku.includes('DP2024EBSUN07VEG') || e.sku.includes('DP2024SUN07VEG')){  
              //   this.DP2024EBSUN07VEG += e.quantity ;
              //   Object.assign(userTicket,{ DP2024EBSUN07VEG : e.quantity });
              //   this.newPurches = true;
              // }
            }); // End of Purchase Loop e
          }
          
          if(this.newPurches || this.membershipRenew){
                this.user = {
                  index : m.id,
                  firstname : m.firstname,
                  lastname : m.lastname,
                  email : m.email,
                  phone : m.phone,
                  expires : moment(m.expires).format("YYYY-MM-DD")
                };
                Object.assign(this.user, userPurchase );

                if(this.membershipRenew == true){
                  this.membershipList.unshift(this.user);
                }
                else if(this.newPurches == true){
                  this.dp2024TicketList.unshift(this.user);
              }
              console.log(this.user);

              this.newPurches = false;
              this.membershipRenew = false;
            }
          }); // End of Each Member
        }

       couter++;
    });
 //   console.log(couter);
  //  this.lastOrder = this.rowData.purchase? true : false ;
    }
    catch (e) {
      console.error(e);
    }
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
  
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}

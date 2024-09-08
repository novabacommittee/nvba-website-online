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

  memberList:any;
  foodPurchaseList:any;
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

  DP2024ALL01NON:number = 0;
  DP2024ALL02VEG:number = 0;

  DP2024ALL03NON:number = 0;
  DP2024ALL04VEG:number = 0;

  DP2024ALL05KID:number = 0;

  DP2024ALL06NON:number = 0;
  DP2024ALL07VEG:number = 0;

  DP2024FRI01NON:number = 0;
  DP2024FRI02VEG:number = 0;

  DP2024FRI03NON:number = 0;
  DP2024FRI04VEG:number = 0;

  DP2024FRI05KID:number = 0;

  DP2024FRI06NON:number = 0;
  DP2024FRI07VEG:number = 0;

  DP2024SAT01NON:number = 0;
  DP2024SAT02VEG:number = 0;

  DP2024SAT03NON:number = 0;
  DP2024SAT04VEG:number = 0;

  DP2024SAT05KID:number = 0;

  DP2024SAT06NON:number = 0;
  DP2024SAT07VEG:number = 0;

  DP2024SUN01NON:number = 0;
  DP2024SUN02VEG:number = 0;

  DP2024SUN03NON:number = 0;
  DP2024SUN04VEG:number = 0;

  DP2024SUN05KID:number = 0;

  DP2024SUN06NON:number = 0;
  DP2024SUN07VEG:number = 0;

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
    { field: 'email', sortable: true, resizable: true, filter: true },
		{ field: 'firstname', sortable: true, resizable: true, filter: true , cellClass: 'center' },
		{ field: 'lastname', sortable: true, resizable: true, filter: true, cellClass: 'center' },
    { field: 'expires', sortable: true, resizable: true, filter: true },
    { field: 'MM2024YY', headerName:'Membership', sortable: true, resizable: true },
    { field: 'phone', sortable: true, resizable: true, filter: true }
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
    { field: 'email', sortable: true, resizable: true, filter: true },
		{ field: 'firstname', sortable: true, resizable: true, filter: true , cellClass: 'center' },
		{ field: 'lastname', sortable: true, resizable: true, filter: true, cellClass: 'center' },
    
    { field: 'DP2024ALL01NON', headerName:'Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024ALL02VEG', headerName:'Adult Veg', sortable: true, resizable: true },
    { field: 'DP2024ALL03NON', headerName:'Kids [ 11 to 18 years ] Non-Veg ', sortable: true, resizable: true },
    { field: 'DP2024ALL04VEG', headerName:'Kids [ 11 to 18 years ] Veg', sortable: true, resizable: true },
    { field: 'DP2024ALL05KID', headerName:'Kids [ 0 to 10 years ]', sortable: true, resizable: true },
    { field: 'DP2024ALL06NON', headerName:'Students and Visiting Parents - Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024ALL07VEG', headerName:'Students and Visiting Parents - Veg', sortable: true, resizable: true },

    { field: 'DP2024FRI01NON', headerName:'Friday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024FRI02VEG', headerName:'Friday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2024FRI03NON', headerName:'Friday - Kids [ 11 to 18 years ] Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024FRI04VEG', headerName:'Friday - Kids [ 11 to 18 years ] Veg', sortable: true, resizable: true },
    { field: 'DP2024FRI05KID', headerName:'Friday - Kids[ 0 to 10years]', sortable: true, resizable: true },
    { field: 'DP2024FRI06NON', headerName:'Friday - Students and Visiting Parents - Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024FRI07VEG', headerName:'Friday - Students and Visiting Parents - Veg', sortable: true, resizable: true },

    { field: 'DP2024SAT01NON', headerName:'Saturday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024SAT02VEG', headerName:'Saturday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2024SAT03NON', headerName:'Saturday - Kids [ 11 to 18 years ] - Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024SAT04VEG', headerName:'Saturday - Kids [ 11 to 18 years ] - Veg', sortable: true, resizable: true },
    { field: 'DP2024SAT05KID', headerName:'Saturday - Kids [ 0 to 10 years ]', sortable: true, resizable: true },
    { field: 'DP2024SAT06NON', headerName:'Saturday - Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024SAT07VEG', headerName:'Saturday - Students and Visiting Parents Veg', sortable: true, resizable: true },

    { field: 'DP2024SUN01NON', headerName:'Sunday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024SUN02VEG', headerName:'Sunday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2024SUN03NON', headerName:'Sunday - Kids [ 11 to 18 years ] Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024SUN04VEG', headerName:'Sunday - Kids [ 11 to 18 years ] Veg', sortable: true, resizable: true },
    { field: 'DP2024SUN05KID', headerName:'Sunday - Kids [ 0 to 10 years ]', sortable: true, resizable: true },
    { field: 'DP2024SUN06NON', headerName:'Sunday - Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024SUN07VEG', headerName:'Sunday - Students and Visiting Parents Veg', sortable: true, resizable: true },

    { field: 'expires', sortable: true, resizable: true, filter: true },
    { field: 'phone', sortable: true, resizable: true, filter: true },
    { field: 'MM2024YY', headerName:'Membership', sortable: true, resizable: true },
	];


  checkConcertDetails(){
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


  checkKP2023Details(){
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


  checkKP2024Details(){
      this.foodPurchaseList = [];

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


  checkDetails(){
    let couter = 0;

    this.memberList = [];
    
    this.MM2022YY = 0;
    this.MM2023YY = 0;
    this.MM2024YY = 0;

    this.DP2024ALL01NON= 0;
    this.DP2024ALL02VEG= 0;

    this.DP2024ALL03NON= 0;
    this.DP2024ALL04VEG= 0;

    this.DP2024ALL05KID= 0;

    this.DP2024ALL06NON= 0;
    this.DP2024ALL07VEG= 0;

    this.DP2024FRI01NON= 0;
    this.DP2024FRI02VEG= 0;

    this.DP2024FRI03NON= 0;
    this.DP2024FRI04VEG= 0;

    this.DP2024FRI05KID= 0;

    this.DP2024FRI06NON= 0;
    this.DP2024FRI07VEG= 0;

    this.DP2024SAT01NON= 0;
    this.DP2024SAT02VEG= 0;

    this.DP2024SAT03NON= 0;
    this.DP2024SAT04VEG= 0;

    this.DP2024SAT05KID= 0;

    this.DP2024SAT06NON= 0;
    this.DP2024SAT07VEG= 0;

    this.DP2024SUN01NON= 0;
    this.DP2024SUN02VEG= 0;

    this.DP2024SUN03NON= 0;
    this.DP2024SUN04VEG= 0;

    this.DP2024SUN05KID= 0;

    this.DP2024SUN06NON= 0;
    this.DP2024SUN07VEG= 0;

    this.customAdult = 0;
    this.customKid = 0;

    this.SP2024AEBNON = 0;
    this.SP2024AEBVEG = 0;
  
    this.SP2024STUDENTEBNON =0;
    this.SP2024STUDENTEBVEG =0;
  
    this.SP2024KIDS=0;

  //  console.log(this.rowData);
    [...this.rowData].forEach( m =>{ 
    //   console.log(m.purchase? true : false)  ;

       if(m.purchase? true : false){
         
          [...m.purchase].forEach(element => {
          const userTicket = {};
          this.newPurches = false;
      //     console.log(element);
           console.log(element.sku);
          [...element].forEach(e => {

                if(e.sku.includes("MM2024YY")){
                    this.MM2024YY += e.quantity ;
                    Object.assign(userTicket,{ MM2024YY : e.quantity });
                    this.newPurches = true;
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
                if(e.sku.includes('DP2024ALL01NON')){
                    this.DP2024ALL01NON += e.quantity ;
                    Object.assign(userTicket,{ DP2024ALL01NON : e.quantity });
                    this.newPurches = true;
                }
                if(e.sku.includes('DP2024ALL02VEG')){
                    this.DP2024ALL02VEG += e.quantity ;
                    Object.assign(userTicket,{ DP2024ALL02VEG : e.quantity });
                    this.newPurches = true;
                }
                if(e.sku.includes('DP2024ALL03NON')){
                    this.DP2024ALL03NON += e.quantity ;
                    Object.assign(userTicket,{ DP2024ALL03NON : e.quantity });
                    this.newPurches = true;
                }

                if(e.sku.includes('DP2024ALL04VEG')){
                  this.DP2024ALL04VEG += e.quantity ;
                  Object.assign(userTicket,{ DP2024ALL04VEG : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024ALL05KID')){
                  this.DP2024ALL05KID += e.quantity ;
                  Object.assign(userTicket,{ DP2024ALL05KID : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024ALL06NON')){
                  this.DP2024ALL06NON += e.quantity ;
                  Object.assign(userTicket,{ DP2024ALL06NON : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024ALL07VEG')){
                  this.DP2024ALL07VEG += e.quantity ;
                  Object.assign(userTicket,{ DP2024ALL07VEG : e.quantity });
                  this.newPurches = true;
                }
                
                //Single Day Ticket
                //Friday
                if(e.sku.includes('DP2024FRI01NON')){
                  this.DP2024FRI01NON += e.quantity ;
                  Object.assign(userTicket,{ DP2024FRI01NON : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024FRI02VEG')){
                  this.DP2024FRI02VEG += e.quantity ;
                  Object.assign(userTicket,{ DP2024FRI02VEG : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024FRI03NON')){
                  this.DP2024FRI03NON += e.quantity ;
                  Object.assign(userTicket,{ DP2024FRI03NON : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024FRI04VEG')){
                  this.DP2024FRI04VEG += e.quantity ;
                  Object.assign(userTicket,{ DP2024FRI04VEG : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024FRI05KID')){
                  this.DP2024FRI05KID += e.quantity ;
                  Object.assign(userTicket,{ DP2024FRI05KID : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024FRI06NON')){
                  this.DP2024FRI06NON += e.quantity ;
                  Object.assign(userTicket,{ DP2024FRI06NON : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024FRI07VEG')){
                  this.DP2024FRI07VEG += e.quantity ;
                  Object.assign(userTicket,{ DP2024FRI07VEG : e.quantity });
                  this.newPurches = true;
                }

                //Satuerday
                if(e.sku.includes('DP2024SAT01NON')){
                  this.DP2024SAT01NON += e.quantity ;
                  Object.assign(userTicket,{ DP2024SAT01NON : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024SAT02VEG')){
                  this.DP2024SAT02VEG += e.quantity ;
                  Object.assign(userTicket,{ DP2024SAT02VEG : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024SAT03NON')){
                  this.DP2024SAT03NON += e.quantity ;
                  Object.assign(userTicket,{ DP2024SAT03NON : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024SAT04VEG')){
                  this.DP2024SAT04VEG += e.quantity ;
                  Object.assign(userTicket,{ DP2024SAT04VEG : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024SAT05KID')){
                  this.DP2024SAT05KID += e.quantity ;
                  Object.assign(userTicket,{ DP2024SAT05KID : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024SAT06NON')){
                  this.DP2024SAT06NON += e.quantity ;
                  Object.assign(userTicket,{ DP2024SAT06NON : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024SAT07VEG')){
                  this.DP2024SAT07VEG += e.quantity ;
                  Object.assign(userTicket,{ DP2024SAT07VEG : e.quantity });
                  this.newPurches = true;
                }

                //Sunday
                if(e.sku.includes('DP2024SUN01NON')){
                  this.DP2024SUN01NON += e.quantity ;
                  Object.assign(userTicket,{ DP2024SUN01NON : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024SUN02VEG')){
                  this.DP2024SUN02VEG += e.quantity ;
                  Object.assign(userTicket,{ DP2024SUN02VEG : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024SUN03NON')){
                  this.DP2024SUN03NON += e.quantity ;
                  Object.assign(userTicket,{ DP2024SUN03NON : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024SUN04VEG')){
                  this.DP2024SUN04VEG += e.quantity ;
                  Object.assign(userTicket,{ DP2024SUN04VEG : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024SUN05KID')){
                  this.DP2024SUN05KID += e.quantity ;
                  Object.assign(userTicket,{ DP2024SUN05KID : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024SUN06NON')){
                  this.DP2024SUN06NON += e.quantity ;
                  Object.assign(userTicket,{ DP2024SUN06NON : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes('DP2024SUN07VEG')){  
                  this.DP2024SUN07VEG += e.quantity ;
                  Object.assign(userTicket,{ DP2024SUN07VEG : e.quantity });
                  this.newPurches = true;
                }
                
          }); // End of Purchase Loop e
          
          if(this.newPurches){
            this.user = {
              index : couter,
              email : m.email,
              firstname : m.firstname,
              lastname : m.lastname,
              expires : moment(m.expires).format("YYYY-MM-DD"),
              phone : m.phone
            };
            Object.assign(this.user, userTicket );
            //   this.user = this.user 
            this.memberList.unshift(this.user);
            // console.log(this.user);
          }
          
        }); // End of Each Member
       }

       couter++;
    });
 //   console.log(couter);
  //  this.lastOrder = this.rowData.purchase? true : false ;

  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
  
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}

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
  dp2024ConcertTicketList:any;
  dp2025TicketList:any;
  dp2025ConcertTicketList:any;
  foodPurchaseList:any;
  membershipRenew:boolean = false;
  newPurches:boolean = false;
  sp2025TicketList:any;

  MM2022YY: number = 0;
  MM2023YY: number = 0;
  MM2024YY: number = 0;
  MM2025YY: number = 0;

  KP2023NON:number = 0;
  KP2023VEG:number = 0;

  SP2024AEBNON:number = 0;
  SP2024AEBVEG:number = 0;
  SP2024STUDENTEBNON:number =0;
  SP2024STUDENTEBVEG:number =0;
  SP2024KIDS:number =0;

  KP2024VEGCHOP:number = 0;
  KP2024GHUGNI:number = 0;
  KP2024TEA:number = 0;
  KP2024COLDDRINKS:number = 0;
  KP2024NONVEG:number = 0;
  KP2024VEG:number = 0;

  DP2024CTFRIDAY:number = 0;
  DP2024CTSATURDAY:number = 0;
  DP2024CTSUNDAY:number =0;
  DP2024CTFRYSATCOMBO:number = 0;
  DP2024CTFRYSUNCOMBO:number = 0;
  DP2024CTSATSUNCOMBO:number =0;

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
  DP2024EBSAT01NON:number = 0;
  DP2024EBSAT02VEG:number = 0;
  DP2024EBSAT03NON:number = 0;
  DP2024EBSAT04VEG:number = 0;
  DP2024EBSAT05KID:number = 0;
  DP2024EBSUN01NON:number = 0;
  DP2024EBSUN02VEG:number = 0;
  DP2024EBSUN03NON:number = 0;
  DP2024EBSUN04VEG:number = 0;
  DP2024EBSUN05KID:number = 0;

  SP2025EBNVADULT:number = 0;
  SP2025EBVEGADULT:number = 0;
  SP2025EBNVOTHER:number =0;
  SP2025EBVEGOTHER:number =0;
  SP2025EBKIDS:number =0;

  KP2025TEA:number = 0;
  KP2025COFFEE:number = 0;
  KP2025COLDDRINKS:number = 0;
  KP2025VEGCHOP:number = 0;
  KP2025VEGCHOPDOUBLE:number = 0;
  KP2025GHUGNISINGLE:number = 0;
  KP2025GHUGNIDOUBLE:number = 0;
  KP2025JHALMURISINGLE:number = 0;
  KP2025JHALMURIDOUBLE:number = 0;
  KP2025EGGDEVILSINGLE:number = 0;
  KP2025EGGDEVILDOUBLE:number = 0;
  KP2025NONVEG:number = 0;
  KP2025VEG:number = 0;

  DP2025CTSATURDAY:number = 0;
  DP2025CTSUNDAY:number =0;
  DP2025CTCOMBO:number = 0;

  DP2025EBALL01NON:number = 0;
  DP2025EBALL02VEG:number = 0;
  DP2025EBALL03NON:number = 0;
  DP2025EBALL04VEG:number = 0;
  DP2025EBALL05KID:number = 0;

  DP2025EBFRI01NON:number = 0;
  DP2025EBFRI02VEG:number = 0;
  DP2025EBFRI03NON:number = 0;
  DP2025EBFRI04VEG:number = 0;
  DP2025EBFRI05KID:number = 0;

  DP2025EBSAT01NON:number = 0;
  DP2025EBSAT02VEG:number = 0;
  DP2025EBSAT03NON:number = 0;
  DP2025EBSAT04VEG:number = 0;
  DP2025EBSAT05KID:number = 0;
  
  DP2025EBSUN01NON:number = 0;
  DP2025EBSUN02VEG:number = 0;
  DP2025EBSUN03NON:number = 0;
  DP2025EBSUN04VEG:number = 0;
  DP2025EBSUN05KID:number = 0;

  paymentTime:any;
  customAdult:number =0;
  customKid:number =0;

  user: { index:number; email: string; firstname: string; lastname: string; expires: string; phone:string} | undefined;

   kp2024FoodPurchaseDetails: { purchase_date_time:string;payer_id:string; email: string; firstname: string; lastname: string; payment_method: string; payment_status:string;total:number;
    vegchopcount:number;vegghugnicount:number;teacount:number;colddrinkscount:number;vegbiriyanicount:number;nonvegbiriyanicount:number
} | undefined;

  kp2025FoodPurchaseDetails: { purchase_date_time:string;payer_id:string; email: string; firstname: string; lastname: string; payment_method: string; payment_status:string;total:number;
    teacount:number;coffeecount:number;colddrinkscount:number;
    vegchopcount:number;vegghugnicount:number;jhalmuricount:number;eggdevilcount:number;
    vegbiriyanicount:number;nonvegbiriyanicount:number
  } | undefined;

  //Beverage
  teacount:number=0;
  coffeecount:number=0;
  colddrinkscount:number = 0;
  //Snacks
  vegchopcount: number = 0;
  vegghugnicount: number = 0;
  jhalmuricount: number = 0;
  eggdevilcount: number = 0;
  //Dinner
  vegbiriyanicount:number = 0;
  nonvegbiriyanicount:number = 0;

  constructor(private mds: MemberService, private tds: ConcertticketsService, private foodds:FoodticketsService ) {

    this.mds.GetMembersList().subscribe(m=>{
      this.members = m;
      //console.log(this.members);
      this.rowData =  this.members;
      //console.log(this.rowData);
      this.checkDetails();
    })

    this.tds.GetTicketsList().subscribe(t => {
      this.concertTickets = t;
      //console.log(t);
      this.checkDP2025ConcertDetails();
    })

    this.foodds.GetTicketsList().subscribe(t => {
      this.foodTickets = t;
      //console.log(t);
      this.checkKP2025Details();
    })
  }

  ngOnInit(): void {
  }

  membershipcolumnDefs = [
    { field: 'id', sortable: true, filter: true, width: 90, cellClass: 'id-class center' },
		{ field: 'firstname', sortable: true, resizable: true, filter: true , cellClass: 'center' },
		{ field: 'lastname', sortable: true, resizable: true, filter: true, cellClass: 'center' },
    { field: 'email', sortable: true, resizable: true, filter: true },
    { field: 'phone', sortable: true, resizable: true, filter: true },
    { field: 'paymentTime', headerName:'Renewed Last', sortable: true, resizable: true },
    { field: 'MM2025YY', headerName:'Membership', sortable: true, resizable: true },
    { field: 'expires', sortable: true, resizable: true, filter: true }
	];


  kp2024foodPurchasecolumnDefs = [
		{ field: 'purchase_date_time', headerName:'Purchase Date/Time',sortable: true, resizable: false, filter: true  },
		{ field: 'firstname', sortable: true, resizable: false, filter: true  },
		{ field: 'lastname', sortable: true, resizable: false, filter: true },
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

    { field: 'DP2024EBFRI01NON', headerName:'Friday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024EBFRI02VEG', headerName:'Friday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2024EBFRI03NON', headerName:'Friday - Kids [ 11 to 18 years ],Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024EBFRI04VEG', headerName:'Friday - Kids [ 11 to 18 years ],Students and Visiting Parents Veg', sortable: true, resizable: true },
    { field: 'DP2024EBFRI05KID', headerName:'Friday - Kids[ 0 to 10years]', sortable: true, resizable: true },

    { field: 'DP2024EBSAT01NON', headerName:'Saturday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSAT02VEG', headerName:'Saturday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSAT03NON', headerName:'Saturday - Kids [ 11 to 18 years ],Students and Visiting Parents - Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSAT04VEG', headerName:'Saturday - Kids [ 11 to 18 years ],Students and Visiting Parents - Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSAT05KID', headerName:'Saturday - Kids [ 0 to 10 years ]', sortable: true, resizable: true },

    { field: 'DP2024EBSUN01NON', headerName:'Sunday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSUN02VEG', headerName:'Sunday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSUN03NON', headerName:'Sunday - Kids [ 11 to 18 years ],Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSUN04VEG', headerName:'Sunday - Kids [ 11 to 18 years ],Students and Visiting Parents Veg', sortable: true, resizable: true },
    { field: 'DP2024EBSUN05KID', headerName:'Sunday - Kids [ 0 to 10 years ]', sortable: true, resizable: true },
	];

  dp2024ConcertTicketcolumnDefs = [
		{ field: 'create_time', headerName:'Purchase Date/Time',sortable: true, resizable: false, filter: true  },
    { field: 'description', headerName:'Description', sortable: true, resizable: true },
    { field: 'price', headerName:'Price', sortable: true, resizable: false },
    { field: 'quantity', headerName:'Quantity', sortable: true, resizable: false },
    { field: 'sku', headerName:'Product Code', sortable: true, resizable: false },
		{ field: 'first_name', sortable: true, resizable: false, filter: true  },
		{ field: 'last_name', sortable: true, resizable: false, filter: true },
	];

  sp2025columnDefsTickets = [
		{ field: 'firstname', sortable: true, resizable: true, filter: true , cellClass: 'center' },
		{ field: 'lastname', sortable: true, resizable: true, filter: true, cellClass: 'center' },
    { field: 'email', sortable: true, resizable: true, filter: true },
    { field: 'phone', sortable: true, resizable: true, filter: true },
    { field: 'paymentTime', headerName:'Purchase Date', sortable: true, resizable: true },
    
    { field: 'SP2025EBNVADULT', headerName:'Adult Non-Veg', sortable: true, resizable: true },
    { field: 'SP2025EBVEGADULT', headerName:'Adult Veg', sortable: true, resizable: true },
    { field: 'SP2025EBNVOTHER', headerName:'Teens [ 11 to 18 years ],Students and Visiting Parents Non-Veg ', sortable: true, resizable: true },
    { field: 'SP2025EBVEGOTHER', headerName:'Teens [ 11 to 18 years ],Students and Visiting Parents Veg', sortable: true, resizable: true },
    { field: 'SP2025EBKIDS', headerName:'Kids meal for age group [ 0 to 10 years ]', sortable: true, resizable: true }
	];

  kp2025foodPurchasecolumnDefs = [
		{ field: 'purchase_date_time', headerName:'Purchase Date/Time',sortable: true, resizable: false, filter: true  },
		{ field: 'firstname', sortable: true, resizable: false, filter: true  },
		{ field: 'lastname', sortable: true, resizable: false, filter: true },
    { field: 'teacount', headerName:'Tea', sortable: true, resizable: false },
    { field: 'coffeecount', headerName:'Coffee', sortable: true, resizable: false },
    { field: 'colddrinkscount', headerName:'Cold Drinks', sortable: true, resizable: false },
    { field: 'vegchopcount', headerName:'Veg Chop', sortable: true, resizable: false },
    { field: 'jhalmuricount', headerName:'Jhal Muri', sortable: true, resizable: false },
    { field: 'vegghugnicount', headerName:'Veg Ghugni', sortable: true, resizable: false },
    { field: 'eggdevilcount', headerName:'Egg Devil', sortable: true, resizable: false },
    { field: 'vegbiriyanicount', headerName:'Veg Biriyani', sortable: true, resizable: false },
    { field: 'nonvegbiriyanicount', headerName:'Non-Veg Biriyani', sortable: true, resizable: false },
    { field: 'total', sortable: true, resizable: true, filter: false },
    { field: 'payment_method', sortable: true, resizable: true, filter: false },
    { field: 'payment_status', headerName:'Status', sortable: true, resizable: false },
	];

  dp2025columnDefsTickets = [
		{ field: 'firstname', sortable: true, resizable: true, filter: true , cellClass: 'center' },
		{ field: 'lastname', sortable: true, resizable: true, filter: true, cellClass: 'center' },
    { field: 'email', sortable: true, resizable: true, filter: true },
    { field: 'phone', sortable: true, resizable: true, filter: true },
    { field: 'paymentTime', headerName:'Purchase Date', sortable: true, resizable: true },
    
    { field: 'DP2025EBALL01NON', headerName:'Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2025EBALL02VEG', headerName:'Adult Veg', sortable: true, resizable: true },
    { field: 'DP2025EBALL03NON', headerName:'Kids [ 11 to 18 years ],Students and Visiting Parents Non-Veg ', sortable: true, resizable: true },
    { field: 'DP2025EBALL04VEG', headerName:'Kids [ 11 to 18 years ],Students and Visiting Parents Veg', sortable: true, resizable: true },
    { field: 'DP2025EBALL05KID', headerName:'Kids [ 0 to 10 years ]', sortable: true, resizable: true },

    { field: 'DP2025EBFRI01NON', headerName:'Friday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2025EBFRI02VEG', headerName:'Friday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2025EBFRI03NON', headerName:'Friday - Kids [ 11 to 18 years ],Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    { field: 'DP2025EBFRI04VEG', headerName:'Friday - Kids [ 11 to 18 years ],Students and Visiting Parents Veg', sortable: true, resizable: true },
    { field: 'DP2025EBFRI05KID', headerName:'Friday - Kids[ 0 to 10years]', sortable: true, resizable: true },

    { field: 'DP2025EBSAT01NON', headerName:'Saturday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2025EBSAT02VEG', headerName:'Saturday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2025EBSAT03NON', headerName:'Saturday - Kids [ 11 to 18 years ],Students and Visiting Parents - Non-Veg', sortable: true, resizable: true },
    { field: 'DP2025EBSAT04VEG', headerName:'Saturday - Kids [ 11 to 18 years ],Students and Visiting Parents - Veg', sortable: true, resizable: true },
    { field: 'DP2025EBSAT05KID', headerName:'Saturday - Kids [ 0 to 10 years ]', sortable: true, resizable: true },

    { field: 'DP2025EBSUN01NON', headerName:'Sunday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2025EBSUN02VEG', headerName:'Sunday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2025EBSUN03NON', headerName:'Sunday - Kids [ 11 to 18 years ],Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    { field: 'DP2025EBSUN04VEG', headerName:'Sunday - Kids [ 11 to 18 years ],Students and Visiting Parents Veg', sortable: true, resizable: true },
    { field: 'DP2025EBSUN05KID', headerName:'Sunday - Kids [ 0 to 10 years ]', sortable: true, resizable: true },
	];

  dp2025ConcertTicketcolumnDefs = [
		{ field: 'create_time', headerName:'Purchase Date/Time',sortable: true, resizable: false, filter: true  },
    { field: 'description', headerName:'Description', sortable: true, resizable: true },
    { field: 'price', headerName:'Price', sortable: true, resizable: false },
    { field: 'quantity', headerName:'Quantity', sortable: true, resizable: false },
    { field: 'sku', headerName:'Product Code', sortable: true, resizable: false },
		{ field: 'first_name', sortable: true, resizable: false, filter: true  },
		{ field: 'last_name', sortable: true, resizable: false, filter: true },
	];

  checkDP2025ConcertDetails(){
    try{

    this.dp2025ConcertTicketList = [];

    [...this.concertTickets].forEach( ct =>{
        console.log(' Each row ', ct.purchase_units[0].items[0].quantity);
        const concertPurchase = {};

        [...ct.purchase_units[0].items].forEach(tic =>{
          if(tic.sku == 'DP2025CTSATDAY'){
            this.DP2025CTSATURDAY = this.DP2025CTSATURDAY + parseInt(tic.quantity );
          }
          if(tic.sku == 'DP2025CTSUNDAY'){
            this.DP2025CTSUNDAY = this.DP2025CTSUNDAY + parseInt(tic.quantity );
          }
          if(tic.sku == 'DP2025CTCOMBO'){
            this.DP2025CTCOMBO = this.DP2025CTCOMBO + parseInt(tic.quantity );
          }
       });

       Object.assign(concertPurchase,{ create_time: moment(ct.create_time).format("YYYY-MM-DD HH:mm"), first_name:ct.payer.payer_info.first_name, 
        last_name:ct.payer.payer_info.last_name,
        email:ct.payer.payer_info.email,description:ct.transactions[0].item_list.items[0].description,
        price:ct.transactions[0].item_list.items[0].price,quantity:ct.transactions[0].item_list.items[0].quantity,sku:ct.transactions[0].item_list.items[0].sku});

      this.dp2025ConcertTicketList.unshift(concertPurchase);
      // console.log(concertPurchase);
      });
    }
    catch (e) {
      console.error(e);
    }
  }

  checkDP2024ConcertDetails(){
    try{

    this.dp2024ConcertTicketList = [];

    [...this.concertTickets].forEach( ct =>{
        console.log(' Each row ', ct.transactions[0].item_list.items[0].quantity);
        const concertPurchase = {};

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

       Object.assign(concertPurchase,{ create_time: moment(ct.create_time).format("YYYY-MM-DD HH:mm"), first_name:ct.payer.payer_info.first_name, 
        last_name:ct.payer.payer_info.last_name,
        email:ct.payer.payer_info.email,description:ct.transactions[0].item_list.items[0].description,
        price:ct.transactions[0].item_list.items[0].price,quantity:ct.transactions[0].item_list.items[0].quantity,sku:ct.transactions[0].item_list.items[0].sku});

      this.dp2024ConcertTicketList.unshift(concertPurchase);
    // console.log(concertPurchase);
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
      if(nonandveg.sku == 'KP2023VEG')
      {
        this.KP2023VEG = this.KP2023VEG + parseInt(nonandveg.quantity );
      }
       //"KP2023NON"
      if(nonandveg.sku == 'KP2023NON')
      {
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
        console.log('Each row KP2024');

        this.vegchopcount = 0;
        this.vegghugnicount = 0;
        this.teacount = 0;
        this.colddrinkscount = 0;
        this.vegbiriyanicount = 0;
        this.nonvegbiriyanicount = 0;

        console.log(ct.transactions[0].item_list.items[0].quantity );
        [...ct.transactions[0].item_list.items].forEach( item =>{

          console.log(item);

          //"KP2024TEA"
          if(item.sku == 'KP2024TEA'){
            this.KP2024TEA = this.KP2024TEA + parseInt(item.quantity);
            this.teacount = parseInt(item.quantity );
          }
          //"KP2024COLDDRINKS"
          if(item.sku == 'KP2024COLDDRINKS'){
            this.KP2024COLDDRINKS = this.KP2024COLDDRINKS + parseInt(item.quantity);
            this.colddrinkscount = parseInt(item.quantity );
          }

          //"KP2024VEGCHOP"
          if(item.sku == 'KP2024VEGCHOP'){
            this.KP2024VEGCHOP = this.KP2024VEGCHOP + parseInt(item.quantity);
            this.vegchopcount = parseInt(item.quantity );
          }
          //"KP2024GHUGNI"
          if(item.sku == 'KP2024GHUGNI'){
            this.KP2024GHUGNI = this.KP2024GHUGNI + parseInt(item.quantity);
            this.vegghugnicount = parseInt(item.quantity );
          }

          //"KP2024VEG"
          if(item.sku == 'KP2024VEG'){
            this.KP2024VEG = this.KP2024VEG + parseInt(item.quantity);
            this.vegbiriyanicount = parseInt(item.quantity );
          }
          //"KP2024NON"
          if(item.sku == 'KP2024NONVEG'){
            this.KP2024NONVEG = this.KP2024NONVEG + parseInt(item.quantity);
            this.nonvegbiriyanicount = parseInt(item.quantity );
          }
       })

       this.kp2024FoodPurchaseDetails = {
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
      this.foodPurchaseList.unshift(this.kp2024FoodPurchaseDetails);
    // console.log(this.kp2024FoodPurchaseDetails);

     });
    }
    catch (e) {
      console.error(e);
    }
  }


  checkKP2025Details(){
    this.foodPurchaseList = [];

    try{
    [...this.foodTickets].forEach( ct =>{
      console.log('Each row KP2025');

      this.teacount = 0;
      this.coffeecount = 0;
      this.colddrinkscount = 0;

      this.vegchopcount = 0;
      this.vegghugnicount = 0;
      this.jhalmuricount = 0;
      this.eggdevilcount = 0;

      this.vegbiriyanicount = 0;
      this.nonvegbiriyanicount = 0;

      console.log(ct.transactions[0].item_list.items[0].quantity );
      [...ct.transactions[0].item_list.items].forEach( item =>{

        console.log(item);

        //"KP2025TEA"
        if(item.sku == 'KP2025TEA'){
          this.KP2025TEA = this.KP2025TEA + parseInt(item.quantity);
          this.teacount = parseInt(item.quantity );
        }
        //"KP2025COFFEE"
        else if(item.sku == 'KP2025COFFEE'){
          this.KP2025COFFEE = this.KP2025COFFEE + parseInt(item.quantity);
          this.coffeecount = parseInt(item.quantity );
        }
        //"KP2025COLDDRINKS"
        else if(item.sku == 'KP2025COLDDRINKS'){
          this.KP2025COLDDRINKS = this.KP2025COLDDRINKS + parseInt(item.quantity);
          this.colddrinkscount = parseInt(item.quantity );
        }

        //"KP2025VEGCHOP"
        else if(item.sku == 'KP2025VEGCHOP'){
          this.KP2025VEGCHOP = this.KP2025VEGCHOP + parseInt(item.quantity);
          this.vegchopcount = parseInt(item.quantity )*2;
        }
        //"KP2025VEGCHOPDOUBLE"
        else if(item.sku == 'KP2025VEGCHOPDOUBLE'){
          this.KP2025VEGCHOPDOUBLE = this.KP2025VEGCHOPDOUBLE + parseInt(item.quantity);
          this.vegchopcount = parseInt(item.quantity )*2;
        }

        //"KP2025GHUGNISINGLE"
        else if(item.sku == 'KP2025GHUGNISINGLE'){
          this.KP2025GHUGNISINGLE = this.KP2025GHUGNISINGLE + parseInt(item.quantity);
          this.vegghugnicount = parseInt(item.quantity );
        }
        //"KP2025GHUGNIDOUBLE"
        else if(item.sku == 'KP2025GHUGNIDOUBLE'){
          this.KP2025GHUGNIDOUBLE = this.KP2025GHUGNIDOUBLE + parseInt(item.quantity);
          this.vegghugnicount = parseInt(item.quantity )*2;
        }
        //"KP2025JHALMURISINGLE"
        else if(item.sku == 'KP2025JHALMURISINGLE'){
          this.KP2025JHALMURISINGLE = this.KP2025JHALMURISINGLE + parseInt(item.quantity);
          this.jhalmuricount = parseInt(item.quantity );
        }
        //"KP2025JHALMURIDOUBLE"
        else if(item.sku == 'KP2025JHALMURIDOUBLE'){
          this.KP2025JHALMURIDOUBLE = this.KP2025JHALMURIDOUBLE + parseInt(item.quantity);
          this.jhalmuricount = parseInt(item.quantity )*2;
        }
        //"KP2025EGGDEVILSINGLE"
        else if(item.sku == 'KP2025EGGDEVILSINGLE'){
          this.KP2025EGGDEVILSINGLE = this.KP2025EGGDEVILSINGLE + parseInt(item.quantity);
          this.eggdevilcount = parseInt(item.quantity );
        }
        //"KP2025EGGDEVILDOUBLE"
        else if(item.sku == 'KP2025EGGDEVILDOUBLE'){
          this.KP2025EGGDEVILDOUBLE = this.KP2025EGGDEVILDOUBLE + parseInt(item.quantity);
          this.eggdevilcount = parseInt(item.quantity )*2;
        }

        //"KP2025VEG"
        else if(item.sku == 'KP2025VEG'){
          this.KP2025VEG = this.KP2025VEG + parseInt(item.quantity);
          this.vegbiriyanicount = parseInt(item.quantity );
        }
        //"KP2025NON"
        else if(item.sku == 'KP2025NONVEG'){
          this.KP2025NONVEG = this.KP2025NONVEG + parseInt(item.quantity);
          this.nonvegbiriyanicount = parseInt(item.quantity );
        }
     })

     this.kp2025FoodPurchaseDetails = {
        payer_id : ct.payer.payer_info.payer_id,
        purchase_date_time: ct.create_time,
        email : ct.payer.payer_info.email,
        firstname : ct.payer.payer_info.first_name,
        lastname : ct.payer.payer_info.last_name,
        payment_method : ct.payer.payment_method,
        payment_status : ct.state,
        total : ct.transactions[0].amount.total,
        teacount:this.teacount,
        coffeecount:this.coffeecount,
        colddrinkscount:this.colddrinkscount,
        vegchopcount : this.vegchopcount,
        vegghugnicount:this.vegghugnicount,
        jhalmuricount:this.jhalmuricount,
        eggdevilcount:this.eggdevilcount,
        vegbiriyanicount:this.vegbiriyanicount,
        nonvegbiriyanicount:this.nonvegbiriyanicount
      };
    this.foodPurchaseList.unshift(this.kp2025FoodPurchaseDetails);
  // console.log(this.kp2025FoodPurchaseDetails);
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
    this.sp2025TicketList = [];
    this.dp2025TicketList = [];
    
    this.MM2022YY = 0;
    this.MM2023YY = 0;
    this.MM2024YY = 0;
    this.MM2025YY = 0;

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

    this.DP2024EBSAT01NON= 0;
    this.DP2024EBSAT02VEG= 0;

    this.DP2024EBSAT03NON= 0;
    this.DP2024EBSAT04VEG= 0;

    this.DP2024EBSAT05KID= 0;

    this.DP2024EBSUN01NON= 0;
    this.DP2024EBSUN02VEG= 0;

    this.DP2024EBSUN03NON= 0;
    this.DP2024EBSUN04VEG= 0;

    this.DP2024EBSUN05KID= 0;

    this.customAdult = 0;
    this.customKid = 0;

    this.SP2024AEBNON = 0;
    this.SP2024AEBVEG = 0;
  
    this.SP2024STUDENTEBNON =0;
    this.SP2024STUDENTEBVEG =0;
  
    this.SP2024KIDS=0;

    this.SP2025EBNVADULT = 0;
    this.SP2025EBVEGADULT = 0;
  
    this.SP2025EBNVOTHER =0;
    this.SP2025EBVEGOTHER =0;
  
    this.SP2025EBKIDS=0;

    try{
    //console.log(this.rowData);
    [...this.rowData].forEach( m =>{ 
       console.log(m.purchase? true : false);

       if(m.purchase? true : false){
         
          [...m.purchase].forEach(element => {
          
          const userPurchase = {};
          //console.log(element);
          
          if(element != undefined){

            [...element].forEach(e => {
              //console.log(e.sku);
              //console.log(e.paymentTime);

              this.paymentTime = moment(e.paymentTime).format("YYYY-MM-DD HH:mm");
              if(e.sku.includes("MM2025YY")){
                  this.MM2025YY += e.quantity ;
                  Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,MM2025YY:e.quantity,sku:e.sku,tax:e.tax});
                  this.membershipRenew = true;
              }
              //Saraswati Puja 2024 Ticket Details
              // else if(e.sku.includes("SP2025EBNVADULT")){
              //   this.SP2025EBNVADULT += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,SP2025EBNVADULT:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes("SP2025EBVEGADULT")){
              //   this.SP2025EBVEGADULT += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,SP2025EBVEGADULT:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes("SP2025EBNVOTHER")){
              //   this.SP2025EBNVOTHER += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,SP2025EBNVOTHER:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes("SP2025EBVEGOTHER")){
              //   this.SP2025EBVEGOTHER += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,SP2025EBVEGOTHER:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes("SP2025EBKIDS")){
              //   this.SP2025EBKIDS += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,SP2025EBKIDS:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              //Durga Puja 2025 Ticket Details
              //All 3 days Ticket
              else if(e.sku.includes('DP2025EBALL01NON') || e.sku.includes('DP2025ALL01NON')){
                  this.DP2025EBALL01NON += e.quantity ;
                  Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBALL01NON:e.quantity,sku:e.sku,tax:e.tax});
                  this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBALL02VEG') || e.sku.includes('DP2025ALL02VEG')){
                  this.DP2025EBALL02VEG += e.quantity ;
                  Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBALL02VEG:e.quantity,sku:e.sku,tax:e.tax});
                  this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBALL03NON') || e.sku.includes('DP2025ALL03NON')){
                  this.DP2025EBALL03NON += e.quantity ;
                  Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBALL03NON:e.quantity,sku:e.sku,tax:e.tax});
                  this.newPurches = true;
              }

              else if(e.sku.includes('DP2025EBALL04VEG') || e.sku.includes('DP2025ALL04VEG')){
                this.DP2025EBALL04VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBALL04VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBALL05KID') || e.sku.includes('DP2025ALL05KID')){
                this.DP2025EBALL05KID += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBALL05KID:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
                
              // Single Day Ticket
              // Friday
              else if(e.sku.includes('DP2025EBFRI01NON') || e.sku.includes('DP2025FRI01NON')){
                this.DP2025EBFRI01NON += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBFRI01NON:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBFRI02VEG') || e.sku.includes('DP2025FRI02VEG')){
                this.DP2025EBFRI02VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBFRI02VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBFRI03NON') || e.sku.includes('DP2025FRI03NON')){
                this.DP2025EBFRI03NON += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBFRI03NON:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBFRI04VEG') || e.sku.includes('DP2025FRI04VEG')){
                this.DP2025EBFRI04VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBFRI04VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBFRI05KID') || e.sku.includes('DP2025FRI05KID')){
                this.DP2025EBFRI05KID += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBFRI05KID:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }

              //Saturday
              else if(e.sku.includes('DP2025EBSAT01NON') || e.sku.includes('DP2025SAT01NON')){
                this.DP2025EBSAT01NON += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBSAT01NON:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBSAT02VEG') || e.sku.includes('DP2025SAT02VEG')){
                this.DP2025EBSAT02VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBSAT02VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBSAT03NON') || e.sku.includes('DP2025SAT03NON')){
                this.DP2025EBSAT03NON += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBSAT03NON:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBSAT04VEG') || e.sku.includes('DP2025SAT04VEG')){
                this.DP2025EBSAT04VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBSAT04VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBSAT05KID') || e.sku.includes('DP2025SAT05KID')){
                this.DP2025EBSAT05KID += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBSAT05KID:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }

              //Sunday
              else if(e.sku.includes('DP2025EBSUN01NON') || e.sku.includes('DP2025SUN01NON')){
                this.DP2025EBSUN01NON += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBSUN01NON:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBSUN02VEG') || e.sku.includes('DP2025SUN02VEG')){
                this.DP2025EBSUN02VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBSUN02VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBSUN03NON') || e.sku.includes('DP2025SUN03NON')){
                this.DP2025EBSUN03NON += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBSUN03NON:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBSUN04VEG') || e.sku.includes('DP2025SUN04VEG')){
                this.DP2025EBSUN04VEG += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBSUN04VEG:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }
              else if(e.sku.includes('DP2025EBSUN05KID') || e.sku.includes('DP2025SUN05KID')){
                this.DP2025EBSUN05KID += e.quantity ;
                Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2025EBSUN05KID:e.quantity,sku:e.sku,tax:e.tax});
                this.newPurches = true;
              }


              // else if(e.sku.includes("MM2023YY")){
              //     this.MM2023YY += e.quantity ;
              //     Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,MM2025YY:e.quantity,sku:e.sku,tax:e.tax});
              //     this.membershipRenew = true;
              // }
              // else if(e.sku.includes("KP2023NON")){  
              //   this.KP2023NON += e.quantity ;
              //   Object.assign(userPurchase,{ KP2023NON : e.quantity });
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes("KP2023VEG")){  
              //   this.KP2023VEG += e.quantity ;
              //   Object.assign(userPurchase,{ KP2023VEG : e.quantity });
              //   this.newPurches = true;
              // }
              

              else if(e.sku.includes("MM2024YY")){
                  this.MM2024YY += e.quantity ;
                  //Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,MM2025YY:e.quantity,sku:e.sku,tax:e.tax});
                  //this.membershipRenew = true;
              }
              //Saraswati Puja 2024 Ticket Details
              // else if(e.sku.includes("SP2024AEBNON")){
              //   this.SP2024AEBNON += e.quantity ;
              //   Object.assign(userPurchase,{ SP2024AEBNON : e.quantity });
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes("SP2024AEBVEG")){
              //   this.SP2024AEBVEG += e.quantity ;
              //   Object.assign(userPurchase,{ SP2024AEBVEG : e.quantity });
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes("SP2024STUDENTEBNON")){
              //   this.SP2024STUDENTEBNON += e.quantity ;
              //   Object.assign(userPurchase,{ SP2024STUDENTEBNON : e.quantity });
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes("SP2024STUDENTEBVEG")){
              //   this.SP2024STUDENTEBVEG += e.quantity ;
              //   Object.assign(userPurchase,{ SP2024STUDENTEBVEG : e.quantity });
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes("SP2024KIDS")){
              //   this.SP2024KIDS += e.quantity ;
              //   Object.assign(userPurchase,{ SP2024KIDS : e.quantity });
              //   this.newPurches = true;
              // }

              //Durga Puja 2024 Ticket Details
              //All 3 days Ticket
              // else if(e.sku.includes('DP2024EBALL01NON') || e.sku.includes('DP2024ALL01NON')){
              //     this.DP2024EBALL01NON += e.quantity ;
              //     Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL01NON:e.quantity,sku:e.sku,tax:e.tax});
              //     this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBALL02VEG') || e.sku.includes('DP2024ALL02VEG')){
              //     this.DP2024EBALL02VEG += e.quantity ;
              //     Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL02VEG:e.quantity,sku:e.sku,tax:e.tax});
              //     this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBALL03NON') || e.sku.includes('DP2024ALL03NON')){
              //     this.DP2024EBALL03NON += e.quantity ;
              //     Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL03NON:e.quantity,sku:e.sku,tax:e.tax});
              //     this.newPurches = true;
              // }

              // else if(e.sku.includes('DP2024EBALL04VEG') || e.sku.includes('DP2024ALL04VEG')){
              //   this.DP2024EBALL04VEG += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL04VEG:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBALL05KID') || e.sku.includes('DP2024ALL05KID')){
              //   this.DP2024EBALL05KID += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL05KID:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBALL06NON') || e.sku.includes('DP2024ALL06NON')){
              //   this.DP2024EBALL06NON += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL06NON:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBALL07VEG') || e.sku.includes('DP2024ALL07VEG')){
              //   this.DP2024EBALL07VEG += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBALL07VEG:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
                
              // Single Day Ticket
              // Friday
              // else if(e.sku.includes('DP2024EBFRI01NON') || e.sku.includes('DP2024FRI01NON')){
              //   this.DP2024EBFRI01NON += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBFRI01NON:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBFRI02VEG') || e.sku.includes('DP2024FRI02VEG')){
              //   this.DP2024EBFRI02VEG += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBFRI02VEG:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBFRI03NON') || e.sku.includes('DP2024FRI03NON')){
              //   this.DP2024EBFRI03NON += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBFRI03NON:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBFRI04VEG') || e.sku.includes('DP2024FRI04VEG')){
              //   this.DP2024EBFRI04VEG += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBFRI04VEG:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBFRI05KID') || e.sku.includes('DP2024FRI05KID')){
              //   this.DP2024EBFRI05KID += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBFRI05KID:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }

              //Satuerday
              // else if(e.sku.includes('DP2024EBSAT01NON') || e.sku.includes('DP2024SAT01NON')){
              //   this.DP2024EBSAT01NON += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSAT01NON:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBSAT02VEG') || e.sku.includes('DP2024SAT02VEG')){
              //   this.DP2024EBSAT02VEG += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSAT02VEG:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBSAT03NON') || e.sku.includes('DP2024SAT03NON')){
              //   this.DP2024EBSAT03NON += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSAT03NON:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBSAT04VEG') || e.sku.includes('DP2024SAT04VEG')){
              //   this.DP2024EBSAT04VEG += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSAT04VEG:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBSAT05KID') || e.sku.includes('DP2024SAT05KID')){
              //   this.DP2024EBSAT05KID += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSAT05KID:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }

              //Sunday
              // else if(e.sku.includes('DP2024EBSUN01NON') || e.sku.includes('DP2024SUN01NON')){
              //   this.DP2024EBSUN01NON += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSUN01NON:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBSUN02VEG') || e.sku.includes('DP2024SUN02VEG')){
              //   this.DP2024EBSUN02VEG += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSUN02VEG:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBSUN03NON') || e.sku.includes('DP2024SUN03NON')){
              //   this.DP2024EBSUN03NON += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSUN03NON:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBSUN04VEG') || e.sku.includes('DP2024SUN04VEG')){
              //   this.DP2024EBSUN04VEG += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSUN04VEG:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes('DP2024EBSUN05KID') || e.sku.includes('DP2024SUN05KID')){
              //   this.DP2024EBSUN05KID += e.quantity ;
              //   Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,DP2024EBSUN05KID:e.quantity,sku:e.sku,tax:e.tax});
              //   this.newPurches = true;
              // }


              else if(e.sku.includes("MM2023YY")){
                  this.MM2023YY += e.quantity ;
                  //Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,MM2025YY:e.quantity,sku:e.sku,tax:e.tax});
                  //this.membershipRenew = true;
              }
              // else if(e.sku.includes("KP2023NON")){  
              //   this.KP2023NON += e.quantity ;
              //   Object.assign(userPurchase,{ KP2023NON : e.quantity });
              //   this.newPurches = true;
              // }
              // else if(e.sku.includes("KP2023VEG")){  
              //   this.KP2023VEG += e.quantity ;
              //   Object.assign(userPurchase,{ KP2023VEG : e.quantity });
              //   this.newPurches = true;
              // }
              else if(e.sku.includes("MM2022YY")){
                  this.MM2022YY += e.quantity ;
                  //Object.assign(userPurchase,{ currency: e.currency, description:e.description, name:e.name,paymentTime:this.paymentTime,price:e.price,MM2025YY:e.quantity,sku:e.sku,tax:e.tax});
                  //this.membershipRenew = true;
              }
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
                  this.dp2025TicketList.unshift(this.user);
              }
              //console.log(this.user);
              //console.log(this.dp2025TicketList);

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

    onTicketBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

    onTicketGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}

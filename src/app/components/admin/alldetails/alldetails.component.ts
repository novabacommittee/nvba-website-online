import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
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
  newPurches:boolean = false;

  MM2022YY: number = 0;
  MM2023YY: number = 0;
  MM2024YY: number = 0;

  SP2024AEBNON:number = 0;
  SP2024AEBVEG:number = 0;

  SP2024STUDENTEBNON:number =0;
  SP2024STUDENTEBVEG:number =0;

  SP2024KIDS:number =0;

  // SP2023CTSATURDAY:number =0;

  // KP2023NON:number = 0;

  // KP2023VEG:number = 0;

  KP2024VEGCHOP:number = 0;
  KP2024GHUGNI:number = 0;
  KP2024TEA:number = 0;
  KP2024COLDDRINKS:number = 0;
  KP2024NONVEG:number = 0;
  KP2024VEG:number = 0;

  DP2023CTFRIDAY:number = 0;
  DP2023CTSATURDAY:number = 0;
  DP2023CTSUNDAY:number =0;


  DP2023EBALL01NON:number = 0;
  DP2023EBALL02VEG:number = 0;

  DP2023EBALL03NON:number = 0;
  DP2023EBALL04VEG:number = 0;

  DP2023EBALL05KID:number = 0;

  DP2023EBALL06NON:number = 0;
  DP2023EBALL07VEG:number = 0;

  DP2023EBFRI01NON:number = 0;
  DP2023EBFRI02VEG:number = 0;

  DP2023EBFRI03NON:number = 0;
  DP2023EBFRI04VEG:number = 0;

  DP2023EBFRI05KID:number = 0;

  DP2023EBFRI06NON:number = 0;
  DP2023EBFRI07VEG:number = 0;

  DP2023EBSAT01NON:number = 0;
  DP2023EBSAT02VEG:number = 0;

  DP2023EBSAT03NON:number = 0;
  DP2023EBSAT04VEG:number = 0;

  DP2023EBSAT05KID:number = 0;

  DP2023EBSAT06NON:number = 0;
  DP2023EBSAT07VEG:number = 0;

  DP2023EBSUN01NON:number = 0;
  DP2023EBSUN02VEG:number = 0;

  DP2023EBSUN03NON:number = 0;
  DP2023EBSUN04VEG:number = 0;

  DP2023EBSUN05KID:number = 0;

  DP2023EBSUN06NON:number = 0;
  DP2023EBSUN07VEG:number = 0;

  // nonCount:number =0;
  // vegCount:number =0;

  // nonCountFri:number =0;
  // vegCountFri:number =0;

  // nonCountSat:number =0;
  // vegCountSat:number =0;

  // nonCountSun:number =0;
  // vegCountSun:number =0;


  customAdult:number =0;
  customKid:number =0;


  user: { index:number; email: string; firstname: string; lastname: string; expires: string; phone:string } | undefined;


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

  columnDefs = [
    { field: 'index',  sortable: true, resizable: true,  cellClass: 'id-class center' },
    { field: 'email', sortable: true, resizable: true, filter: true },
		{ field: 'firstname', sortable: true, resizable: true, filter: true , cellClass: 'center' },
		{ field: 'lastname', sortable: true, resizable: true, filter: true, cellClass: 'center' },
    { field: 'expires', sortable: true, resizable: true, filter: true },

    { field: 'MM2022YY', headerName:'Membership', sortable: true, resizable: true },

    { field: 'KP2024VEGCHOP', headerName:'Veg Chop', sortable: true, resizable: true },
    { field: 'KP2024GHUGNI', headerName:'Veg Ghugni', sortable: true, resizable: true },
    { field: 'KP2024TEA', headerName:'Tea', sortable: true, resizable: true },
    { field: 'KP2024COLDDRINKS', headerName:'Cold Drinks', sortable: true, resizable: true },
    { field: 'KP2024VEG', headerName:'Veg Biriyani', sortable: true, resizable: true },
    { field: 'KP2024NONVEG', headerName:'Non-Veg Biriyani', sortable: true, resizable: true },

    // { field: 'DP2023EBALL01NON', headerName:'Adult Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBALL02VEG', headerName:'Adult Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBALL03NON', headerName:'Kids [ 11 to 18 years ] Non-Veg ', sortable: true, resizable: true },
    // { field: 'DP2023EBALL04VEG', headerName:'Kids [ 11 to 18 years ] Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBALL05KID', headerName:'Kids [ 0 to 10 years ]', sortable: true, resizable: true },
    // { field: 'DP2023EBALL06NON', headerName:'Students and Visiting Parents - Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBALL07VEG', headerName:'Students and Visiting Parents - Veg', sortable: true, resizable: true },

    // { field: 'DP2023EBFRI01NON', headerName:'Friday - Adult Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBFRI02VEG', headerName:'Friday - Adult Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBFRI03NON', headerName:'Friday - Kids [ 11 to 18 years ] Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBFRI04VEG', headerName:'Friday - Kids [ 11 to 18 years ] Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBFRI05KID', headerName:'Friday - Kids[ 0 to 10years]', sortable: true, resizable: true },
    // { field: 'DP2023EBFRI06NON', headerName:'Friday - Students and Visiting Parents - Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBFRI07VEG', headerName:'Friday - Students and Visiting Parents - Veg', sortable: true, resizable: true },

    // { field: 'DP2023EBSAT01NON', headerName:'Saturday - Adult Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBSAT02VEG', headerName:'Saturday - Adult Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBSAT03NON', headerName:'Saturday - Kids [ 11 to 18 years ] - Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBSAT04VEG', headerName:'Saturday - Kids [ 11 to 18 years ] - Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBSAT05KID', headerName:'Saturday - Kids [ 0 to 10 years ]', sortable: true, resizable: true },
    // { field: 'DP2023EBSAT06NON', headerName:'Saturday - Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBSAT07VEG', headerName:'Saturday - Students and Visiting Parents Veg', sortable: true, resizable: true },

    // { field: 'DP2023EBSUN01NON', headerName:'Sunday - Adult Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBSUN02VEG', headerName:'Sunday - Adult Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBSUN03NON', headerName:'Sunday - Kids [ 11 to 18 years ] Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBSUN04VEG', headerName:'Sunday - Kids [ 11 to 18 years ] Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBSUN05KID', headerName:'Sunday - Kids [ 0 to 10 years ]', sortable: true, resizable: true },
    // { field: 'DP2023EBSUN06NON', headerName:'Sunday - Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    // { field: 'DP2023EBSUN07VEG', headerName:'Sunday - Students and Visiting Parents Veg', sortable: true, resizable: true },

    { field: 'phone', sortable: true, resizable: true, filter: true },
	];



  columnDefsTickets = [
    { field: 'index',  sortable: true, resizable: true,  cellClass: 'id-class center' },
    { field: 'email', sortable: true, resizable: true, filter: true },
		{ field: 'firstname', sortable: true, resizable: true, filter: true , cellClass: 'center' },
		{ field: 'lastname', sortable: true, resizable: true, filter: true, cellClass: 'center' },
    
    { field: 'DP2023EBALL01NON', headerName:'Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2023EBALL02VEG', headerName:'Adult Veg', sortable: true, resizable: true },
    { field: 'DP2023EBALL03NON', headerName:'Kids [ 11 to 18 years ] Non-Veg ', sortable: true, resizable: true },
    { field: 'DP2023EBALL04VEG', headerName:'Kids [ 11 to 18 years ] Veg', sortable: true, resizable: true },
    { field: 'DP2023EBALL05KID', headerName:'Kids [ 0 to 10 years ]', sortable: true, resizable: true },
    { field: 'DP2023EBALL06NON', headerName:'Students and Visiting Parents - Non-Veg', sortable: true, resizable: true },
    { field: 'DP2023EBALL07VEG', headerName:'Students and Visiting Parents - Veg', sortable: true, resizable: true },

    { field: 'DP2023EBFRI01NON', headerName:'Friday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2023EBFRI02VEG', headerName:'Friday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2023EBFRI03NON', headerName:'Friday - Kids [ 11 to 18 years ] Non-Veg', sortable: true, resizable: true },
    { field: 'DP2023EBFRI04VEG', headerName:'Friday - Kids [ 11 to 18 years ] Veg', sortable: true, resizable: true },
    { field: 'DP2023EBFRI05KID', headerName:'Friday - Kids[ 0 to 10years]', sortable: true, resizable: true },
    { field: 'DP2023EBFRI06NON', headerName:'Friday - Students and Visiting Parents - Non-Veg', sortable: true, resizable: true },
    { field: 'DP2023EBFRI07VEG', headerName:'Friday - Students and Visiting Parents - Veg', sortable: true, resizable: true },

    { field: 'DP2023EBSAT01NON', headerName:'Saturday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2023EBSAT02VEG', headerName:'Saturday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2023EBSAT03NON', headerName:'Saturday - Kids [ 11 to 18 years ] - Non-Veg', sortable: true, resizable: true },
    { field: 'DP2023EBSAT04VEG', headerName:'Saturday - Kids [ 11 to 18 years ] - Veg', sortable: true, resizable: true },
    { field: 'DP2023EBSAT05KID', headerName:'Saturday - Kids [ 0 to 10 years ]', sortable: true, resizable: true },
    { field: 'DP2023EBSAT06NON', headerName:'Saturday - Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    { field: 'DP2023EBSAT07VEG', headerName:'Saturday - Students and Visiting Parents Veg', sortable: true, resizable: true },

    { field: 'DP2023EBSUN01NON', headerName:'Sunday - Adult Non-Veg', sortable: true, resizable: true },
    { field: 'DP2023EBSUN02VEG', headerName:'Sunday - Adult Veg', sortable: true, resizable: true },
    { field: 'DP2023EBSUN03NON', headerName:'Sunday - Kids [ 11 to 18 years ] Non-Veg', sortable: true, resizable: true },
    { field: 'DP2023EBSUN04VEG', headerName:'Sunday - Kids [ 11 to 18 years ] Veg', sortable: true, resizable: true },
    { field: 'DP2023EBSUN05KID', headerName:'Sunday - Kids [ 0 to 10 years ]', sortable: true, resizable: true },
    { field: 'DP2023EBSUN06NON', headerName:'Sunday - Students and Visiting Parents Non-Veg', sortable: true, resizable: true },
    { field: 'DP2023EBSUN07VEG', headerName:'Sunday - Students and Visiting Parents Veg', sortable: true, resizable: true },
    { field: 'expires', sortable: true, resizable: true, filter: true },
    { field: 'phone', sortable: true, resizable: true, filter: true },
    { field: 'MM2022YY', headerName:'Membership', sortable: true, resizable: true },
	];


  checkConcertDetails(){
    [...this.concertTickets].forEach( ct =>{
        console.log(' Each row ', ct.transactions[0].item_list.items[0].quantity);
       [...ct.transactions[0].item_list.items].forEach(tic =>{
          if(tic.sku == 'DP2023CTFRIDAY'){
            this.DP2023CTFRIDAY = this.DP2023CTFRIDAY + parseInt(tic.quantity );
          }
          if(tic.sku == 'DP2023CTSATURDAY'){
            this.DP2023CTSATURDAY = this.DP2023CTSATURDAY + parseInt(tic.quantity );
          }
          if(tic.sku == 'DP2023CTSUNDAY'){
            this.DP2023CTSUNDAY = this.DP2023CTSUNDAY + parseInt(tic.quantity );
          }
       });
     });
  }


  // checkKP2023Details(){
  //   [...this.foodTickets].forEach( ct =>{
  //       console.log(' Each row KP');
  //      console.log(ct.transactions[0].item_list.items[0].quantity );
  //      [...ct.transactions[0].item_list.items].forEach( nonandveg =>{

  //       console.log(nonandveg);
  //       //"KP2023VEG"
  //      if(nonandveg.sku == 'KP2023VEG'){
  //       this.KP2023VEG = this.KP2023VEG + parseInt(nonandveg.quantity );
  //      }
  //      //"KP2023NON"
  //      if(nonandveg.sku == 'KP2023NON'){
  //       this.KP2023NON = this.KP2023NON + parseInt(nonandveg.quantity );
  //      }

  //      })

  //     //  //"KP2023VEG"
  //     //  if(ct.transactions[0].item_list.items[0].sku == 'KP2023VEG'){
  //     //   this.KP2023VEG = this.KP2023VEG + parseInt(ct.transactions[0].item_list.items[0].quantity );
  //     //  }
  //     //  //"KP2023NON"
  //     //  if(ct.transactions[0].item_list.items[0].sku == 'KP2023NON'){
  //     //   this.KP2023NON = this.KP2023NON + parseInt(ct.transactions[0].item_list.items[0].quantity );
  //     //  }
  //     //  if(ct.transactions[0].item_list.items[1].sku == 'KP2023VEG'){
  //     //   this.KP2023VEG = this.KP2023VEG + parseInt(ct.transactions[0].item_list.items[1].quantity );
  //     //  }
  //     //  //"KP2023NON"
  //     //  if(ct.transactions[0].item_list.items[1].sku == 'KP2023NON'){
  //     //   this.KP2023NON = this.KP2023NON + parseInt(ct.transactions[0].item_list.items[1].quantity );
  //     //  }
       

  //    });
  // }



    checkKP2024Details(){
    [...this.foodTickets].forEach( ct =>{
        console.log(' Each row KP2024');
       console.log(ct.transactions[0].item_list.items[0].quantity );
       [...ct.transactions[0].item_list.items].forEach( item =>{

        console.log(item);
        //"KP2024VEGCHOP"
        if(item.sku == 'KP2024VEGCHOP'){
          this.KP2024VEGCHOP = this.KP2024VEGCHOP + parseInt(item.quantity );
         }
        //"KP2024GHUGNI"
        if(item.sku == 'KP2024GHUGNI'){
          this.KP2024GHUGNI = this.KP2024GHUGNI + parseInt(item.quantity );
         }
        //"KP2024TEA"
        if(item.sku == 'KP2024TEA'){
          this.KP2024TEA = this.KP2024TEA + parseInt(item.quantity );
         }
        //"KP2024COLDDRINKS"
        if(item.sku == 'KP2024COLDDRINKS'){
          this.KP2024COLDDRINKS = this.KP2024COLDDRINKS + parseInt(item.quantity );
         }

         //"KP2024VEG"
        if(item.sku == 'KP2024VEG'){
          this.KP2024VEG = this.KP2024VEG + parseInt(item.quantity );
        }
        //"KP2024NON"
        if(item.sku == 'KP2024NONVEG'){
          this.KP2024NONVEG = this.KP2024NONVEG + parseInt(item.quantity );
        }

       })

      //  //"KP2023VEG"
      //  if(ct.transactions[0].item_list.items[0].sku == 'KP2023VEG'){
      //   this.KP2023VEG = this.KP2023VEG + parseInt(ct.transactions[0].item_list.items[0].quantity );
      //  }
      //  //"KP2023NON"
      //  if(ct.transactions[0].item_list.items[0].sku == 'KP2023NON'){
      //   this.KP2023NON = this.KP2023NON + parseInt(ct.transactions[0].item_list.items[0].quantity );
      //  }
      //  if(ct.transactions[0].item_list.items[1].sku == 'KP2023VEG'){
      //   this.KP2023VEG = this.KP2023VEG + parseInt(ct.transactions[0].item_list.items[1].quantity );
      //  }
      //  //"KP2023NON"
      //  if(ct.transactions[0].item_list.items[1].sku == 'KP2023NON'){
      //   this.KP2023NON = this.KP2023NON + parseInt(ct.transactions[0].item_list.items[1].quantity );
      //  }
       

     });
  }


  checkDetails(){
    let couter = 0;

    this.memberList = [];
    
    this.MM2022YY = 0;
    this.MM2023YY = 0;
    this.MM2024YY = 0;

    this.DP2023EBALL01NON= 0;
    this.DP2023EBALL02VEG= 0;

    this.DP2023EBALL03NON= 0;
    this.DP2023EBALL04VEG= 0;

    this.DP2023EBALL05KID= 0;

    this.DP2023EBALL06NON= 0;
    this.DP2023EBALL07VEG= 0;

    this.DP2023EBFRI01NON= 0;
    this.DP2023EBFRI02VEG= 0;

    this.DP2023EBFRI03NON= 0;
    this.DP2023EBFRI04VEG= 0;

    this.DP2023EBFRI05KID= 0;

    this.DP2023EBFRI06NON= 0;
    this.DP2023EBFRI07VEG= 0;

    this.DP2023EBSAT01NON= 0;
    this.DP2023EBSAT02VEG= 0;

    this.DP2023EBSAT03NON= 0;
    this.DP2023EBSAT04VEG= 0;

    this.DP2023EBSAT05KID= 0;

    this.DP2023EBSAT06NON= 0;
    this.DP2023EBSAT07VEG= 0;

    this.DP2023EBSUN01NON= 0;
    this.DP2023EBSUN02VEG= 0;

    this.DP2023EBSUN03NON= 0;
    this.DP2023EBSUN04VEG= 0;

    this.DP2023EBSUN05KID= 0;

    this.DP2023EBSUN06NON= 0;
    this.DP2023EBSUN07VEG= 0;

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
          const customTicket = {};
          this.newPurches = false;
      //     console.log(element);
      //     console.log(element.sku);
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

                if(e.sku.includes("KP2024VEGCHOP")){  
                  this.KP2024VEGCHOP += e.quantity ;
                  Object.assign(userTicket,{ KP2024VEGCHOP : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes("KP2024GHUGNI")){  
                  this.KP2024GHUGNI += e.quantity ;
                  Object.assign(userTicket,{ KP2024GHUGNI : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes("KP2024TEA")){  
                  this.KP2024TEA += e.quantity ;
                  Object.assign(userTicket,{ KP2024TEA : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes("KP2024COLDDRINKS")){  
                  this.KP2024COLDDRINKS += e.quantity ;
                  Object.assign(userTicket,{ KP2024COLDDRINKS : e.quantity });
                  this.newPurches = true;
                }

                if(e.sku.includes("KP2024NONVEG")){  
                  this.KP2024NONVEG += e.quantity ;
                  Object.assign(userTicket,{ KP2024NONVEG : e.quantity });
                  this.newPurches = true;
                }
                if(e.sku.includes("KP2024VEG")){  
                  this.KP2024VEG += e.quantity ;
                  Object.assign(userTicket,{ KP2024VEG : e.quantity });
                  this.newPurches = true;
                }

                // if(e.sku.includes("MM2022YY")){  KP2023VEG
                //     this.MM2022YY += e.quantity ;
                //     Object.assign(userTicket,{ MM2022YY : e.quantity });
                //     this.newPurches = true;
                // }

                // if(e.sku.includes('DP2023EBALL01NON')){
                //     this.DP2023EBALL01NON += e.quantity ;
                //     Object.assign(userTicket,{ DP2023EBALL01NON : e.quantity });
                //     this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBALL02VEG')){
                //     this.DP2023EBALL02VEG += e.quantity ;
                //     Object.assign(userTicket,{ DP2023EBALL02VEG : e.quantity });
                //     this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBALL03NON')){
                //     this.DP2023EBALL03NON += e.quantity ;
                //     Object.assign(userTicket,{ DP2023EBALL03NON : e.quantity });
                //     this.newPurches = true;
                // }

                // if(e.sku.includes('DP2023EBALL04VEG')){
                //   this.DP2023EBALL04VEG += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBALL04VEG : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBALL05KID')){
                //   this.DP2023EBALL05KID += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBALL05KID : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBALL06NON')){
                //   this.DP2023EBALL06NON += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBALL06NON : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBALL07VEG')){
                //   this.DP2023EBALL07VEG += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBALL07VEG : e.quantity });
                //   this.newPurches = true;
                // }
                // //Friday
                // if(e.sku.includes('DP2023EBFRI01NON')){
                //   this.DP2023EBFRI01NON += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBFRI01NON : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBFRI02VEG')){
                //   this.DP2023EBFRI02VEG += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBFRI02VEG : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBFRI03NON')){
                //   this.DP2023EBFRI03NON += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBFRI03NON : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBFRI04VEG')){
                //   this.DP2023EBFRI04VEG += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBFRI04VEG : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBFRI05KID')){
                //   this.DP2023EBFRI05KID += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBFRI05KID : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBFRI06NON')){
                //   this.DP2023EBFRI06NON += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBFRI06NON : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBFRI07VEG')){
                //   this.DP2023EBFRI07VEG += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBFRI07VEG : e.quantity });
                //   this.newPurches = true;
                // }

                // //Satuerday
                // if(e.sku.includes('DP2023EBSAT01NON')){
                //   this.DP2023EBSAT01NON += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSAT01NON : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBSAT02VEG')){
                //   this.DP2023EBSAT02VEG += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSAT02VEG : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBSAT03NON')){
                //   this.DP2023EBSAT03NON += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSAT03NON : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBSAT04VEG')){
                //   this.DP2023EBSAT04VEG += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSAT04VEG : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBSAT05KID')){
                //   this.DP2023EBSAT05KID += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSAT05KID : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBSAT06NON')){
                //   this.DP2023EBSAT06NON += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSAT06NON : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBSAT07VEG')){
                //   this.DP2023EBSAT07VEG += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSAT07VEG : e.quantity });
                //   this.newPurches = true;
                // }

                // //Sunday
                // if(e.sku.includes('DP2023EBSUN01NON')){
                //   this.DP2023EBSUN01NON += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSUN01NON : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBSUN02VEG')){
                //   this.DP2023EBSUN02VEG += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSUN02VEG : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBSUN03NON')){
                //   this.DP2023EBSUN03NON += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSUN03NON : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBSUN04VEG')){
                //   this.DP2023EBSUN04VEG += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSUN04VEG : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBSUN05KID')){
                //   this.DP2023EBSUN05KID += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSUN05KID : e.quantity });
                //   this.newPurches = true;
                // }
                // if(e.sku.includes('DP2023EBSUN06NON')){
                //   this.DP2023EBSUN06NON += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSUN06NON : e.quantity });
                //   this.newPurches = true;
                // }

                // if(e.sku.includes('DP2023EBSUN07VEG')){  
                //   this.DP2023EBSUN07VEG += e.quantity ;
                //   Object.assign(userTicket,{ DP2023EBSUN07VEG : e.quantity });
                //   this.newPurches = true;
                // }
                
                
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

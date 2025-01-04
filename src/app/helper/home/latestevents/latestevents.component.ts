import { Component, OnInit } from '@angular/core';
import { GetjsonfileService } from './../../../services/getjsonfile.service';

@Component({
  selector: 'app-latestevents',
  templateUrl: './latestevents.component.html',
  styleUrls: ['./latestevents.component.scss']
})

export class LatesteventsComponent implements OnInit {
  events: any = [];
  pastevents: any =[];
  commingevents: any =[];
  constructor(private jsonFile:GetjsonfileService) { }

  ngOnInit(): void {
    this.jsonFile.pageData('events').subscribe(data => {
      ////console.log(data);
      this.events = data;
      [...this.events].forEach(e => {
        if(e.eventType=='past'){
          this.pastevents.push(e);
        }
        else{
          this.commingevents.push(e);
        }
        });
    });
      console.log( this.pastevents);
  }
}

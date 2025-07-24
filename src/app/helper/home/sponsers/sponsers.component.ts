import { Component, OnInit } from '@angular/core';
import { GetjsonfileService } from './../../../services/getjsonfile.service';


@Component({
  selector: 'app-sponsers',
  templateUrl: './sponsers.component.html',
  styleUrls: ['./sponsers.component.scss']
})

export class SponsersComponent implements OnInit {

  myStyles = {
    'background-color': 'violet',
    'padding': '10px'
  };

  sponsers: any = [];
  constructor(private jsonFile:GetjsonfileService) { }

  ngOnInit(): void {
    this.jsonFile.pageData('sponsers').subscribe(data => {
      ////console.log(data);
      this.sponsers = data;
    });
  }

}

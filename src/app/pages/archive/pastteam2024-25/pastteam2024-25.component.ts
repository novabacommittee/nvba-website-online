import { Component, OnInit } from '@angular/core';
import { GetjsonfileService } from 'src/app/services/getjsonfile.service';

@Component({
  selector: 'app-pastteam2024-25',
  templateUrl: './pastteam2024-25.component.html',
  styleUrls: ['./pastteam2024-25.component.scss']
})
export class Pastteam2024To25Component implements OnInit {

  nvbaTeam : any;
  constructor(private jsonFile:GetjsonfileService) { }

  ngOnInit(): void {
    this.jsonFile.pageData('ecm-24-25').subscribe(data => {
         ////console.log(data);
         this.nvbaTeam = data;
       });
  }

}

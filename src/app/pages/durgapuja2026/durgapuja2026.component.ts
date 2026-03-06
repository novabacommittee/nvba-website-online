import { Component, OnInit } from '@angular/core';
import { GetjsonfileService } from './../../services/getjsonfile.service';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-durgapuja2026',
  templateUrl: './durgapuja2026.component.html',
  styleUrls: ['./durgapuja2026.component.scss']
})
export class Durgapuja2026Component implements OnInit {

  sliderImage : any;
  isLog: boolean = true;

  constructor( private jsonFile:GetjsonfileService, public auth: AuthService ) {
    console.log(this.auth.isLoggedIn.valueOf());
  }

  ngOnInit(): void {
  }

}

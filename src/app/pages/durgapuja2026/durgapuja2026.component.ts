import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { GetjsonfileService } from './../../services/getjsonfile.service';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-durgapuja2026',
  templateUrl: './durgapuja2026.component.html',
  styleUrls: ['./durgapuja2026.component.scss']
})
export class Durgapuja2026Component implements OnInit, OnDestroy {

    @ViewChild('playA') playA!: ElementRef;

  sliderImage : any;
  playAudio: boolean = true;
  audio = new Audio();
  isLog: boolean = true;

  constructor( private jsonFile:GetjsonfileService, public auth: AuthService ) {

    console.log(this.auth.isLoggedIn.valueOf());
}

  ngOnInit(): void {
  }

    ngOnDestroy(): void {
    this.audio.pause();
    console.log('Pause');
    this.playAudio = false;
  }

    soundplay() : void{
    if(this.playAudio == false){
      this.audio.play();
      console.log('Play');
      this.playAudio = false;
    }
    else{
      this.audio.pause();
      console.log('Pause');
      this.playAudio = false;
    }
  }

}

import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { GetjsonfileService } from './../../services/getjsonfile.service';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-durgapuja2024',
  templateUrl: './durgapuja2024.component.html',
  styleUrls: ['./durgapuja2024.component.scss']
})

export class Durgapuja2024Component implements OnInit, OnDestroy {

  @ViewChild('playA') playA!: ElementRef;

  sliderImage : any;
  playAudio: boolean = true;
  audio = new Audio();
  isLog: boolean = true;

  constructor( private jsonFile:GetjsonfileService, public auth: AuthService ) {
      
    console.log(this.auth.isLoggedIn.valueOf());
}

  ngOnInit(): void {
    this.jsonFile.pageData('durgapujaSliderImage').subscribe(data => {
         this.sliderImage = data;
       });
       
      this.audio.src = "https://dhrubajyoti.com/nvba/media/YA-CHANDI-MAHALAYA-SONG-SOURENDRO-SOUMYOJIT.mp3"; 
      this.audio.load();
     // this.audio.play();
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

  ngOnDestroy(): void {
    this.audio.pause();
    console.log('Pause');
    this.playAudio = false;
  }

}

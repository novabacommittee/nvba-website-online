import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-paponliveconcert2025',
  templateUrl: './paponliveconcert2025.component.html',
  styleUrls: ['./paponliveconcert2025.component.scss']
})
export class Paponliveconcert2025Component implements OnInit, OnDestroy {

  @ViewChild('playA') playA!: ElementRef;

  sliderImage : any;
  playAudio: boolean = true;
  audio = new Audio();
  isLog: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.audio.src = "https://gaana.com/song/moh-moh-ke-dhaage-male"; 
    this.audio.load();
    this.audio.play();
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

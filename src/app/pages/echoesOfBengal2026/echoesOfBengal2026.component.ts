import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-echoesOfBengal2026',
  templateUrl: './echoesOfBengal2026.component.html',
  styleUrls: ['./echoesOfBengal2026.component.scss']
})
export class EchoesOfBengal2026Component implements OnInit {

  activeFlyer: string | null = null;
  activeFlyerTitle: string = '';

  constructor() { }

  ngOnInit(): void { }

  openFlyer(src: string, title: string): void {
    this.activeFlyer = src;
    this.activeFlyerTitle = title;
    document.body.style.overflow = 'hidden';
  }

  closeFlyer(): void {
    this.activeFlyer = null;
    this.activeFlyerTitle = '';
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.activeFlyer) this.closeFlyer();
  }

}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetjsonfileService } from './../../services/getjsonfile.service';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-durgapuja2026',
  templateUrl: './durgapuja2026.component.html',
  styleUrls: ['./durgapuja2026.component.scss']
})
export class Durgapuja2026Component implements OnInit, AfterViewInit {

  sliderImage : any;
  isLog: boolean = true;

  constructor( private jsonFile:GetjsonfileService, public auth: AuthService, private route: ActivatedRoute ) {
    console.log(this.auth.isLoggedIn.valueOf());
  }

  ngOnInit(): void {
  }

  // When the page is opened with a URL fragment (e.g. /durgapuja2026#food-menu,
  // as encoded in the printed QR code), smoothly scroll to that section once it
  // exists in the DOM. Scrolls a second time after a longer delay so large images
  // finishing their load don't leave the target slightly off.
  ngAfterViewInit(): void {
    this.route.fragment.subscribe(frag => {
      if (frag) { this.scrollToFragment(frag); }
    });
  }

  private scrollToFragment(id: string, attempt: number = 0): void {
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 1000);
    } else if (attempt < 15) {
      setTimeout(() => this.scrollToFragment(id, attempt + 1), 200);
    }
  }

}

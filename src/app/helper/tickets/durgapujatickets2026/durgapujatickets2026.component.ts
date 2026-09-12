import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService } from './../../../shared/services/auth.service';
import * as moment from 'moment';

interface Tier {
  key: string;
  title: string;
  released: boolean;
  items: any[];
}

@Component({
  selector: 'app-durgapujatickets2026',
  templateUrl: './durgapujatickets2026.component.html',
  styleUrls: ['./durgapujatickets2026.component.scss']
})

export class Durgapujatickets2026Component implements OnInit, OnChanges, AfterViewChecked {

  private  memberCart = [{
    "name": "NVBA Annual Membership",
    "description": "NVBA Annual Membership Fee - 2026",
    "quantity": 1,
    "price": 30,
    "tax": 0,
    "sku": "MM2026YY",
    "currency": "USD"
  }];

  member:any;
  currentDate:any;
  cartCheck: any;
  totalCost: number = 0;
  memberValidity : boolean = false;

  // ── Mandatory agreements (both required before checkout) ─────────────────────
  agreeTerms: boolean = false;
  agreeRefund: boolean = false;
  showTerms: boolean = false;    // toggles the full Terms & Conditions text
  showRefund: boolean = false;   // toggles the full Refund Policy text

  // ── Staged release control ───────────────────────────────────────────────────
  // Flip these as each phase opens; set a phase false to close it.
  // Typical order: Early Bird → Regular → Regular (Without Cultural) → Cultural Only.
  releaseEarlyBird: boolean = true;
  releaseRegular: boolean = false;
  releaseRegularWithoutCultural: boolean = false;
  releaseOnlyCultural: boolean = false;

  private urls = {
    earlybird:         '/assets/data/tickets/durgapuja-2026-earlybird.json',
    regular:           '/assets/data/tickets/durgapuja-2026-regular.json',
    regularNoCultural: '/assets/data/tickets/durgapuja-2026-regular-without-cultural.json',
    cultural:          '/assets/data/tickets/durgapuja-2026-cultural.json'
  };

  earlyBirdTickets: any[] = [];
  regularTickets: any[] = [];
  regularNoCulturalTickets: any[] = [];
  culturalTickets: any[] = [];

  tiers: Tier[] = [];

  constructor(
      private http: HttpClient,
      private cs: CartService,
      public router: Router,
      private auth: AuthService,
      private cdr: ChangeDetectorRef)
  {
      this.cs.currentCart.subscribe( cartCheck => this.cartCheck = cartCheck);

      forkJoin({
        eb:  this.getJSON(this.urls.earlybird).pipe(catchError(() => of([]))),
        reg: this.getJSON(this.urls.regular).pipe(catchError(() => of([]))),
        rnc: this.getJSON(this.urls.regularNoCultural).pipe(catchError(() => of([]))),
        cul: this.getJSON(this.urls.cultural).pipe(catchError(() => of([])))
      }).subscribe(({ eb, reg, rnc, cul }: any) => {
        this.earlyBirdTickets = eb || [];
        this.regularTickets = reg || [];
        this.regularNoCulturalTickets = rnc || [];
        this.culturalTickets = cul || [];
        this.buildTiers();

        this.auth.member.subscribe( m => {
          this.member = m;

          if (!m) {
            this.memberValidity = false;
            return;
          }

          this.currentDate = moment();

          if(moment(this.member.expires).isAfter(this.currentDate) ){
            this.memberValidity = true;
            this.member.membershipstatus = 'Valid';
          }
          else{
            this.memberValidity = false;
            this.member.membershipstatus = 'Expired';
          }
        });

        this.checkData();
      });
  }

  ngOnInit(): void {}
  ngOnChanges(): void {}

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  buildTiers(): void {
    this.tiers = [
      { key: 'eb',  title: 'Early Bird Tickets (Available until Sep 19, 2026)', released: this.releaseEarlyBird,               items: this.earlyBirdTickets },
      { key: 'reg', title: 'Regular Tickets',                  released: this.releaseRegular,                 items: this.regularTickets },
      { key: 'rnc', title: 'Regular Tickets (Without Cultural)', released: this.releaseRegularWithoutCultural, items: this.regularNoCulturalTickets },
      { key: 'cul', title: 'Cultural Only Tickets',            released: this.releaseOnlyCultural,            items: this.culturalTickets }
    ].filter(t => t.released && t.items && t.items.length > 0);
  }

  // All ticket rows currently on screen (across every released tier).
  get releasedItems(): any[] {
    return this.tiers.reduce((acc: any[], t) => acc.concat(t.items), []);
  }

  // Distinct day-scope groups within a tier, in first-seen order.
  groups(items: any[]): string[] {
    const seen: string[] = [];
    items.forEach(i => { if (i.group && seen.indexOf(i.group) === -1) seen.push(i.group); });
    return seen;
  }

  itemsInGroup(items: any[], group: string): any[] {
    return items.filter(i => i.group === group);
  }

  checkData(): void {
    this.releasedItems.forEach(value => {
      [...this.cartCheck].forEach(element => {
        if (value.sku === element.sku) {
          value.quantity = element.quantity;
        }
      });
    });
  }

  ngAfterViewChecked(): void {
    let tc = 0;
    this.releasedItems.forEach(value => {
      if (value.quantity > 0) {
        tc += (value.price * value.quantity);
      }
    });
    this.totalCost = tc;
    this.cdr.detectChanges();
  }

  get hasItems(): boolean {
    return this.releasedItems.some(v => v.quantity > 0);
  }

  // Add to Cart is allowed only when both agreements are checked and there is at least one ticket.
  get canCheckout(): boolean {
    return this.hasItems && this.agreeTerms && this.agreeRefund;
  }

  addMembershipToCartobj(): void {
    this.cs.items = [];
    this.cs.addToCart(this.memberCart);
    this.router.navigate(['/checkout']);
  }

  addToCartobj(): void {
    if (!this.canCheckout) { return; }
    this.cs.items = [];
    this.releasedItems.forEach((value: any) => {
      if (value.quantity > 0) {
        this.cs.items.push(value);
      }
    });
    this.cs.addToCart(this.cs.items);
    if (this.member?.expires) {
      this.router.navigate(['/checkout']);
    }
  }

  clearCart(): void {
    this.releasedItems.forEach(value => value.quantity = 0);
  }

  // Quantities must be whole, non-negative numbers (0-10).
  toWhole(v: any): number {
    const n = Math.floor(Number(v));
    if (isNaN(n) || n < 0) { return 0; }
    return n > 10 ? 10 : n;
  }

  blockNonInteger(e: KeyboardEvent): void {
    // Prevent decimals / exponent / sign characters in the quantity field.
    if (['.', ',', 'e', 'E', '+', '-'].indexOf(e.key) !== -1) { e.preventDefault(); }
  }
}

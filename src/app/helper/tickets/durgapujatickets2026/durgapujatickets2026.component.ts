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
  priceLabel: string;
  priceNote: string;
  note: string;
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
  releaseEarlyBird: boolean = false;
  releaseRegular: boolean = false;
  releaseRegularWithoutCultural: boolean = true;
  releaseOnlyCultural: boolean = false;

  // ── Single-day release control (independent of the 3-day / Sat & Sun offerings) ──
  // Flip these to open or hold the "Saturday Only" / "Sunday Only" tickets across
  // the Regular, Without-Cultural and Cultural Only tiers.
  releaseSaturdayOnly: boolean = false;
  releaseSundayOnly: boolean = false;

  // ── Sold out / sales closed ───────────────────────────────────────────────────
  // Set `soldOut = true` to close ticket sales immediately, OR set `salesCloseAt`
  // to an ISO timestamp (with timezone offset, e.g. '2026-09-22T00:00:00-04:00')
  // to auto-close at that exact moment. Either one shows the SOLD OUT banner and
  // hides the entire ticket/cart UI.
  soldOut: boolean = false;
  salesCloseAt: string = '';

  get isSoldOut(): boolean {
    if (this.soldOut) { return true; }
    if (this.salesCloseAt) { return moment().isSameOrAfter(moment(this.salesCloseAt)); }
    return false;
  }

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
            this.buildTiers();
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
          this.buildTiers();   // membership affects which tiers are shown + pricing
          this.checkData();
        });

        this.checkData();
      });
  }

  ngOnInit(): void {}
  ngOnChanges(): void {}

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  // Hide single-day groups that are not yet released. The 3-day and
  // "Saturday & Sunday" base offerings are always shown for a released tier.
  private applyDayScope(items: any[]): any[] {
    return (items || []).filter(i => {
      if (i.group === 'Saturday Only') { return this.releaseSaturdayOnly; }
      if (i.group === 'Sunday Only')   { return this.releaseSundayOnly; }
      return true;
    });
  }

  buildTiers(): void {
    const all = [
      { key: 'eb',  title: 'Early Bird Tickets (Available until Sep 20, 2026)', priceLabel: 'Early Bird', priceNote: 'Until Sep 20, 2026', note: 'All ticket types include admission to Puja, cultural programs and food for all 3 days', released: this.releaseEarlyBird,               items: this.applyDayScope(this.earlyBirdTickets) },
      { key: 'reg', title: 'Regular Tickets',                  priceLabel: 'Regular', priceNote: '', note: 'All ticket types include admission to Puja, cultural programs and food for all 3 days', released: this.releaseRegular,                 items: this.applyDayScope(this.regularTickets) },
      { key: 'rnc', title: 'Festival Tickets (Without Cultural)', priceLabel: 'Without Cultural', priceNote: '', note: 'Admission to Puja and food for all 3 days (cultural program not included)', released: this.releaseRegularWithoutCultural, items: this.applyDayScope(this.regularNoCulturalTickets) },
      { key: 'cul', title: 'Cultural Only Tickets',            priceLabel: 'Cultural Only', priceNote: '', note: 'Cultural program admission only (food not included)', released: this.releaseOnlyCultural,            items: this.applyDayScope(this.culturalTickets) }
    ].filter(t => t.released && t.items && t.items.length > 0);
    // Non-members / expired members may buy ONLY the Festival (Without Cultural) tier.
    this.tiers = this.memberValidity ? all : all.filter(t => t.key === 'rnc');
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

  // ── Presentation metadata per category (icon, subtitle, tooltip) ──
  categoryOrder = ['adult', 'youthvp', 'student', 'youthadult', 'youthkids', 'child'];
  categoryMeta: { [k: string]: { subtitle: string; tooltip: string; icon: string; color: string } } = {
    adult:      { subtitle: '', tooltip: '', icon: 'person', color: '#c0392b' },
    student:    { subtitle: 'Students (19-24 yrs) with valid Student ID or Visiting Parents.', tooltip: '', icon: 'cap', color: '#7b3fa0' },
    youthvp:    { subtitle: 'Youth (6-17 yrs) on the adult menu, Students (19-24 yrs with valid ID), or Visiting Parents.', tooltip: '', icon: 'cap', color: '#7b3fa0' },
    youthadult: { subtitle: 'Select this if the youth will have food from the Adult Menu', tooltip: '', icon: 'person', color: '#2b7de9' },
    youthkids:  { subtitle: 'Select this if the youth will have food from the Kids Menu', tooltip: '', icon: 'person', color: '#e67e22' },
    child:      { subtitle: '', tooltip: '', icon: 'child', color: '#27ae60' }
  };

  catOf(sku: string): string {
    if (sku.indexOf('ADULT') !== -1) { return 'adult'; }
    if (sku.indexOf('STUDENT') !== -1) { return 'student'; }
    if (sku.indexOf('YOUTHWKIDS') !== -1) { return 'youthkids'; }
    if (sku.indexOf('YOUTHVP') !== -1) { return 'youthvp'; }
    if (sku.indexOf('YOUTH') !== -1) { return 'youthadult'; }
    return 'child';
  }

  metaOf(item: any) {
    return this.categoryMeta[this.catOf(item.sku)];
  }

  subtitleOf(item: any): string {
    const cat = this.catOf(item.sku);
    if (item.sku.indexOf('CULTURAL') !== -1) {
      return cat === 'student' ? this.categoryMeta['student'].subtitle : '';
    }
    return this.categoryMeta[cat].subtitle;
  }

  orderedItems(items: any[], group: string): any[] {
    return this.itemsInGroup(items, group)
      .slice()
      .sort((a, b) => this.categoryOrder.indexOf(this.catOf(a.sku)) - this.categoryOrder.indexOf(this.catOf(b.sku)));
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
        tc += (this.displayPrice(value) * value.quantity);
      }
    });
    this.totalCost = tc;
    this.cdr.detectChanges();
  }

  // ── Non-member pricing: non-members / expired pay +$10 per PAID ticket
  //    (kids / $0 tickets are exempt). Members pay the base price. ──
  surchargeFor(item: any): number {
    return (!this.memberValidity && Number(item.price) > 0) ? 10 : 0;
  }
  displayPrice(item: any): number {
    return Number(item.price) + this.surchargeFor(item);
  }

  // Maximum number of tickets allowed across the entire cart.
  readonly maxTotalTickets: number = 10;

  get hasItems(): boolean {
    return this.releasedItems.some(v => v.quantity > 0);
  }

  // Running total of tickets selected across every row/tier on screen.
  get totalTickets(): number {
    return this.releasedItems.reduce((sum, v) => sum + (Number(v.quantity) || 0), 0);
  }

  get overTicketLimit(): boolean {
    return this.totalTickets > this.maxTotalTickets;
  }

  // Total cart value (what the buyer pays, incl. any non-member surcharge).
  get cartValue(): number {
    return this.releasedItems.reduce((sum, v) =>
      sum + ((Number(v.quantity) > 0) ? this.displayPrice(v) * Number(v.quantity) : 0), 0);
  }

  // Add to Cart is allowed only when both agreements are checked, there is at least
  // one ticket, and the cart value is greater than $0 (free child tickets alone
  // must be accompanied by a paid/adult ticket).
  get canCheckout(): boolean {
    return this.hasItems && this.cartValue > 0 && !this.overTicketLimit && this.agreeTerms && this.agreeRefund;
  }

  addMembershipToCartobj(): void {
    this.cs.items = [];
    this.cs.addToCart(this.memberCart);
    this.router.navigate(['/checkout']);
  }

  addToCartobj(): void {
    if (!this.canCheckout || this.overTicketLimit) { return; }
    this.cs.items = [];
    this.releasedItems.forEach((value: any) => {
      if (value.quantity > 0) {
        // Store the price the buyer actually pays (base + any non-member surcharge).
        this.cs.items.push({ ...value, price: this.displayPrice(value) });
      }
    });
    this.cs.addToCart(this.cs.items);
    if (this.member) {
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/sign-in']);
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

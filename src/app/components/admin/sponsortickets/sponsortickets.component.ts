import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../shared/member/member.service';
import { currentUserEmail } from '../../../shared/guard/admin-groups';

@Component({
  selector: 'app-sponsortickets',
  templateUrl: './sponsortickets.component.html',
  styleUrls: ['./sponsortickets.component.scss']
})
export class SponsorTicketsComponent implements OnInit {

  yearOptions = ['2026'];
  eventOptions = ['Durga Puja'];
  categoryOptions = ['Adult Non-Veg', 'Adult Veg', 'Kids'];

  sponsorName = '';
  year = '2026';
  event = 'Durga Puja';
  category = 'Adult Non-Veg';
  count = 1;

  saving = false;
  msg = '';
  list: any[] = [];

  constructor(private mds: MemberService) {}

  ngOnInit(): void {
    this.mds.getSponsorTickets().subscribe((rows: any[]) => {
      this.list = (rows || []).sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
    });
  }

  private skuFor(category: string): string {
    if (category === 'Adult Non-Veg') { return 'DP2026SPONSORADULTNONVEG'; }
    if (category === 'Adult Veg')     { return 'DP2026SPONSORADULTVEG'; }
    if (category === 'Kids')          { return 'DP2026SPONSORKIDS'; }
    return '';
  }

  add(): void {
    const name = (this.sponsorName || '').trim();
    const cnt = Number(this.count) || 0;
    if (!name) { this.msg = 'Enter a sponsor name.'; return; }
    if (cnt <= 0) { this.msg = 'Count must be at least 1.'; return; }
    this.saving = true;
    const entry = {
      sponsorName: name,
      year: this.year,
      event: this.event,
      category: this.category,
      count: cnt,
      sku: this.skuFor(this.category),
      paymentStatus: 'SPONSOR',
      createdAt: new Date().toISOString(),
      createdBy: currentUserEmail()
    };
    Promise.resolve(this.mds.addSponsorTicket(entry))
      .then(() => { this.msg = 'Added ' + cnt + ' ' + this.category + ' for ' + name + '.'; this.sponsorName = ''; this.count = 1; })
      .catch((e: any) => { this.msg = 'Failed: ' + (e && e.message ? e.message : e); })
      .then(() => { this.saving = false; });
  }

  remove(row: any): void {
    if (!row || !row.$key) { return; }
    if (!window.confirm('Delete sponsor entry: ' + row.count + ' ' + row.category + ' for ' + row.sponsorName + '?')) { return; }
    this.mds.deleteSponsorTicket(row.$key)
      .then(() => { this.msg = 'Deleted.'; })
      .catch((e: any) => { this.msg = 'Delete failed: ' + (e && e.message ? e.message : e); });
  }

  // Totals per category for the selected year+event (for a quick check).
  totalFor(category: string): number {
    return (this.list || [])
      .filter(r => r && String(r.year) === this.year && r.event === this.event && r.category === category)
      .reduce((sum, r) => sum + (Number(r.count) || 0), 0);
  }
  get grandTotal(): number {
    return this.categoryOptions.reduce((s, c) => s + this.totalFor(c), 0);
  }
}

import { Component, OnInit } from '@angular/core';
import { GetjsonfileService } from './../../../services/getjsonfile.service';

// Define interface for event data
interface Event {
  eventId: number;
  eventType: string;
  eventName: string;
  eventDate: string;
  eventEndDate: string;
  eventImage: string;
  timming: string;
  venue: string;
  pageLink: string;
  description: string;
  mapUrl: string;
}

@Component({
  selector: 'app-latestevents',
  templateUrl: './latestevents.component.html',
  styleUrls: ['./latestevents.component.scss']
})

export class LatesteventsComponent implements OnInit {
  events: any = [];
  pastevents: any =[];
  commingevents: any =[];
  pastEventsExpanded: boolean = false; // Set to false to make it collapsed by default
  selectedYear: string = ''; // Track the selected year
  pastEventsByYear: { [key: string]: any[] } = {}; // Group events by year
  expandedYears: { [key: string]: boolean } = {}; // Object to track which years are expanded
  
  constructor(private jsonFile:GetjsonfileService) { }

  ngOnInit(): void {
    this.jsonFile.pageData('events').subscribe(data => {
      ////console.log(data);
      this.events = data;
      [...this.events].forEach((e: Event) => {
        if(e.eventType=='past'){
          this.pastevents.push(e);
        }
        else{
          this.commingevents.push(e);
        }
      });
      
      // Group past events by year
      this.groupPastEventsByYear();
      console.log( this.pastevents);
    });
  }
  
  groupPastEventsByYear() {
    this.pastevents.forEach((event: Event) => {
      // Extract year from eventEndDate - just take the year part from "Month, Date, Year" format
      let year = '';
      
      // Extract year from the end of eventEndDate string
      const dateParts = event.eventEndDate.split(',');
      if (dateParts.length >= 3) {
        // Take the last part (year) and remove any extra whitespace
        year = dateParts[dateParts.length - 1].trim();
      } else {
        // Fallback: try to extract year using regex
        const yearMatch = event.eventEndDate.match(/\b(20\d{2})\b/);
        if (yearMatch) {
          year = yearMatch[1];
        } else {
          // Final fallback: use current year
          year = new Date().getFullYear().toString();
        }
      }
      
      if (!this.pastEventsByYear[year]) {
        this.pastEventsByYear[year] = [];
        this.expandedYears[year] = false; // Default to collapsed
      }
      
      this.pastEventsByYear[year].push(event);
    });
    
    // Sort years in descending order (most recent first)
    const sortedYears = Object.keys(this.pastEventsByYear).sort((a, b) => parseInt(b) - parseInt(a));
    const sortedEventsByYear: { [key: string]: Event[] } = {};
    sortedYears.forEach(year => {
      sortedEventsByYear[year] = this.pastEventsByYear[year];
    });
    this.pastEventsByYear = sortedEventsByYear;
  }
  
  togglePastEvents() {
    this.pastEventsExpanded = !this.pastEventsExpanded;
  }
  
  selectYear(year: string) {
    this.selectedYear = this.selectedYear === year ? '' : year; // Toggle selection
  }
  
  toggleYear(year: string) {
    this.expandedYears[year] = !this.expandedYears[year];
  }
  
  getYearKeys(): string[] {
    return Object.keys(this.pastEventsByYear).sort((a, b) => parseInt(b) - parseInt(a));
  }
}

import { Component, OnInit, HostListener } from '@angular/core';

export interface CaresInitiative {
  title: string;
  date: string;
  image: string;
}

@Component({
  selector: 'app-cares',
  templateUrl: './cares.component.html',
  styleUrls: ['./cares.component.scss']
})
export class CaresComponent implements OnInit {

  initiatives: CaresInitiative[] = [
    { title: '5K Charity Run with Best Runners', date: 'Sept 8, 2024', image: './../../../assets/images/cares/cares-5k-br-2024.png' },
    { title: 'Book Donation Drive for Title 1 Schools', date: 'May 5, 2024', image: './../../../assets/images/cares/cares-book-donation-2024.png' },
    { title: '5K Charity Run with Feed Fairfax', date: 'May 4, 2024', image: './../../../assets/images/cares/cares-5k-feedForfairfax-2024.png' },
    { title: 'She Believes in Me', date: 'April 11, 2024', image: './../../../assets/images/cares/cares-sbim-2024.png' },
    { title: 'Breakfast for Firefighters', date: 'Dec 10, 2023', image: './../../../assets/images/cares/cares-ffb-2023.png' },
    { title: 'Thanksgiving Food Drive for Food for Others', date: 'Nov 1\u201321, 2023', image: './../../../assets/images/cares/cares-thanksgiving-2023.png' },
    { title: '5K Charity Run with Best Runners', date: 'Sept 10, 2023', image: './../../../assets/images/cares/care-8.png' },
    { title: 'Homeless Shelter Dinner', date: 'Aug 27, 2023', image: './../../../assets/images/cares/care-7.png' },
    { title: '5K Charity Run with Feed Fairfax', date: 'May 6, 2023', image: './../../../assets/images/cares/care-6.png' },
    { title: 'She Believes in Me', date: 'March 3\u201311, 2023', image: './../../../assets/images/cares/care-5.png' },
    { title: 'Breakfast for Firefighters', date: 'Dec 4, 2022', image: './../../../assets/images/cares/care-4.png' },
    { title: 'Thanksgiving Food Drive for Food for Others', date: 'Nov 1\u201323, 2022', image: './../../../assets/images/cares/care-3-1.png' },
    { title: 'Thanksgiving Food Drive for Food for Others', date: 'Nov 1\u201323, 2022', image: './../../../assets/images/cares/care-3.png' },
    { title: 'Project Sunderbans', date: 'June & July 2022', image: './../../../assets/images/cares/care-2.png' },
    { title: 'Homeless Shelter Dinner', date: 'May 1, 2022', image: './../../../assets/images/cares/care-1.png' },
    { title: 'Homeless Shelter Dinner', date: 'April 10, 2022', image: './../../../assets/images/cares/care-1.png' },
  ];

  lightboxOpen = false;
  lightboxIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  openLightbox(index: number): void {
    this.lightboxIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    this.lightboxIndex = (this.lightboxIndex - 1 + this.initiatives.length) % this.initiatives.length;
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    this.lightboxIndex = (this.lightboxIndex + 1) % this.initiatives.length;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowLeft') this.prevImage(event);
    if (event.key === 'ArrowRight') this.nextImage(event);
  }
}

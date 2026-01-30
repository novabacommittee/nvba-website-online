import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetjsonfileService } from '../../../services/getjsonfile.service';

export interface Photo {
  url: string;
  year: string;
  filename: string;
}

export interface GalleryData {
  communityPhotos: {
    [year: string]: {
      year: string;
      photos: string[];
    };
  };
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  photosByYear: { [key: string]: Photo[] } = {};
  selectedYear: string = '';
  selectedPhotoIndex: number = 0;
  isModalOpen: boolean = false;
  currentPhoto: Photo | null = null;
  years: string[] = [];
  galleryData: GalleryData | null = null;

  private _jsonURL = '/assets/data/pages/gallery.json';

  constructor(private jsonFile: GetjsonfileService) { }

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.jsonFile.pageData('gallery').subscribe(data => {
      this.galleryData = data as GalleryData;
      this.processGalleryData();
    });
  }

  processGalleryData(): void {
    if (!this.galleryData) return;

    const communityPhotos = this.galleryData.communityPhotos;
    
    Object.keys(communityPhotos).forEach(year => {
      const yearData = communityPhotos[year];
      const photos: Photo[] = [];
      
      yearData.photos.forEach(filename => {
        photos.push({
          url: `./../../../../assets/images/community-photos/${year}/${filename}`,
          year: year,
          filename: filename
        });
      });
      
      this.photosByYear[year] = photos;
    });
    
    this.years = Object.keys(this.photosByYear).sort((a, b) => parseInt(b) - parseInt(a));
    
    // Auto-select first year with photos
    if (this.years.length > 0) {
      this.selectedYear = this.years[0];
    }
  }

  selectYear(year: string): void {
    this.selectedYear = year;
    this.closeModal();
  }

  openPhoto(photo: Photo, index: number): void {
    this.currentPhoto = photo;
    this.selectedPhotoIndex = index;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.currentPhoto = null;
  }

  nextPhoto(): void {
    if (this.selectedYear && this.currentPhoto) {
      const photos = this.photosByYear[this.selectedYear];
      if (photos && photos.length > 0) {
        this.selectedPhotoIndex = (this.selectedPhotoIndex + 1) % photos.length;
        this.currentPhoto = photos[this.selectedPhotoIndex];
      }
    }
  }

  previousPhoto(): void {
    if (this.selectedYear && this.currentPhoto) {
      const photos = this.photosByYear[this.selectedYear];
      if (photos && photos.length > 0) {
        this.selectedPhotoIndex = (this.selectedPhotoIndex - 1 + photos.length) % photos.length;
        this.currentPhoto = photos[this.selectedPhotoIndex];
      }
    }
  }

  getPhotosForSelectedYear(): Photo[] {
    return this.selectedYear ? this.photosByYear[this.selectedYear] || [] : [];
  }

  hasPhotosForSelectedYear(): boolean {
    return this.getPhotosForSelectedYear().length > 0;
  }

  getPhotosCountForSelectedYear(): number {
    return this.getPhotosForSelectedYear().length;
  }
}

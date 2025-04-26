import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paponliveconcert2025Component } from './paponliveconcert2025.component';

describe('Paponliveconcert2025Component', () => {
  let component: Paponliveconcert2025Component;
  let fixture: ComponentFixture<Paponliveconcert2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Paponliveconcert2025Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paponliveconcert2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

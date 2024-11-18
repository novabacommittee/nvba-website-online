import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Saraswatipuja2025Component } from './saraswatipuja2025.component';

describe('Saraswatipuja2025Component', () => {
  let component: Saraswatipuja2025Component;
  let fixture: ComponentFixture<Saraswatipuja2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Saraswatipuja2025Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Saraswatipuja2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Saraswatipuja2026Component } from './saraswatipuja2026.component';

describe('Saraswatipuja2026Component', () => {
  let component: Saraswatipuja2026Component;
  let fixture: ComponentFixture<Saraswatipuja2026Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Saraswatipuja2026Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Saraswatipuja2026Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

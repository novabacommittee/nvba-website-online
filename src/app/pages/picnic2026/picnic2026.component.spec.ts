import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Picnic2026Component } from './picnic2026.component';

describe('Picnic2026Component', () => {
  let component: Picnic2026Component;
  let fixture: ComponentFixture<Picnic2026Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Picnic2026Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Picnic2026Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

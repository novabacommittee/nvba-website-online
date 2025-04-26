import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Picnic2025Component } from './picnic2025.component';

describe('Picnic2025Component', () => {
  let component: Picnic2025Component;
  let fixture: ComponentFixture<Picnic2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Picnic2025Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Picnic2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kobipronam2025Component } from './kobipronam2025.component';

describe('Kobipronam2025Component', () => {
  let component: Kobipronam2025Component;
  let fixture: ComponentFixture<Kobipronam2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Kobipronam2025Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kobipronam2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

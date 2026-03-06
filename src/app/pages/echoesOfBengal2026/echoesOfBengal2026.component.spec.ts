import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchoesOfBengal2026Component } from './echoesOfBengal2026.component';

describe('Kobipronam2025Component', () => {
  let component: EchoesOfBengal2026Component;
  let fixture: ComponentFixture<EchoesOfBengal2026Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchoesOfBengal2026Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EchoesOfBengal2026Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Durgapujatickets2026Component } from './durgapujatickets2026.component';

describe('Durgapujatickets2026Component', () => {
  let component: Durgapujatickets2026Component;
  let fixture: ComponentFixture<Durgapujatickets2026Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Durgapujatickets2026Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Durgapujatickets2026Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Durgapujatickets2025Component } from './durgapujatickets2025.component';

describe('Durgapujatickets2025Component', () => {
  let component: Durgapujatickets2025Component;
  let fixture: ComponentFixture<Durgapujatickets2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Durgapujatickets2025Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Durgapujatickets2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

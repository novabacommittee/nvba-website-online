import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Durgapujatickets2024Component } from './durgapujatickets2024.component';

describe('Durgapujatickets2024Component', () => {
  let component: Durgapujatickets2024Component;
  let fixture: ComponentFixture<Durgapujatickets2024Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Durgapujatickets2024Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Durgapujatickets2024Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

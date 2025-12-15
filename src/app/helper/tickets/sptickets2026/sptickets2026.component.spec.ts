import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SPtickets2026Component } from './sptickets2026.component';

describe('SPtickets2026Component', () => {
  let component: SPtickets2026Component;
  let fixture: ComponentFixture<SPtickets2026Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SPtickets2026Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SPtickets2026Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

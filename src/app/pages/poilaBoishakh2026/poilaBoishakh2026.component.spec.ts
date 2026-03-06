import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoilaBoishakh2026Component } from './poilaBoishakh2026.component';

describe('Poilabaishak2025Component', () => {
  let component: PoilaBoishakh2026Component;
  let fixture: ComponentFixture<PoilaBoishakh2026Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoilaBoishakh2026Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoilaBoishakh2026Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

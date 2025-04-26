import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poilabaishak2025Component } from './poilabaishak2025.component';

describe('Poilabaishak2025Component', () => {
  let component: Poilabaishak2025Component;
  let fixture: ComponentFixture<Poilabaishak2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Poilabaishak2025Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Poilabaishak2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

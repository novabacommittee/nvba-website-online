import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pastteam2024To25Component } from './pastteam2024-25.component';

describe('Pastteam2024To25Component', () => {
  let component: Pastteam2024To25Component;
  let fixture: ComponentFixture<Pastteam2024To25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pastteam2024To25Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pastteam2024To25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

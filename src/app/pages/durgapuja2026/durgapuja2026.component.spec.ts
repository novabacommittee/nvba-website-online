import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Durgapuja2024Component } from './durgapuja2024.component';

describe('Durgapuja2024Component', () => {
  let component: Durgapuja2024Component;
  let fixture: ComponentFixture<Durgapuja2024Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Durgapuja2024Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Durgapuja2024Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

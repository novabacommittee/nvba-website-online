import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Durgapuja2025Component } from './durgapuja2025.component';

describe('Durgapuja2025Component', () => {
  let component: Durgapuja2025Component;
  let fixture: ComponentFixture<Durgapuja2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Durgapuja2025Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Durgapuja2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

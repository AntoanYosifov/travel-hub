import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDestinations } from './all-destinations';

describe('AllDestinations', () => {
  let component: AllDestinations;
  let fixture: ComponentFixture<AllDestinations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDestinations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDestinations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WantToVisit } from './want-to-visit';

describe('WantToVisit', () => {
  let component: WantToVisit;
  let fixture: ComponentFixture<WantToVisit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WantToVisit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WantToVisit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

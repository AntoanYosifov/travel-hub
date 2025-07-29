import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDestination } from './new-destination';

describe('NewDestination', () => {
  let component: NewDestination;
  let fixture: ComponentFixture<NewDestination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDestination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDestination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

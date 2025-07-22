import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationItem } from './destination-item';

describe('DestinationItem', () => {
  let component: DestinationItem;
  let fixture: ComponentFixture<DestinationItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

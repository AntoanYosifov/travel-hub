import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationBoard } from './destination-board';

describe('DestinationBoard', () => {
  let component: DestinationBoard;
  let fixture: ComponentFixture<DestinationBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

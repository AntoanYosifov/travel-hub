import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WtvButton } from './wtv-button';

describe('WtvButton', () => {
  let component: WtvButton;
  let fixture: ComponentFixture<WtvButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WtvButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WtvButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

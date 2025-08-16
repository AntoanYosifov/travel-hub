import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedByYou } from './added-by-you';

describe('AddedByYou', () => {
  let component: AddedByYou;
  let fixture: ComponentFixture<AddedByYou>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddedByYou]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddedByYou);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

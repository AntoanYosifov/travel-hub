import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCollections } from './user-collections';

describe('UserCollections', () => {
  let component: UserCollections;
  let fixture: ComponentFixture<UserCollections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCollections]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCollections);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

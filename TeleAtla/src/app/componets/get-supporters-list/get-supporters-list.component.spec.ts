import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSupportersListComponent } from './get-supporters-list.component';

describe('GetSupportersListComponent', () => {
  let component: GetSupportersListComponent;
  let fixture: ComponentFixture<GetSupportersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSupportersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSupportersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

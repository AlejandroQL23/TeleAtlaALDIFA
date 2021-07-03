import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSupporterComponent } from './update-supporter.component';

describe('UpdateSupporterComponent', () => {
  let component: UpdateSupporterComponent;
  let fixture: ComponentFixture<UpdateSupporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSupporterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSupporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

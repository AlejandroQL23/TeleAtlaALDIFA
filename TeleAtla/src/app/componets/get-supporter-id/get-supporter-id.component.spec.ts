import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSupporterIdComponent } from './get-supporter-id.component';

describe('GetSupporterIdComponent', () => {
  let component: GetSupporterIdComponent;
  let fixture: ComponentFixture<GetSupporterIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSupporterIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSupporterIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

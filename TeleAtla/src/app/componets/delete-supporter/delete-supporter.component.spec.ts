import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSupporterComponent } from './delete-supporter.component';

describe('DeleteSupporterComponent', () => {
  let component: DeleteSupporterComponent;
  let fixture: ComponentFixture<DeleteSupporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSupporterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSupporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

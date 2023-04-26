import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInsuredItemComponent } from './add-edit-insured-item.component';

describe('AddEditInsuredItemComponent', () => {
  let component: AddEditInsuredItemComponent;
  let fixture: ComponentFixture<AddEditInsuredItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditInsuredItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditInsuredItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInsuredItemComponent } from './show-insured-item.component';

describe('ShowInsuredItemComponent', () => {
  let component: ShowInsuredItemComponent;
  let fixture: ComponentFixture<ShowInsuredItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInsuredItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowInsuredItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

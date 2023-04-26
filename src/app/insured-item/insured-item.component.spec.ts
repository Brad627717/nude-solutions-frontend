import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredItemComponent } from './insured-item.component';

describe('InsuredItemComponent', () => {
  let component: InsuredItemComponent;
  let fixture: ComponentFixture<InsuredItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuredItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuredItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

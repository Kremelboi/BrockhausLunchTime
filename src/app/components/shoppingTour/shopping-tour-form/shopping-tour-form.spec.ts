import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingTourForm } from './shopping-tour-form';

describe('ShoppingTourForm', () => {
  let component: ShoppingTourForm;
  let fixture: ComponentFixture<ShoppingTourForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingTourForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingTourForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

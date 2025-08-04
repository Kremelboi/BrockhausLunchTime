import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingTourOrdersDialog } from './shopping-tour-orders-dialog';

describe('ShoppingTourOrdersDialog', () => {
  let component: ShoppingTourOrdersDialog;
  let fixture: ComponentFixture<ShoppingTourOrdersDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingTourOrdersDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingTourOrdersDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

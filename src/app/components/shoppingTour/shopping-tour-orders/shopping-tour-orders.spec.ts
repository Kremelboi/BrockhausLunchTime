import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingTourOrders } from './shopping-tour-orders';

describe('ShoppingTourOrders', () => {
  let component: ShoppingTourOrders;
  let fixture: ComponentFixture<ShoppingTourOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingTourOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingTourOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

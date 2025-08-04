import {Component, Inject} from '@angular/core';
import {DIALOG_DATA} from '@angular/cdk/dialog';
import {ShoppingTourOrders} from '../shopping-tour-orders/shopping-tour-orders';

@Component({
  selector: 'app-shopping-tour-orders-dialog',
  imports: [
    ShoppingTourOrders
  ],
  templateUrl: './shopping-tour-orders-dialog.html',
  styleUrl: './shopping-tour-orders-dialog.css'
})
export class ShoppingTourOrdersDialog {
  constructor(
    @Inject(DIALOG_DATA) public data: { shoppingTourId: string, isBuyer: boolean }
  ) {
  }
}

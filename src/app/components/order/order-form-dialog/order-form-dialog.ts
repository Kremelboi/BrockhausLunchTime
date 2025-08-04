import {Component, Inject} from '@angular/core';
import {OrderForm} from '../order-form/order-form';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {Order} from '../../../model/order-model';

@Component({
  selector: 'app-order-form-dialog',
  imports: [OrderForm],
  templateUrl: './order-form-dialog.html',
  styleUrl: './order-form-dialog.css'
})
export class OrderFormDialog {
  constructor(
    private dialog: DialogRef<OrderFormDialog>,
    @Inject(DIALOG_DATA) public data: { order: Order, shoppingTourId: string } | undefined
  ) {
  }

  closeDialog() {
    this.dialog.close();
  }
}

import {Component, Inject} from '@angular/core';
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import {ShoppingTourForm} from '../shopping-tour-form/shopping-tour-form';
import {ShoppingTour} from '../../../model/shoppingTour-model';

@Component({
  selector: 'app-shopping-tour-form-dialog',
  imports: [
    ShoppingTourForm,
  ],
  templateUrl: './shopping-tour-form-dialog.html',
  styleUrl: './shopping-tour-form-dialog.css'
})
export class ShoppingTourFormDialog {
  constructor(
    private dialog: Dialog,
    @Inject(DIALOG_DATA) public data: { shoppingTour: ShoppingTour } | undefined
  ) {
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}

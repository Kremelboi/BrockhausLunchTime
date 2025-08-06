import {Component, inject, Inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {ShoppingTourForm} from '../shopping-tour-form/shopping-tour-form';
import {ShoppingTour} from '../../../model/shoppingTour-model';
import {ShoppingTourService} from '../../../service/shoppingtour-service';

@Component({
  selector: 'app-shopping-tour-form-dialog',
  imports: [
    ShoppingTourForm,
  ],
  templateUrl: './shopping-tour-form-dialog.html',
  styleUrl: './shopping-tour-form-dialog.css'
})
export class ShoppingTourFormDialog {
  private shoppingTourService = inject(ShoppingTourService)

  constructor(
    private dialog: DialogRef<ShoppingTourFormDialog>,
    @Inject(DIALOG_DATA) public data: { shoppingTour: ShoppingTour } | undefined
  ) {
  }

  closeDialog() {
    this.dialog.close();
    this.shoppingTourService.refreshGroupedTours()
  }
}

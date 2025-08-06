import {Component, inject} from '@angular/core';
import {ShoppingTourService} from '../../../service/shoppingtour-service';
import {DatePipe} from '@angular/common';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Dialog} from '@angular/cdk/dialog';
import {ShoppingTourFormDialog} from '../shopping-tour-form-dialog/shopping-tour-form-dialog';
import {ShoppingTourCard} from '../shopping-tour-card/shopping-tour-card';

@Component({
  selector: 'app-available-shopping-tours',
  imports: [
    DatePipe,
    MatIcon,
    MatFabButton,
    ShoppingTourCard,
  ],
  templateUrl: './available-shopping-tours.html',
  styleUrl: './available-shopping-tours.css'
})
export class AvailableShoppingTours {
  shoppingTourService = inject(ShoppingTourService);
  shoppingToursGroupedByDay = this.shoppingTourService.getGroupedShoppingToursSignal()
  private dialog = inject(Dialog);

  openShoppingTourForm(): void {
    this.dialog.open(ShoppingTourFormDialog, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop'
    })
  }
}

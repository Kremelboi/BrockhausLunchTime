import {Component, inject} from '@angular/core';
import {ShoppingTourService} from '../../../service/shoppingtour-service';
import {DatePipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {OrderFormDialog} from '../../order/order-form-dialog/order-form-dialog';
import {Dialog} from '@angular/cdk/dialog';
import {ShoppingTourOrdersDialog} from '../shopping-tour-orders-dialog/shopping-tour-orders-dialog';
import {ShoppingTourFormDialog} from '../shopping-tour-form-dialog/shopping-tour-form-dialog';
import {ShoppingTourCard} from '../shopping-tour-card/shopping-tour-card';
import {ShoppingTour} from '../../../model/shoppingTour-model';

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
  private dialog = inject(Dialog);

  openShoppingTourForm(): void {
    this.dialog.open(ShoppingTourFormDialog, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop'
    })
  }
}

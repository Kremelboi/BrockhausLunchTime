import {Component, inject, input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {ShoppingTourFormDialog} from '../shopping-tour-form-dialog/shopping-tour-form-dialog';
import {Dialog} from '@angular/cdk/dialog';
import {OrderFormDialog} from '../../order/order-form-dialog/order-form-dialog';
import {ShoppingTourOrdersDialog} from '../shopping-tour-orders-dialog/shopping-tour-orders-dialog';
import {MatFabButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {ShoppingTour} from '../../../model/shoppingTour-model';

@Component({
  selector: 'app-shopping-tour-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatFabButton,
    MatTooltip
  ],
  templateUrl: './shopping-tour-card.html',
  styleUrl: './shopping-tour-card.css'
})
export class ShoppingTourCard {
  shoppingTour = input.required<ShoppingTour>();
  private dialog = inject(Dialog);

  addOrderToShoppingTour(shoppingTourId: string): void {
    this.dialog.open(OrderFormDialog, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      data: {
        shoppingTourId: shoppingTourId
      }
    });
  }

  openOrderList(shoppingTourId: string, isBuyer: boolean): void {
    this.dialog.open(ShoppingTourOrdersDialog, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      autoFocus: false,
      data: {
        shoppingTourId: shoppingTourId,
        isBuyer: isBuyer,
      }
    })
  }

  editShoppingTour(shoppingTour: ShoppingTour): void {
    this.dialog.open(ShoppingTourFormDialog, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      data: {
        shoppingTour: shoppingTour
      }
    })
  }
}

import {Component, inject, input, OnInit} from '@angular/core';
import {OrderService} from '../../../service/order-service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatCheckbox} from '@angular/material/checkbox';
import {CurrencyPipe} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {OrderFormDialog} from '../../order/order-form-dialog/order-form-dialog';
import {Dialog} from '@angular/cdk/dialog';
import {Order} from '../../../model/order-model';
import {MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {ShoppingTourService} from '../../../service/shoppingtour-service';

@Component({
  selector: 'app-shopping-tour-orders',
  imports: [
    MatHeaderCell,
    MatTable,
    MatCell,
    MatColumnDef,
    MatCheckbox,
    MatHeaderCellDef,
    MatCellDef,
    CurrencyPipe,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatInput,
    MatIcon,
    MatTooltip,
    MatMiniFabButton,
  ],
  templateUrl: './shopping-tour-orders.html',
  styleUrl: './shopping-tour-orders.css'
})
export class ShoppingTourOrders implements OnInit {
  shoppingTourId = input.required<string>();
  isBuyer = input.required<boolean>()
  displayedColumns: string[] = [];
  orders: Order[] = [];
  payPalLink: string = "";
  protected orderService = inject(OrderService);
  protected shoppingTourService = inject(ShoppingTourService);
  private dialog = inject(Dialog)

  ngOnInit(): void {
    this.loadData()
    if (this.isBuyer()) {
      this.displayedColumns = ['name', 'description', 'wantsToJoin', 'paid', 'price', 'amountPaid']
    } else {
      this.displayedColumns = ['name', 'description', 'wantsToJoin', 'paid', 'price', "payNowButton"]
    }
  }

  editOrder(existingOrder: Order) {
    const orderFormDialogRef = this.dialog.open(OrderFormDialog, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      data: {
        order: existingOrder
      }
    });
    orderFormDialogRef.closed.subscribe(() => {
      this.loadData();
    })
  }

  updatePaymentStatus(order: Order): void {
    const newPaidValue = !order.paid;
    const updatedOrder = {
      ...order,
      paid: newPaidValue,
      amountPaid: newPaidValue ? order.price ? order.price : 0 : 0
    };
    this.orderService.updateOrder(updatedOrder);
  }

  updateAmountPaid(order: Order, event: any) {
    const newAmount = parseFloat(event.target.value);
    if (!isNaN(newAmount)) {
      const updatedOrder = {
        ...order,
        amountPaid: newAmount,
        paid: order.price ? newAmount >= order.price : false
      };
      this.orderService.updateOrder(updatedOrder);
    }
  }

  openPayPalLink(): void {
    if (this.payPalLink) {
      window.open(this.payPalLink, '_blank');
    }
  }

  private loadData(): void {
    this.orderService.getOrdersByShoppingTourId(this.shoppingTourId()).subscribe(ordersByShoppingTourId => {
      this.orders = ordersByShoppingTourId;
    })
    this.shoppingTourService.getPayPalLinkForShoppingTour(this.shoppingTourId()).subscribe(link => {
      this.payPalLink = link;
    })
  }
}

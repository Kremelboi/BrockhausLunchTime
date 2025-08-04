import {Component, EventEmitter, inject, input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrderService} from '../../../service/order-service';
import {Order} from '../../../model/order-model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {ShoppingTourService} from '../../../service/shoppingtour-service';

@Component({
  selector: 'app-order-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,

  ],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css'
})

export class OrderForm implements OnInit {
  existingOrder = input<Order>();
  shoppingTourId = input<string>();
  @Output() closeDialog = new EventEmitter<void>();
  orderForm: FormGroup;
  protected payPalLink = "";
  protected shoppingTourService = inject(ShoppingTourService);
  private orderService = inject(OrderService)

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      paid: [false],
      wantsToJoin: [false]
    });
  }

  get isPaid(): boolean {
    return this.orderForm.get('paid')?.value || false;
  }

  ngOnInit() {
    const shoppingTourId = this.existingOrder()?.shoppingTourId;
    if (shoppingTourId) {
      const payPalLink = this.shoppingTourService.getPayPalLinkForShoppingTour(shoppingTourId)
      this.payPalLink = payPalLink ? payPalLink : "";
    }
    const order = this.existingOrder();
    if (order) {
      this.orderForm.patchValue({
        name: order.name,
        description: order.description,
        price: order.price,
        paid: order.paid,
        wantsToJoin: order.wantsToJoin
      });
    }
  }

  submitOrder(): void {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.value;
      const existingOrder = this.existingOrder();

      if (existingOrder) {
        this.orderService.updateOrder({
          ...formValue,
          id: existingOrder.id,
          shoppingTourId: this.existingOrder()?.shoppingTourId,
        });
      } else {
        this.orderService.addOrder({
          ...formValue,
          shoppingTourId: this.shoppingTourId(),
        });
      }
      this.closeDialog.emit();
    }
  }

  cancelOrder(orderId: string): void {
    this.orderService.deleteOrder(orderId);
    this.closeDialog.emit();
  }
}

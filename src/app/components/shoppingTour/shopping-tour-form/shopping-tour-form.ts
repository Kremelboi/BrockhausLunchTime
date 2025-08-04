import {Component, EventEmitter, inject, input, OnInit, Output} from '@angular/core';
import {ShoppingTourService} from '../../../service/shoppingtour-service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {payPalLinkValidator} from '../../../validators/payPalLinkValidator';
import {ShoppingTour} from '../../../model/shoppingTour-model';

@Component({
  selector: 'app-shopping-tour-form',
  imports: [
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatError,
    MatFormField
  ],
  templateUrl: './shopping-tour-form.html',
  styleUrl: './shopping-tour-form.css'
})
export class ShoppingTourForm implements OnInit {
  existingShoppingTour = input<ShoppingTour>();
  @Output() closeDialog = new EventEmitter<void>();
  shoppingTourForm: FormGroup;
  private shoppingTourService = inject(ShoppingTourService);

  constructor(private fb: FormBuilder) {
    this.shoppingTourForm = this.fb.group({
      name: ['', Validators.required],
      shopName: ['', Validators.required],
      date: [new Date(), Validators.required],
      payPalLink: ['', [Validators.required, payPalLinkValidator()]]
    })
  }

  ngOnInit() {
    const shoppingTour = this.existingShoppingTour();
    if (shoppingTour) {
      this.shoppingTourForm.patchValue({
        name: shoppingTour.name,
        shopName: shoppingTour.shopName,
        date: shoppingTour.date,
        payPalLink: shoppingTour.payPalLink
      });
    }
  }

  submitShoppingTour(): void {
    if (this.shoppingTourForm.valid) {
      const formValue = this.shoppingTourForm.value;
      const existingShoppingTour = this.existingShoppingTour();

      if (existingShoppingTour) {
        this.shoppingTourService.updateShoppingTour({
          ...formValue,
          id: existingShoppingTour.id
        })
      } else {
        this.shoppingTourService.addShoppingTour(formValue);
      }
      this.closeDialog.emit();
    }
  }

  deleteShoppingTour(shoppingTourId: string): void {
    this.shoppingTourService.deleteShoppingTour(shoppingTourId);
    this.closeDialog.emit();
  }
}

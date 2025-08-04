import {Component} from '@angular/core';
import {AvailableShoppingTours} from '../shoppingTour/available-shopping-tours/available-shopping-tours';

@Component({
  selector: 'app-main-page',
  imports: [
    AvailableShoppingTours,
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css'
})
export class MainPage {

}

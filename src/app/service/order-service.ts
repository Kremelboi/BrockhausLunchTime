import {inject, Injectable} from '@angular/core';
import {Order} from '../model/order-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShoppingTour} from '../model/shoppingTour-model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  http = inject(HttpClient);

  getOrdersByShoppingTourId(shoppingTourId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`http://localhost:3000/order/${shoppingTourId}`)
  }

  addOrder(order: Omit<Order, 'id'>): void {
    this.http.post<Order>('http://localhost:3000/order', order).subscribe()
  }

  updateOrder(updatedOrder: Order): void {
    this.http.put<Order>('http://localhost:3000/order', updatedOrder).subscribe()
  }

  deleteOrder(orderId: string): void {
    this.http.delete<ShoppingTour>(`http://localhost:3000/order/${orderId}`).subscribe()
  }
}

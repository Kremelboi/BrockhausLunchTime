import {Injectable, signal} from '@angular/core';
import {Order} from '../model/order-model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly storageKey = 'orders';
  private orders = signal<Order[]>(this.loadOrders());

  getOrdersByShoppingTourId(shoppingTourId: string): Order[] {
    return this.orders().filter(order => order.shoppingTourId === shoppingTourId);
  }

  addOrder(order: Omit<Order, 'id'>): void {
    const newOrder: Order = {
      ...order,
      amountPaid: order.paid ? order.price ? order.price : 0 : 0,
      id: crypto.randomUUID()
    };

    this.orders.update(orders => {
      const newOrders = [...orders, newOrder];
      localStorage.setItem(this.storageKey, JSON.stringify(newOrders));
      return newOrders;
    });
  }

  updateOrder(updatedOrder: Order): void {
    this.orders.update(orders => {
      const newOrders = orders.map(order =>
        order.id === updatedOrder.id ? updatedOrder : order
      );
      localStorage.setItem(this.storageKey, JSON.stringify(newOrders));
      return newOrders;
    });
  }

  deleteOrder(orderId: string): void {
    this.orders.update(orders => {
      const newOrders = orders.filter(order => order.id !== orderId);
      localStorage.setItem(this.storageKey, JSON.stringify(newOrders));
      return newOrders;
    });
  }

  deleteOrdersWithShoppingTourId(shoppingTourId: string): void {
    this.orders.update(orders => {
      const newOrders = orders.filter(order => order.shoppingTourId !== shoppingTourId);
      localStorage.setItem(this.storageKey, JSON.stringify(newOrders));
      return newOrders;
    })
  }

  private loadOrders() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }
}

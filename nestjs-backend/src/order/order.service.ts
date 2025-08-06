import {Injectable} from '@nestjs/common';
import * as path from 'node:path';
import * as process from 'node:process';
import {Order} from '../../../src/app/model/order-model';
import * as fs from 'node:fs';

@Injectable()
export class OrderService {
  private readonly filePath = path.join(process.cwd(), 'storedData/orders.json');

  getOrders(): Order[] {
    let orders: Order[] = [];

    if (fs.existsSync(this.filePath)) {
      const fileContent = fs.readFileSync(this.filePath, 'utf-8');
      try {
        orders = JSON.parse(fileContent);
        if (!Array.isArray(orders)) {
          console.error('Invalid JSON format');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
    return orders;
  }

  getOrdersByShoppingTourId(shoppingTourId: string): Order[] {
    return this.getOrders().filter(order => order.shoppingTourId === shoppingTourId);
  }

  addOrder(order: Order): Order {
    const orders: Order[] = this.getOrders() ?? [];

    const newOrder: Order = {
      ...order,
      id: crypto.randomUUID()
    }

    orders.push(newOrder)
    fs.writeFileSync(this.filePath, JSON.stringify(orders, null, 2));
    return newOrder
  }

  updateOrder(updatedOrder: Order): Order {
    const orders: Order[] = this.getOrders() ?? [];
    const updatedOrders = orders.map(order =>
      order.id === updatedOrder.id ? updatedOrder : order
    )
    fs.writeFileSync(this.filePath, JSON.stringify(updatedOrders, null, 2));
    return updatedOrder
  }

  deleteOrder(orderId: string): Order[] {
    const orders: Order[] = this.getOrders() ?? [];
    const newOrders = orders.filter(order => order.id !== orderId)
    fs.writeFileSync(this.filePath, JSON.stringify(newOrders, null, 2));
    return newOrders
  }

  deleteOrdersWithShoppingTourId(shoppingTourId: string): Order[] {
    const orders: Order[] = this.getOrders() ?? []
    const newOrders = orders.filter(order => order.shoppingTourId !== shoppingTourId)
    fs.writeFileSync(this.filePath, JSON.stringify(newOrders, null, 2));
    return newOrders
  }
}

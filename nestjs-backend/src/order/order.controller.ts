import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {OrderService} from './order.service';
import type {Order} from '../../../src/app/model/order-model';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }

  @Get(":shoppingTourId")
  getOrdersByShoppingTourId(@Param('shoppingTourId') shoppingTourId: string) {
    return this.orderService.getOrdersByShoppingTourId(shoppingTourId)
  }

  @Post()
  addOrder(@Body() order: Order): Order {
    return this.orderService.addOrder(order);
  }

  @Put()
  updateOrder(@Body() order: Order) {
    return this.orderService.updateOrder(order);
  }

  @Delete(":orderId")
  deleteOrder(@Param('orderId') orderId: string) {
    return this.orderService.deleteOrder(orderId);
  }

  @Delete(":shoppingTourId")
  deleteOrdersByShoppingTourId(@Param('shoppingTourID') shoppingTourId: string) {
    return this.orderService.deleteOrdersWithShoppingTourId(shoppingTourId)
  }
}

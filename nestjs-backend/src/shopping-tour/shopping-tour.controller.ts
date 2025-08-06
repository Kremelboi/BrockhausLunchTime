import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ShoppingTourService} from './shopping-tour.service';
import type {GroupedShoppingTours, ShoppingTour} from '../../../src/app/model/shoppingTour-model';

@Controller('shopping-tour')
export class ShoppingTourController {
  constructor(private readonly shoppingTourService: ShoppingTourService) {
  }

  @Get()
  getShoppingTours(): ShoppingTour[] {
    return this.shoppingTourService.getShoppingTours();
  }

  @Get("groupedByDay")
  getShoppingToursGroupedByDay(): GroupedShoppingTours {
    return this.shoppingTourService.getShoppingToursGroupedByDay();
  }

  @Get("payPalLink/:shoppingTourId")
  getPayPalLinkForShoppingTour(@Param('shoppingTourId') shoppingTourId: string): string {
    return this.shoppingTourService.getPayPalLinkForShoppingTour(shoppingTourId);
  }

  @Post()
  addShoppingTour(@Body() shoppingTour: ShoppingTour): ShoppingTour {
    return this.shoppingTourService.addShoppingTour(shoppingTour);
  }

  @Put()
  updateShoppingTour(@Body() shoppingTour: ShoppingTour): ShoppingTour {
    return this.shoppingTourService.updateShoppingTour(shoppingTour);
  }

  @Delete(":shoppingTourId")
  deleteShoppingTour(@Param('shoppingTourId') shoppingTourId: string): ShoppingTour[] {
    return this.shoppingTourService.deleteShoppingTour(shoppingTourId)
  }
}

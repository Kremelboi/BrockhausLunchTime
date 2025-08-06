import {Injectable} from '@nestjs/common';
import {DateString, GroupedShoppingTours, ShoppingTour} from '../../../src/app/model/shoppingTour-model';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as process from 'node:process';
import {OrderService} from '../order/order.service';

@Injectable()
export class ShoppingTourService {
  private readonly filePath = path.join(process.cwd(), '/storedData/shopping-tours.json');
  private readonly orderService = new OrderService();

  getShoppingTours(): ShoppingTour[] {
    let shoppingTours: ShoppingTour[] = [];

    if (fs.existsSync(this.filePath)) {
      const fileContent = fs.readFileSync(this.filePath, 'utf-8');
      try {
        shoppingTours = JSON.parse(fileContent);
        if (!Array.isArray(shoppingTours)) {
          console.error('Invalid JSON format');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
    return shoppingTours;
  }

  getPayPalLinkForShoppingTour(shoppingTourId: string): string {
    const shoppingTours: ShoppingTour[] = this.getShoppingTours();
    const shoppingTour = shoppingTours.find(shoppingTour => {
      return shoppingTour.id === shoppingTourId;
    })
    return shoppingTour ? shoppingTour.payPalLink : ''
  }

  getShoppingToursGroupedByDay(): GroupedShoppingTours {
    console.log("Service")
    const shoppingTours: ShoppingTour[] = this.getShoppingTours();
    console.log(shoppingTours)
    if (shoppingTours.length === 0) {
      return [];
    }
    const shoppingToursMap = shoppingTours.reduce((grouped, shoppingTour) => {
      const dayKey = new Intl.DateTimeFormat('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Europe/Berlin'
      })
        .format(new Date(shoppingTour.date))
        .split('.')
        .reverse()
        .join('-') as DateString;
      if (!grouped.has(dayKey)) {
        grouped.set(dayKey, []);
      }

      grouped.get(dayKey)!.push(shoppingTour);
      return grouped;
    }, new Map<DateString, ShoppingTour[]>());
    return Array.from(shoppingToursMap.entries())
      .map(([date, shoppingTours]) => ({
        date,
        shoppingTours: shoppingTours
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

  }

  addShoppingTour(shoppingTour: ShoppingTour): ShoppingTour {
    let shoppingTours: ShoppingTour[] = this.getShoppingTours() ?? [];

    const newShoppingTour: ShoppingTour = {
      ...shoppingTour,
      id: crypto.randomUUID()
    }

    shoppingTours.push(newShoppingTour);
    fs.writeFileSync(this.filePath, JSON.stringify(shoppingTours, null, 2));
    return newShoppingTour;
  }

  updateShoppingTour(updatedShoppingTour: ShoppingTour): ShoppingTour {
    let shoppingTours: ShoppingTour[] = this.getShoppingTours() ?? [];
    const updatedShoppingTours = shoppingTours.map(shoppingTour =>
      shoppingTour.id === updatedShoppingTour.id ? updatedShoppingTour : shoppingTour
    )
    fs.writeFileSync(this.filePath, JSON.stringify(updatedShoppingTours, null, 2));
    return updatedShoppingTour;
  }

  deleteShoppingTour(shoppingTourId: string): ShoppingTour[] {
    const shoppingTours: ShoppingTour[] = this.getShoppingTours() ?? [];
    this.orderService.deleteOrdersWithShoppingTourId(shoppingTourId);
    const newShoppingTours = shoppingTours.filter(shoppingTour => shoppingTour.id !== shoppingTourId)
    fs.writeFileSync(this.filePath, JSON.stringify(newShoppingTours, null, 2));
    return newShoppingTours
  }

}

import {inject, Injectable, signal} from '@angular/core';
import {OrderService} from './order-service';
import {DateString, GroupedShoppingTours, ShoppingTour} from '../model/shoppingTour-model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingTourService {
  private readonly storageKey = 'shoppingtours';
  private shoppingTours = signal<ShoppingTour[]>(this.loadShoppingTours());

  private orderService = inject(OrderService);

  private loadShoppingTours() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getShoppingToursGroupedByDay(): GroupedShoppingTours {
    const shoppingToursMap = this.shoppingTours().reduce((grouped, shoppingTour) => {
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

  getPayPalLinkForShoppingTour(shoppingTourId: string) {
    const shoppingTour = this.shoppingTours().find(shoppingTour => {
      return shoppingTour.id === shoppingTourId;
    })
    return shoppingTour?.payPalLink
  }

  addShoppingTour(shoppingTour: Omit<ShoppingTour, 'id'>): void {
    const newShoppingTour: ShoppingTour = {
      ...shoppingTour,
      id: crypto.randomUUID()
    };

    this.shoppingTours.update(shoppingTours => {
      const newShoppingTours = [...shoppingTours, newShoppingTour];
      localStorage.setItem(this.storageKey, JSON.stringify(newShoppingTours));
      return newShoppingTours;
    });
  }

  updateShoppingTour(updatedShoppingTour: ShoppingTour): void {
    this.shoppingTours.update(shoppingTours => {
      const newShoppingTours = shoppingTours.map(shoppingTour =>
        shoppingTour.id === updatedShoppingTour.id ? updatedShoppingTour : shoppingTour
      );
      localStorage.setItem(this.storageKey, JSON.stringify(newShoppingTours));
      return newShoppingTours;
    })
  }

  deleteShoppingTour(shoppingTourId: string): void {
    this.orderService.deleteOrdersWithShoppingTourId(shoppingTourId);
    this.shoppingTours.update(shoppingTours => {
      const newShoppingTours = shoppingTours.filter(shoppingTour => shoppingTour.id !== shoppingTourId);
      localStorage.setItem(this.storageKey, JSON.stringify(newShoppingTours));
      return newShoppingTours;
    })
  }
}

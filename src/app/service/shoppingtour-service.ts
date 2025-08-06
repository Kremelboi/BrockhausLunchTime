import {inject, Injectable} from '@angular/core';
import {GroupedShoppingTours, ShoppingTour} from '../model/shoppingTour-model';
import {HttpClient, httpResource, HttpResourceRef} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingTourService {
  http = inject(HttpClient);
  private readonly groupedToursResource: HttpResourceRef<GroupedShoppingTours | undefined>;

  constructor() {
    this.groupedToursResource = httpResource<GroupedShoppingTours>(() => ({
      url: 'http://localhost:3000/shopping-tour/groupedByDay',
      method: 'GET',
    }));
  }

  refreshGroupedTours() {
    this.groupedToursResource.reload()
  }

  getGroupedShoppingToursSignal() {
    return this.groupedToursResource.value;
  }

  getPayPalLinkForShoppingTour(shoppingTourId: string): Observable<string> {
    return this.http.get(
      `http://localhost:3000/shopping-tour/payPalLink/${shoppingTourId}`,
      {responseType: 'text' as const}
    );
  }

  addShoppingTour(shoppingTour: Omit<ShoppingTour, 'id'>): void {
    this.http.post<ShoppingTour>('http://localhost:3000/shopping-tour', shoppingTour).subscribe()
  }

  updateShoppingTour(updatedShoppingTour: ShoppingTour): void {
    this.http.put<ShoppingTour>('http://localhost:3000/shopping-tour', updatedShoppingTour).subscribe()
  }

  deleteShoppingTour(shoppingTourId: string): void {
    this.http.delete<ShoppingTour>(`http://localhost:3000/shopping-tour/${shoppingTourId}`).subscribe()
  }
}

export interface ShoppingTour {
  id: string;
  name: string;
  shopName: string;
  date: Date;
  payPalLink: string;
}

export type DateString = `${number}-${number}-${number}`;

export interface DailyShoppingTours {
  date: DateString;
  shoppingTours: ShoppingTour[];
}

export type GroupedShoppingTours = DailyShoppingTours[];

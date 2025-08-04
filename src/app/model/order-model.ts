export interface Order {
  id: string;
  name: string;
  description: string;
  shoppingTourId: string;
  price?: number;
  paid: boolean;
  amountPaid: number;
  wantsToJoin: boolean;
}

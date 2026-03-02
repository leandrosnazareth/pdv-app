export interface Sale {
  id?: number;
  date?: string;
  totalValue?: number;
  paymentId?: number;
  paymentName?: string;
  products?: any[];
  status?: string;
}

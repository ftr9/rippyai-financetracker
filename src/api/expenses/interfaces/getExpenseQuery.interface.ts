export interface IgetExpenseQuery {
  category?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
  userId: string;
}

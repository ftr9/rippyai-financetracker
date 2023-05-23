export interface IMonthlyPlanBody {
  id?: string;
  userId: string;
  income: number;
  savings: number;
  investment: number;
  expenseBudget: number;
  categories: string[];
}

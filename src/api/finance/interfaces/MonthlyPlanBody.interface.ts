export interface IMonthlyPlanBody {
  id?: string;
  user: string;
  income: number;
  savings: number;
  investment: number;
  expenseBudget: number;
  categories: string[];
}

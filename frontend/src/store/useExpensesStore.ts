import { create } from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';

interface IExpenseData {
  id: string;
  user: string;
  category: string;
  amount: number;
  expenseBudget: number;
  remainingExpense: number;
  createdAt: string;
}

interface IAddExpense {
  amount: number;
  category: string;
}

interface IExpenseStore {
  isFetchingExpense: boolean;
  expensesList: IExpenseData[];
  summarizedExpenses: ISummarizedCategory[];
  fetchExpenses: (
    category?: string,
    from?: string,
    to?: string,
    page?: number,
  ) => Promise<void>;
  addExpenses: (body: IAddExpense) => Promise<IExpenseData>;
  fetchSummarizedExpense: () => Promise<void>;
}

interface ISummarizedCategory {
  _sum: {
    amount: number;
  };
  category: string;
}

export const useExpensesStore = create<
  IExpenseStore,
  [['zustand/devtools', never]]
>(
  devtools((set) => ({
    isFetchingExpense: false,
    expensesList: [],
    summarizedExpenses: [],
    fetchExpenses: async (category, from, to, page) => {
      const urlSearchParams = new URLSearchParams();
      if (category) {
        urlSearchParams.append('category', category);
      }
      if (from) {
        urlSearchParams.append('from', from);
      }
      if (to) {
        urlSearchParams.append('to', to);
      }
      if (page) {
        urlSearchParams.append('page', `${page}`);
      }
      set((state) => ({ ...state, isFetchingExpense: true }));

      const expenses = await axios.get(
        `/api/v1/expenses?${urlSearchParams.toString()}`,
      );
      set((state) => ({ ...state, expensesList: expenses.data }));
      set((state) => ({ ...state, isFetchingExpense: false }));
    },
    addExpenses: async (body: IAddExpense) => {
      return (await axios.post('/api/v1/expenses', body)).data;
    },
    fetchSummarizedExpense: async () => {
      const summarizedCategories = await axios.get(
        '/api/v1/expenses/summarize',
      );

      set((state) => ({
        ...state,
        summarizedExpenses: summarizedCategories.data,
      }));
    },
  })),
);

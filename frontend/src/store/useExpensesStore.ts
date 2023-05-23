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

interface IExpenseStore {
  isFetchingExpense: boolean;
  fetchingExpenseErr: boolean;
  expensesList: IExpenseData[];
  fetchExpenseList: () => Promise<void>;
}

export const useExpensesStore = create<
  IExpenseStore,
  [['zustand/devtools', never]]
>(
  devtools((set) => ({
    isFetchingExpense: false,
    fetchingExpenseErr: false,
    expensesList: [],
    async fetchExpenseList() {
      //1) set Loading

      set((state) => ({ ...state, isFetchingExpense: true }));
      //2) fetch
      const expensesLists = await axios.get(`/api/v1`);
      console.log(expensesLists.data);
      //3) update
      set((state) => ({
        ...state,
        isFetchingExpense: false,
        expensesList: expensesLists.data,
      }));
    },
  })),
);

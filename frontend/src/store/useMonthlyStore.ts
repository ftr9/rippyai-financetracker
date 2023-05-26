import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import { devtools } from 'zustand/middleware';

interface IMonthlyPlan {
  id: string;
  income: number;
  savings: number;
  investment: number;
  remainingExpense: number;
  expenseBudget: number;
  categories: string[];
  createdAt: string;
  active: boolean;
}

interface IMonthlyPlanAdd {
  id?: string;
  income: number;
  savings: number;
  investment: number;
  expenseBudget: number;
  categories: string[];
}

interface IMonthlyStore {
  data: {
    hasActiveMonthlyPlan: boolean | null;
    payload: IMonthlyPlan | null;
  };
  fetchMonthlyPlan: () => Promise<void>;
  saveMonthlyPlan: (body: IMonthlyPlanAdd) => Promise<void>;
  updateMonthlyPlan: (body: IMonthlyPlanAdd) => Promise<void>;
  updateRemainingExpense: (amount: number) => void;
  resetMonthlyPlan: (body: IMonthlyPlanAdd) => Promise<void>;
  isFetchingMonthlyPlan: boolean;
}

export const useMonthlyStore = create<
  IMonthlyStore,
  [['zustand/devtools', never]]
>(
  devtools((set) => ({
    isFetchingMonthlyPlan: false,
    data: {
      hasActiveMonthlyPlan: null,
      payload: null,
    },
    saveMonthlyPlan: async (body: IMonthlyPlanAdd) => {
      await axios.post('/api/v1/finance/monthlyplan', {
        income: body.income,
        savings: body.savings,
        investment: body.investment,
        expenseBudget: body.expenseBudget,
        categories: body.categories,
      });
    },
    updateMonthlyPlan: async (body: IMonthlyPlanAdd) => {
      const updatedMonthlyPlan = await axios.put(
        '/api/v1/finance/monthlyplan',
        body,
      );

      set((state) => ({
        ...state,
        data: {
          payload: updatedMonthlyPlan.data,
          hasActiveMonthlyPlan: true,
        },
      }));
    },
    updateRemainingExpense: (amount: number) => {
      set((state) => {
        const newState = { ...state };
        if (newState.data.payload) {
          newState.data.payload.remainingExpense = amount;
        }
        return newState;
      });
    },
    resetMonthlyPlan: async (body: IMonthlyPlanAdd) => {
      const response = await axios.put('/api/v1/finance/reset', body);
      set((state) => ({
        ...state,
        data: { payload: response.data, hasActiveMonthlyPlan: true },
      }));
    },
    fetchMonthlyPlan: async () => {
      try {
        set((state) => ({ ...state, isFetchingMonthlyPlan: true }));
        const monthlyData = await axios.get('/api/v1/finance/monthlyplan');
        set((state) => ({
          ...state,
          data: { hasActiveMonthlyPlan: true, payload: monthlyData.data },
        }));
        set((state) => ({ ...state, isFetchingMonthlyPlan: false }));
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.data.error === 'Not Found') {
            set((state) => ({ ...state, isFetchingMonthlyPlan: false }));
            set((state) => ({
              ...state,
              data: { hasActiveMonthlyPlan: false, payload: null },
            }));
          }
        }
      }
    },
  })),
);

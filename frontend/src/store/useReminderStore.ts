import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface IReminderData {
  id: string;
  borrowerName: string;
  amount: number;
  purpose: string;
  dateValue: string[];
}

interface IReminderStore {
  isFetchingReminder: boolean;
  reminderData: IReminderData | null;
  fetchReminderData: () => Promise<void>;
  addReminderData: (body: Omit<IReminderData, 'id'>) => Promise<void>;
  updateReminderData: (body: IReminderData) => Promise<void>;
  deleteReminderData: (id: string) => Promise<void>;
}

export const useReminderStore = create<
  IReminderStore,
  [['zustand/devtools', never]]
>(
  devtools(
    (set) => ({
      isFetchingReminder: false,
      reminderData: null,
      fetchReminderData: async () => {
        set(
          (state) => ({ ...state, isFetchingReminder: true }),
          false,
          'reminder/fetchStart',
        );
        try {
          const reminderData = await axios.get('/api/v1/reminder');
          set(
            (state) => ({ ...state, reminderData: reminderData.data }),
            false,
            'reminder/add',
          );
          set(
            (state) => ({ ...state, isFetchingReminder: false }),
            false,
            'reminder/fetchStop',
          );
        } catch (err) {
          set(
            (state) => ({ ...state, reminderData: null }),
            false,
            'reminder/add',
          );
          set(
            (state) => ({ ...state, isFetchingReminder: false }),
            false,
            'reminder/fetchStop',
          );
        }
      },
      addReminderData: async (body: Omit<IReminderData, 'id'>) => {
        const response = await axios.post('/api/v1/reminder', body);
        set((state) => ({ ...state, reminderData: response.data }));
      },
      updateReminderData: async (body: IReminderData) => {
        const response = await axios.put('/api/v1/reminder', body);
        set((state) => ({ ...state, reminderData: response.data }));
      },
      deleteReminderData: async (id: string) => {
        const body = { id: id };
        await axios.delete('/api/v1/reminder', {
          data: body,
        });
        set((state) => ({ ...state, reminderData: null }));
      },
    }),
    { anonymousActionType: 'reminder' },
  ),
);

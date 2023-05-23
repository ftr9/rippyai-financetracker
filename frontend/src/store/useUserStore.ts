import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IUser {
  id: string;
  username: string;
  email: string;
}
interface IUserStore {
  isCheckingAuthStatus: boolean;
  user: IUser | null;
  signUp: (body: ISignInBody) => Promise<void>;
  signIn: (body: Omit<ISignInBody, 'username'>) => Promise<void>;
  logout: () => Promise<void>;
  checkIfAlreadyLogged: () => Promise<void>;
}

interface ISignInBody {
  username: string;
  password: string;
  email: string;
}

export const useUserStore = create<IUserStore, [['zustand/devtools', never]]>(
  devtools((set) => ({
    user: null,
    isCheckingAuthStatus: false,
    logout: async () => {
      await axios.post('/api/v1/auth/logout');
      set((state) => ({ ...state, user: null }));
    },
    signUp: async (body: ISignInBody) => {
      await axios.post('/api/v1/auth/register', body);
    },
    signIn: async (body: Omit<ISignInBody, 'username'>) => {
      const response = await axios.post('/api/v1/auth/login', body);
      if (response.data.status === 'success') {
        const user = await axios.get('/api/v1/auth/me');
        set((state) => ({ ...state, user: user.data }), false, {
          type: 'auth/signin',
          body,
        });
      } else {
        throw new Error('something went wrong !!! please try again');
      }
    },
    checkIfAlreadyLogged: async () => {
      set((state) => ({ ...state, isCheckingAuthStatus: true }));
      const response = await axios.get('/api/v1/auth/me');
      set((state) => ({
        ...state,
        user: response.data,
      }));
      set((state) => ({
        ...state,
        isCheckingAuthStatus: false,
      }));
    },
  })),
);

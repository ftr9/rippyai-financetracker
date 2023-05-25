export interface IEmailRemindedUsers {
  borrowerName: string;
  amount: number;
  purpose: string;
  user: {
    email: string;
    username: string;
  };
}

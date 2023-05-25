import { IEmailRemindedUsers } from '../../common/interfaces/interfaces';
export default (data: IEmailRemindedUsers) => {
  return `<html><head><style>table,tr,th,td{border:1px solid black;border-collapse:collapse;margin-bottom:10px;}table th,td{padding:10px;text-align:left;}</style></head><body><h1>Dear ${data.user.username}</h1><p>We hope this email finds you well. We wanted to remind you about the upcoming payment for your loan with ${data.user.email}. The details of the loan are as follows:</p><table><tr><th>Receiver</th><td>${data.borrowerName}</td></tr><tr><th>amount</th><td>${data.amount}</td></tr><tr><th>purpose</th><td>${data.purpose}</td></tr></table></html>`;
};

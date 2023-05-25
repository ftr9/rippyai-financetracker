import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { EmailService } from 'src/utils/email/Email.service';
import { IEmailRemindedUsers } from 'src/common/interfaces/interfaces';
import getLoanReminderMailBody from 'src/utils/email/getLoanReminderMailBody';

@Injectable()
export class LoanReminderTask {
  private readonly logger = new Logger(LoanReminderTask.name);
  constructor(private readonly prismaService: PrismaService) {}
  /***
   * run this cron job every day and check if any one has loan reminder
   */
  @Cron('0 0 * * *')
  async sendEmailReminder() {
    const todaysDate = new Date().toLocaleDateString();

    const emailRemindedUsers: IEmailRemindedUsers[] =
      await this.prismaService.reminder.findMany({
        where: {
          dateValue: {
            has: todaysDate,
          },
        },
        select: {
          id: false,
          borrowerName: true,
          amount: true,
          purpose: true,
          dateValue: false,
          userId: false,
          user: {
            select: {
              email: true,
              password: false,
              username: true,
            },
          },
        },
      });
    try {
      await Promise.allSettled(
        emailRemindedUsers.map((reminderData: IEmailRemindedUsers) => {
          const emailService = new EmailService(
            reminderData.user.email,
            reminderData.user.username,
            'Loan Payment Alert !!!',
            getLoanReminderMailBody(reminderData),
          );
          return emailService.sendMail();
        }),
      );
    } catch (err) {
      this.logger.error('MAIL ERROR');
    }
  }
}

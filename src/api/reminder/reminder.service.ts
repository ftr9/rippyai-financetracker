import { Injectable, NotFoundException } from '@nestjs/common';
import { IAddReminder } from './interfaces/addReminder.interface';
import { ISetReminder } from './interfaces/setReminder.interface';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class ReminderService {
  constructor(private readonly prismaService: PrismaService) {}
  async getEmailReminder(userId: string) {
    const createdEmailReminder = await this.prismaService.reminder.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!createdEmailReminder) {
      throw new NotFoundException('you dont have created email reminder');
    }
    return createdEmailReminder;
  }

  async addEmailReminder(body: IAddReminder, userId: string) {
    return await this.prismaService.reminder.create({
      data: {
        ...body,
        userId: userId,
      },
    });
    //await this.prismaService.reminder.create({...body,use});
  }

  async updateEmailReminder(body: ISetReminder, userId: string) {
    return await this.prismaService.reminder.update({
      where: {
        userId: userId,
      },
      data: {
        borrowerName: body.borrowerName,
        amount: body.amount,
        purpose: body.purpose,
        dateValue: body.dateValue,
      },
    });
  }
  async deleteEmailReminder(emailReminderId: string) {
    return this.prismaService.reminder.delete({
      where: {
        id: emailReminderId,
      },
    });
  }
}

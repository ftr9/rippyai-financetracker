import { Controller, Get, Put, Delete } from '@nestjs/common';
import { Body, Post, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/common/guards/Auth.guard';
import { addReminderDto } from './dtos/addReminder.dto';
import { setReminderDto } from './dtos/setReminder.dto';
import { ReminderService } from './reminder.service';
import { DUser } from '../../common/decorators/User.decorator';
import { User } from '@prisma/client';
import { deleteReminderDto } from './dtos/deleteReminder.dto';

@UseGuards(AuthGuard)
@Controller('reminder')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}
  @Get('')
  getEmailReminder(@DUser() user: User) {
    return this.reminderService.getEmailReminder(user.id);
  }
  @Post('')
  addEmailReminder(@Body() body: addReminderDto, @DUser() user: User) {
    return this.reminderService.addEmailReminder(body, user.id);
  }

  @Put('')
  updateEmailReminder(@Body() body: setReminderDto, @DUser() user: User) {
    return this.reminderService.updateEmailReminder(body, user.id);
  }
  @Delete('')
  deleteEmailReminder(@Body() body: deleteReminderDto) {
    return this.reminderService.deleteEmailReminder(body.id);
  }
}

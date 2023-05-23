import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return [
      {
        name: 'rahul dotel',
        age: 20,
        college: 'Asian college of higher studies',
      },
      {
        name: 'rahul dotel',
        age: 20,
        college: 'Asian college of higher studies',
      },
      {
        name: 'rahul dotel',
        age: 20,
        college: 'Asian college of higher studies',
      },
    ];
  }
}

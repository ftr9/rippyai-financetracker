import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import checkAuth from 'middleware/checkAuth';

@Module({
  imports: [PrismaModule],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(checkAuth).forRoutes('expenses');
  }
}

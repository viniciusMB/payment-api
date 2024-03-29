import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { PayableModule } from '../payable/payable.module';
import { ApplyBusinessRules } from '../payable/helpers/payable.helper';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity]), PayableModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, ApplyBusinessRules],
})
export class TransactionsModule {}

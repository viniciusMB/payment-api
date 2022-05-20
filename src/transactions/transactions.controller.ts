import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionEntity } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransformTransaction } from './helpers/transaction.helper';
import { ApplyBusinessRules } from 'src/payable/helpers/payable.helper';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';
import { PayableService } from 'src/payable/payable.service';

@UseInterceptors(CacheInterceptor)
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly payableService: PayableService,
    private readonly payableRules: ApplyBusinessRules,
  ) {}

  @Post('createPayable')
  async createPayable(@Body() transaction: CreateTransactionDto) {
    const createTransactionDto = TransformTransaction(transaction);
    const transactionData = await this.transactionsService.create(
      createTransactionDto,
    );
    const payable: CreatePayableDto = await this.payableRules.feeAndPaymentDate(
      transactionData,
    );
    return this.payableService.create(payable);
  }

  @Get()
  findAll(): Promise<TransactionEntity[]> {
    return this.transactionsService.findAll();
  }

  @Get(':transactionId')
  findOne(
    @Param('transactionId') transactionId: string,
  ): Promise<TransactionEntity> {
    return this.transactionsService.findOne(+transactionId);
  }

  @Get('customerId/:customerId')
  findByCustomerId(
    @Param('customerId') customerId: string,
  ): Promise<TransactionEntity[]> {
    return this.transactionsService.findByCustomerId(customerId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}

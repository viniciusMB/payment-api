import {
  Controller,
  Get,
  Param,
  Delete,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { PayableService } from './payable.service';

@UseInterceptors(CacheInterceptor)
@Controller('payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Get()
  findAll() {
    return this.payableService.findAll();
  }

  @Get(':payableId')
  findOne(@Param('payableId') payableId: string) {
    return this.payableService.findOne(+payableId);
  }

  @Get('customerId/:customerId')
  findByCustomerId(@Param('customerId') customerId: string) {
    return this.payableService.findByCustomerId(customerId);
  }

  @Get('balance/:status')
  async getBalanceByStatus(@Param('status') payableStatus: string) {
    const payables = await this.payableService.getPayableByStatus(
      payableStatus,
    );

    let totalValue = 0;
    for (const payable of payables) {
      totalValue += payable.value;
    }

    return totalValue;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payableService.remove(+id);
  }
}

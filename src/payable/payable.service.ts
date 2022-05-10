import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PayableEntity } from './entities/payable.entity';

@Injectable()
export class PayableService {
  constructor(
    @InjectRepository(PayableEntity)
    private PayableRepository: Repository<PayableEntity>,
  ) {}

  async create(createPayableDto: CreatePayableDto) {
    const payable = this.PayableRepository.create(createPayableDto);
    this.PayableRepository.save(payable);

    return payable;
  }

  async findAll() {
    return this.PayableRepository.find();
  }

  async findOne(payableId: number) {
    return this.PayableRepository.findOne(payableId);
  }

  async findByCustomerId(customerId: string) {
    return this.PayableRepository.find({ where: { customerId } });
  }

  async getPayableByStatus(status: string) {
    return this.PayableRepository.find({ where: { status } });
  }

  update(payableId: number, updatePayableDto: UpdatePayableDto) {
    return this.PayableRepository.update({ payableId }, updatePayableDto);
  }

  remove(payableId: number) {
    return this.PayableRepository.delete({ payableId });
  }
}

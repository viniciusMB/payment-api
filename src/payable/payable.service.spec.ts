import { Test, TestingModule } from '@nestjs/testing';
import { PayableEntity } from './entities/payable.entity';
import { PayableService } from './payable.service';
import { payableEntityMock } from './mocks/payable.entity.mock';
import { CreatePayableDto } from './dto/create-payable.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const payableEntityList: PayableEntity[] = [
  payableEntityMock,
  payableEntityMock,
  payableEntityMock,
];

describe('PayableService', () => {
  let payableService: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableService],
      imports: [Repository],
      providers: [
        PayableService,
        {
          provide: getRepositoryToken(PayableEntity),
          useValue: {
            create: jest.fn().mockResolvedValue(payableEntityMock),
            findall: jest.fn().mockResolvedValue(payableEntityList),
            findOne: jest.fn().mockResolvedValue(payableEntityMock),
            findByCustomerId: jest.fn().mockResolvedValue(payableEntityMock),
            getPayableByStatus: jest.fn().mockResolvedValue(payableEntityMock),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    payableService = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(payableService).toBeDefined();
  });

  describe('create', () => {
    it('Should create a payable and return it', async () => {
      const createPayableDto: CreatePayableDto = {
        value: 1,
        status: 'paid',
        customerId: '1',
        paymentDate: payableEntityMock.paymentDate,
      };

      const result = await payableService.create(createPayableDto);

      expect(payableService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(payableEntityMock);

      expect(result.value).toEqual(createPayableDto.value);
      expect(result.status).toEqual(createPayableDto.status);
      expect(result.customerId).toEqual(createPayableDto.customerId);
      expect(result.paymentDate).toEqual(createPayableDto.paymentDate);
    });

    it('Should throw an exception', () => {
      const createPayableDto: CreatePayableDto = {
        value: 1,
        status: 'paid',
        customerId: '1',
        paymentDate: payableEntityMock.paymentDate,
      };

      jest.spyOn(payableService, 'create').mockRejectedValueOnce(new Error());

      expect(payableService.create(createPayableDto)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('Should return all payables', async () => {
      const result = await payableService.findAll();
      expect(payableService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(payableEntityList);
    });

    it('Shoul throw an exception', () => {
      jest.spyOn(payableService, 'findAll').mockRejectedValueOnce(new Error());
      expect(payableService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('Should return a payble with same Id', async () => {
      const payableId = '1';
      const result = await payableService.findOne(+payableId);

      expect(result).toEqual(payableEntityMock);
      expect(result.payableId).toEqual(payableId);
      expect(payableService.findOne).toHaveBeenCalledTimes(1);
      expect(payableService.findOne).toHaveBeenCalledWith(payableId);
    });

    it('Should throw an exception', () => {
      const payableId = '1';
      jest.spyOn(payableService, 'findOne').mockRejectedValueOnce(new Error());

      expect(payableService.findOne(+payableId)).rejects.toThrowError();
    });
  });

  describe('findByCustomerId', () => {
    it(`Should return all customer's payables`, async () => {
      const customerId = '1';
      const result = await payableService.findByCustomerId(customerId);

      expect(result).toEqual(payableEntityList);

      expect(
        result.filter((payable) => payable.customerId !== customerId),
      ).toHaveLength(0);

      expect(payableService.findByCustomerId).toHaveBeenCalledTimes(1);
      expect(payableService.findByCustomerId).toBeCalledWith(customerId);
    });

    it('Should throw an exception', () => {
      const customerId = '1';

      jest
        .spyOn(payableService, 'findByCustomerId')
        .mockRejectedValueOnce(new Error());

      expect(
        payableService.findByCustomerId(customerId),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('Should return payableId', async () => {
      const payableId = '1';
      const result = await payableService.remove(+payableId);

      expect(result).toEqual(Number(payableId));
      expect(payableService.remove).toHaveBeenCalledTimes(1);
      expect(payableService.remove).toHaveBeenCalledWith(payableId);
    });

    it('Should throw an exception', () => {
      const payableId = '1';
      jest.spyOn(payableService, 'remove').mockRejectedValueOnce(new Error());

      expect(payableService.remove(+payableId)).rejects.toThrowError();
    });
  });
});

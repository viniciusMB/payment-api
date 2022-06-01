import { Test, TestingModule } from '@nestjs/testing';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { transactionEntityMock } from './mocks/transactions.entity.mock';
import { createTransactionDtoMock } from './mocks/transactions.create.dto.mock';

const transactionsEntityList: TransactionEntity[] = [
  transactionEntityMock,
  transactionEntityMock,
  transactionEntityMock,
];

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsService],
      providers: [
        {
          provide: TransactionsService,
          useValue: {
            create: jest.fn().mockResolvedValue(transactionEntityMock),
            findAll: jest.fn().mockResolvedValue(transactionsEntityList),
            findByCustomerId: jest
              .fn()
              .mockResolvedValue(transactionsEntityList),
            findOne: jest.fn().mockResolvedValue(transactionEntityMock),
            remove: jest.fn().mockResolvedValue('1'),
          },
        },
      ],
    }).compile();

    transactionsService = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(transactionsService).toBeDefined();
  });
  // a
  describe('create', () => {
    it('Should create a trasanction and return it', async () => {
      const result = await transactionsService.create(createTransactionDtoMock);

      expect(transactionsService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(transactionEntityMock);
    });

    it('Should throw an exception', () => {
      jest
        .spyOn(transactionsService, 'create')
        .mockRejectedValueOnce(new Error());
    });

    expect(
      transactionsService.create(createTransactionDtoMock),
    ).rejects.toThrowError();
  });

  describe('findAll', () => {
    it('Should return all transactions', async () => {
      const result = await transactionsService.findAll();

      expect(transactionsService.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(transactionsEntityList);
    });

    it('Should throw an exception', () => {
      jest
        .spyOn(transactionsService, 'findAll')
        .mockRejectedValueOnce(new Error());

      expect(transactionsService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('Should return a transaction with same Id', async () => {
      const transactionId = 1;
      const result = await transactionsService.findOne(transactionId);
      expect(result.transactionId).toEqual(transactionId);
      expect(transactionsService.findOne).toHaveBeenCalledTimes(1);
      expect(transactionsService).toHaveBeenCalledWith(transactionId);
    });

    it('Should throw an exception', () => {
      const transactionId = 1;

      jest
        .spyOn(transactionsService, 'findOne')
        .mockRejectedValueOnce(new Error());

      expect(transactionsService.findOne(transactionId)).rejects.toThrowError();
    });
  });

  describe('findByCustomerId', () => {
    it(`Should return all customer's transactions`, async () => {
      const customerId = '1';
      const result = await transactionsService.findByCustomerId(customerId);
      expect(
        result.filter((transaction) => transaction.customerId !== customerId),
      ).toHaveLength(0);

      expect(transactionsService.findByCustomerId).toHaveBeenCalledTimes(1);
      expect(transactionsService.findByCustomerId).toHaveBeenCalledWith(
        customerId,
      );
    });

    it('Should throw an exception', () => {
      const customerId = '1';

      jest
        .spyOn(transactionsService, 'findByCustomerId')
        .mockRejectedValueOnce(new Error());

      expect(
        transactionsService.findByCustomerId(customerId),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('Should return transactionId', async () => {
      const transactionId = 1;
      const result = await transactionsService.remove(transactionId);
      expect(result).toEqual(transactionId);
      expect(transactionsService.remove).toHaveBeenCalledTimes(1);
      expect(transactionsService.remove).toHaveBeenCalledWith(transactionId);
    });

    it('Should throw an exception', () => {
      const transactionId = '1';
      jest
        .spyOn(transactionsService, 'remove')
        .mockRejectedValueOnce(new Error());

      expect(transactionsService.remove(+transactionId)).rejects.toThrowError();
    });
  });
});

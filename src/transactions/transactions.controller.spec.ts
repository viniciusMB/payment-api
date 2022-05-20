import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { transactionEntityMock } from './mocks/transactions.entity.mock';
import { createTransactionDtoMock } from './mocks/transactions.create.dto.mock';
import { TransformTransaction } from './helpers/transaction.helper';

const transactionsEntityList: TransactionEntity[] = [
  transactionEntityMock,
  transactionEntityMock,
  transactionEntityMock,
];

describe('TransactionsController', () => {
  let transactionsController: TransactionsController;
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: {
            createPayable: jest.fn().mockResolvedValue(transactionEntityMock),
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

    transactionsController = module.get<TransactionsController>(
      TransactionsController,
    );
    transactionsService = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(transactionsController).toBeDefined();
    expect(transactionsService).toBeDefined();
  });

  describe('create', () => {
    it('Should return a transaction entity', async () => {
      const transaction = TransformTransaction(createTransactionDtoMock);

      expect(transaction.cardNumber).toHaveLength(4);
      expect(transaction.creationDate).toBe(Date);
      expect(transaction.cardExpirationDate).toBe(Date);

      const result = await transactionsController.createPayable(transaction);

      expect(transactionsController.createPayable).toHaveBeenCalledTimes(1);
      expect(result).toEqual(transactionEntityMock);
    });

    it('Should throw an exception', () => {
      const transaction = TransformTransaction(createTransactionDtoMock);

      jest
        .spyOn(transactionsService, 'create')
        .mockRejectedValueOnce(new Error());

      expect(
        transactionsController.createPayable(transaction),
      ).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('Should return all transactions', async () => {
      const result = await transactionsController.findAll();

      expect(transactionsController.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(transactionsEntityList);
    });

    it('Should throw an exception', () => {
      jest
        .spyOn(transactionsService, 'findAll')
        .mockRejectedValueOnce(new Error());

      expect(transactionsController.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('Should return a transaction with same Id', async () => {
      const transactionId = '1';
      const result = await transactionsController.findOne(transactionId);
      expect(result.transactionId).toEqual(transactionId);
      expect(transactionsController.findOne).toHaveBeenCalledTimes(1);
      expect(transactionsController).toHaveBeenCalledWith(transactionId);
    });

    it('Should throw an exception', () => {
      const transactionId = '1';

      jest
        .spyOn(transactionsService, 'findOne')
        .mockRejectedValueOnce(new Error());

      expect(
        transactionsController.findOne(transactionId),
      ).rejects.toThrowError();
    });
  });

  describe('findByCustomerId', () => {
    it(`Should return all customer's transactions`, async () => {
      const customerId = '1';
      const result = await transactionsController.findByCustomerId(customerId);
      expect(
        result.filter((transaction) => transaction.customerId !== customerId),
      ).toHaveLength(0);

      expect(transactionsController.findByCustomerId).toHaveBeenCalledTimes(1);
      expect(transactionsController.findByCustomerId).toHaveBeenCalledWith(
        customerId,
      );
    });

    it('Should throw an exception', () => {
      const customerId = '1';

      jest
        .spyOn(transactionsService, 'findByCustomerId')
        .mockRejectedValueOnce(new Error());

      expect(
        transactionsController.findByCustomerId(customerId),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('Should return transactionId', async () => {
      const transactionId = '1';
      const result = await transactionsController.remove(transactionId);
      expect(result).toEqual(transactionId);
      expect(transactionsController.remove).toHaveBeenCalledTimes(1);
      expect(transactionsController.remove).toHaveBeenCalledWith(transactionId);
    });

    it('Should throw an exception', () => {
      const transactionId = '1';
      jest
        .spyOn(transactionsService, 'remove')
        .mockRejectedValueOnce(new Error());

      expect(
        transactionsController.remove(transactionId),
      ).rejects.toThrowError();
    });
  });
});

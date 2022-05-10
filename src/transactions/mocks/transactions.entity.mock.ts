import { TransactionEntity } from '../entities/transaction.entity';
import { parseJSON, add } from 'date-fns';
export const transactionEntityMock = new TransactionEntity({
  transactionId: 1,
  value: 150,
  description: 'Pipoca Doce',
  paymentMethod: 'credit_card',
  cardNumber: '1234',
  cardOwnerName: 'Vinicius',
  customerId: '1',
  cardExpirationDate: add(parseJSON(Date.now()), { years: 5 }),
  creationDate: parseJSON(Date.now()),
  cardVerificationCode: '027',
});

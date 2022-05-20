import { parseJSON, add } from 'date-fns';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

export const createTransactionDtoMock: CreateTransactionDto = {
  value: 150,
  description: 'Pipoca Doce',
  paymentMethod: 'credit_card',
  cardNumber: '1234',
  cardOwnerName: 'Vinicius',
  cardExpirationDate: add(parseJSON(Date.now()), { years: 5 }),
  creationDate: parseJSON(Date.now()),
  cardVerificationCode: '027',
};

import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { parseJSON } from 'date-fns';
import { HttpException, HttpStatus } from '@nestjs/common';
export function TransformTransaction(transaction: CreateTransactionDto) {
  try {
    const transactionFormated: CreateTransactionDto = transaction;
    const { cardNumber, cardExpirationDate, creationDate } = transaction;

    transactionFormated.cardNumber = cardNumber.substring(
      cardNumber.length - 4,
    );
    transactionFormated.cardExpirationDate = parseJSON(cardExpirationDate);
    transactionFormated.creationDate = parseJSON(creationDate);
    return transactionFormated;
  } catch (error) {
    throw new HttpException(
      'Error parsing transaction',
      HttpStatus.BAD_REQUEST,
    );
  }
}

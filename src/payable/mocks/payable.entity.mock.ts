import { parseJSON } from 'date-fns';
import { PayableEntity } from '../entities/payable.entity';

export const payableEntityMock = new PayableEntity({
  value: 1,
  status: 'paid',
  customerId: '1',
  paymentDate: parseJSON(Date.now()),
  payableId: 1,
});

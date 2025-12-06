import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import type { Transaction } from '@/api';

import { useUpdateTransaction } from '../../queries';
import {
  TransactionForm,
  type TransactionFormSchema,
} from '../TransactionForm';

import { getUpdateTransactionPayload } from './utils';

interface EditTransactionFormProps {
  transaction: Transaction;
}

export const EditTransactionForm = ({
  transaction,
}: EditTransactionFormProps): JSX.Element => {
  const { isPendingUpdateTransaction, updateTransaction } =
    useUpdateTransaction();

  const onSubmit: SubmitHandler<TransactionFormSchema> = (data) => {
    const payload = getUpdateTransactionPayload(data);
    updateTransaction({ data: payload, id: transaction._id });
  };

  return (
    <TransactionForm
      description="Update the details for the transaction."
      isPending={isPendingUpdateTransaction}
      onSubmit={onSubmit}
      submitButtonText="Update Transaction"
      title="Transaction Details"
      transaction={transaction}
    />
  );
};

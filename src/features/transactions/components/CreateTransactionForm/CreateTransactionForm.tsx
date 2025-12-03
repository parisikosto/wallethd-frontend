import type { JSX } from 'react';
import { type SubmitHandler } from 'react-hook-form';

import { useCreateTransaction } from '../../queries';
import {
  TransactionForm,
  type TransactionFormSchema,
} from '../TransactionForm';

import { getCreateTransactionPayload } from './utils';

export const CreateTransactionForm = (): JSX.Element => {
  const { createTransaction, isPendingCreateTransaction } =
    useCreateTransaction();

  const onSubmit: SubmitHandler<TransactionFormSchema> = (data) => {
    const payload = getCreateTransactionPayload(data);
    createTransaction(payload);
  };

  return (
    <TransactionForm
      description="Fill in the details to create a new transaction."
      isPending={isPendingCreateTransaction}
      onSubmit={onSubmit}
      submitButtonText="Create Transaction"
      title="Transaction Details"
    />
  );
};

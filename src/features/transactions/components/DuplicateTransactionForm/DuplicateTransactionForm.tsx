import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import type { Transaction } from '@/api';

import { useCreateTransaction } from '../../queries';
import { getCreateTransactionPayload } from '../CreateTransactionForm';
import {
  generateDuplicateDefaultValues,
  TransactionForm,
  type TransactionFormSchema,
} from '../TransactionForm';

interface DuplicateTransactionFormProps {
  transaction: Transaction;
}

export const DuplicateTransactionForm = ({
  transaction,
}: DuplicateTransactionFormProps): JSX.Element => {
  const { createTransaction, isPendingCreateTransaction } =
    useCreateTransaction();

  const onSubmit: SubmitHandler<TransactionFormSchema> = (data) => {
    const payload = getCreateTransactionPayload(data);
    createTransaction(payload);
  };

  return (
    <TransactionForm
      description="Review and update the details before saving the duplicate."
      initialValues={generateDuplicateDefaultValues(transaction)}
      isPending={isPendingCreateTransaction}
      onSubmit={onSubmit}
      submitButtonText="Create Transaction"
      title="Transaction Details"
    />
  );
};

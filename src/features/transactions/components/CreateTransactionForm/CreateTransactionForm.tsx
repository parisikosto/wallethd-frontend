import { type JSX, useMemo } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { useCreateTransaction } from '../../queries';
import {
  TransactionForm,
  type TransactionFormSchema,
} from '../TransactionForm';

import {
  getCreateTransactionInitialValuesFromSearchParams,
  getCreateTransactionPayload,
} from './utils';

export const CreateTransactionForm = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const { createTransaction, isPendingCreateTransaction } =
    useCreateTransaction();

  const initialValues = useMemo(
    () => getCreateTransactionInitialValuesFromSearchParams(searchParams),
    [searchParams],
  );

  const onSubmit: SubmitHandler<TransactionFormSchema> = (data) => {
    const payload = getCreateTransactionPayload(data);
    createTransaction(payload);
  };

  return (
    <TransactionForm
      description="Fill in the details to create a new transaction."
      initialValues={initialValues}
      isPending={isPendingCreateTransaction}
      onSubmit={onSubmit}
      submitButtonText="Create Transaction"
      title="Transaction Details"
    />
  );
};

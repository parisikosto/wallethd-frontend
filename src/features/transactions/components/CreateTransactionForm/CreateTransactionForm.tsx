import { type JSX, useMemo, useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { Checkbox, Field, FieldLabel } from '@/ui';

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
  const [createAnother, setCreateAnother] = useState(false);
  const { createTransaction, isPendingCreateTransaction } =
    useCreateTransaction();

  const initialValues = useMemo(
    () => getCreateTransactionInitialValuesFromSearchParams(searchParams),
    [searchParams],
  );

  const onSubmit: SubmitHandler<TransactionFormSchema> = (data) => {
    const payload = getCreateTransactionPayload(data);
    createTransaction(payload, {
      skipNavigation: createAnother,
      onSuccess: () => {
        if (createAnother) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
    });
  };

  return (
    <TransactionForm
      description="Fill in the details to create a new transaction."
      initialValues={initialValues}
      isPending={isPendingCreateTransaction}
      onSubmit={onSubmit}
      submitButtonText="Create Transaction"
      title="Transaction Details"
      websiteColumnFooter={
        <Field>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={createAnother}
              disabled={isPendingCreateTransaction}
              id="create-another"
              onCheckedChange={(checked) => setCreateAnother(checked === true)}
            />
            <FieldLabel className="cursor-pointer" htmlFor="create-another">
              Create another one
            </FieldLabel>
          </div>
        </Field>
      }
    />
  );
};

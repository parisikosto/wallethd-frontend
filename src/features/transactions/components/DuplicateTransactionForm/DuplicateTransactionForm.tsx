import { type JSX, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import type { Transaction } from '@/api';
import { Checkbox, Field, FieldLabel } from '@/ui';

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
  const [createAnother, setCreateAnother] = useState(false);
  const { createTransaction, isPendingCreateTransaction } =
    useCreateTransaction();

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
      description="Review and update the details before saving the duplicate."
      initialValues={generateDuplicateDefaultValues(transaction)}
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

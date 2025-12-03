import type { JSX } from 'react';
import { useParams } from 'react-router-dom';

import { EditTransactionForm, useTransaction } from '@/features';
import { Spinner } from '@/ui';

export const EditTransactionPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  const { isErrorTransaction, isFetchingTransaction, transaction } =
    useTransaction(id || '');

  if (isFetchingTransaction) {
    return (
      <div className="container max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Spinner />
        </div>
      </div>
    );
  }

  if (isErrorTransaction || !transaction) {
    return (
      <div className="container max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Edit Transaction
            </h1>
            <p className="text-muted-foreground mt-2">
              Transaction not found or failed to load.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Edit Transaction
          </h1>
          <p className="text-muted-foreground mt-2">
            Update the details of your transaction.
          </p>
        </div>
        <EditTransactionForm />
      </div>
    </div>
  );
};

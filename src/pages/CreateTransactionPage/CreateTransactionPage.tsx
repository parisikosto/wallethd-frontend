import type { JSX } from 'react';

import { CreateTransactionForm } from '@/features';

export const CreateTransactionPage = (): JSX.Element => {
  return (
    <div className="container max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create Transaction
          </h1>
          <p className="text-muted-foreground mt-2">
            Add a new transaction to your account.
          </p>
        </div>
        <CreateTransactionForm />
      </div>
    </div>
  );
};

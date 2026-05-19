import type { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button, Field, FieldError, FieldLabel } from '@/ui';

import { useAccounts } from '../../../../../accounts';
import { FormFieldKey } from '../../constants';
import type { TransactionFormSchema } from '../../TransactionForm';
import { AccountCard } from '../AccountCard';

import { getAccountIcon, getAccountStyle } from './utils';

export const AccountField = (): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TransactionFormSchema>();

  const {
    accounts = [],
    isErrorAccounts,
    isFetchingAccounts,
    refetchAccounts,
  } = useAccounts();

  if (isFetchingAccounts) {
    return (
      <Field>
        <FieldLabel htmlFor={FormFieldKey.Account}>Account</FieldLabel>
        <div className="text-sm text-muted-foreground">Loading accounts...</div>
      </Field>
    );
  }

  if (isErrorAccounts) {
    return (
      <Field>
        <FieldLabel htmlFor={FormFieldKey.Account}>Account</FieldLabel>
        <FieldError>
          Failed to fetch accounts{' '}
          <Button onClick={() => refetchAccounts()} type="button">
            Retry
          </Button>
        </FieldError>
      </Field>
    );
  }

  const filteredAccounts = accounts.filter(
    (account) => account.isArchived !== true,
  );

  if (filteredAccounts.length === 0) {
    return (
      <Field>
        <FieldLabel htmlFor={FormFieldKey.Account}>Account</FieldLabel>
        <div className="text-sm text-muted-foreground">
          No accounts available.
        </div>
      </Field>
    );
  }

  return (
    <Field>
      <FieldLabel htmlFor={FormFieldKey.Account}>Account</FieldLabel>
      <Controller
        control={control}
        name={FormFieldKey.Account}
        render={({ field }) => (
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            }}
          >
            {filteredAccounts.map((account) => {
              const isSelected = field.value === account._id;
              const Icon = getAccountIcon(account.name);
              const accountStyle = getAccountStyle(account.name);

              return (
                <AccountCard
                  key={account._id}
                  Icon={Icon}
                  account={account}
                  accountStyle={accountStyle}
                  isSelected={isSelected}
                  onSelect={() => field.onChange(account._id)}
                />
              );
            })}
          </div>
        )}
      />
      {errors[FormFieldKey.Account]?.message && (
        <FieldError>{errors[FormFieldKey.Account]?.message}</FieldError>
      )}
    </Field>
  );
};

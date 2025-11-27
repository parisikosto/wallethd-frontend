import type { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui';

import { useAccounts } from '../../../../../accounts';
import type { CreateTransactionFormSchema } from '../../CreateTransactionForm';
import { FormFieldKey } from '../../interfaces';

export const AccountField = (): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateTransactionFormSchema>();

  const { accounts = [], isErrorAccounts, refetchAccounts } = useAccounts();

  const disabled = accounts.length === 0;

  return (
    <Field>
      <FieldLabel htmlFor={FormFieldKey.Account}>Account</FieldLabel>
      <Controller
        control={control}
        name={FormFieldKey.Account}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts
                .filter((account) => !account.isArchived)
                .map((account) => (
                  <SelectItem key={account._id} value={account._id}>
                    {account.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors[FormFieldKey.Account]?.message && (
        <FieldError>{errors[FormFieldKey.Account].message}</FieldError>
      )}
      {isErrorAccounts && (
        <FieldError>
          Failed to fetch accounts{' '}
          <Button onClick={() => refetchAccounts()} type="button">
            Retry
          </Button>
        </FieldError>
      )}
    </Field>
  );
};

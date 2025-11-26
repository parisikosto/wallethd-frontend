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

import { useCategories } from '../../../../../categories';
import type { CreateTransactionFormSchemaType } from '../../CreateTransactionForm';

export const CategoryField = (): JSX.Element => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<CreateTransactionFormSchemaType>();

  const type = watch('type');

  const {
    categories = [],
    isErrorCategories,
    refetchCategories,
  } = useCategories();

  const filteredCategories = categories.filter(
    ({ transactionType }) => transactionType === type,
  );

  const disabled = filteredCategories.length === 0;

  return (
    <Field>
      <FieldLabel htmlFor="category">Category *</FieldLabel>
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {filteredCategories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.parent
                    ? `${category.parent.name} > ${category.name}`
                    : category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.category?.message && (
        <FieldError>{errors.category.message}</FieldError>
      )}
      {isErrorCategories && (
        <FieldError>
          Failed to fetch categories{' '}
          <Button onClick={() => refetchCategories()} type="button">
            Retry
          </Button>
        </FieldError>
      )}
    </Field>
  );
};

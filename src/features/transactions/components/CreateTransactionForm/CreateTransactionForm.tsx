import type { JSX } from 'react';
import {
  Controller,
  FormProvider,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { TransactionStatus, TransactionType } from '@/api';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from '@/ui';

import { useCreateTransaction } from '../../queries';

import { AccountField, CategoryField } from './components';
import { getCreateTransactionPayload } from './utils';

const defaultValues: CreateTransactionFormSchemaType = {
  type: TransactionType.Expense,
  status: TransactionStatus.Completed,
  note: '',
  facility: '',
  category: '',
  amount: 0,
  date: new Date().toISOString().split('T')[0],
  dueDate: '',
  reminderDate: '',
  description: '',
  account: '',
  receiptTaken: false,
  isInstallment: false,
  isReadyToDeduct: true,
  website: '',
};

const validationSchema = z.object({
  type: z.enum(Object.values(TransactionType) as [string, ...string[]]),
  status: z.enum(Object.values(TransactionStatus) as [string, ...string[]]),
  note: z
    .string()
    .min(1, { message: 'Note is required' })
    .max(50, { message: 'Note must be at most 50 characters' }),
  facility: z
    .string()
    .max(50, { message: 'Facility must be at most 50 characters' }),
  category: z.string().min(1, { message: 'Category is required' }),
  amount: z
    .number()
    .positive({ message: 'Amount must be positive' })
    .min(0.01, { message: 'Amount must be at least 0.01' }),
  date: z.string().min(1, { message: 'Date is required' }),
  dueDate: z.string(),
  reminderDate: z.string(),
  description: z
    .string()
    .max(500, { message: 'Description must be at most 500 characters' }),
  account: z.string().min(1, { message: 'Account is required' }),
  receiptTaken: z.boolean(),
  isInstallment: z.boolean(),
  isReadyToDeduct: z.boolean(),
  website: z
    .string()
    .refine(
      (val) => {
        if (val === '') return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Must be a valid URL' },
    )
    .or(z.literal('')),
});

export type CreateTransactionFormSchemaType = z.infer<typeof validationSchema>;

export const CreateTransactionForm = (): JSX.Element => {
  const { createTransaction, isPendingCreate } = useCreateTransaction();

  const methods = useForm<CreateTransactionFormSchemaType>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = methods;

  const onSubmit: SubmitHandler<CreateTransactionFormSchemaType> = (data) => {
    const payload = getCreateTransactionPayload(data);
    createTransaction(payload);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>
              Fill in the details to create a new transaction.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              {/* Type */}
              <Field>
                <FieldLabel htmlFor="type">Type *</FieldLabel>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isPendingCreate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TransactionType.Income}>
                          Income 💰
                        </SelectItem>
                        <SelectItem value={TransactionType.Expense}>
                          Expense 💸
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type?.message && (
                  <FieldError>{errors.type.message}</FieldError>
                )}
              </Field>

              {/* Status */}
              <Field>
                <FieldLabel htmlFor="status">Status *</FieldLabel>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isPendingCreate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TransactionStatus.Completed}>
                          Completed ✅
                        </SelectItem>
                        <SelectItem value={TransactionStatus.Pending}>
                          Pending ⏳
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status?.message && (
                  <FieldError>{errors.status.message}</FieldError>
                )}
              </Field>

              {/* Note */}
              <Field>
                <FieldLabel htmlFor="note">Note *</FieldLabel>
                <Input
                  {...register('note')}
                  type="text"
                  required
                  disabled={isPendingCreate}
                  placeholder="Enter a note"
                  maxLength={50}
                />
                {errors.note?.message && (
                  <FieldError>{errors.note.message}</FieldError>
                )}
              </Field>

              {/* Facility */}
              <Field>
                <FieldLabel htmlFor="facility">Facility</FieldLabel>
                <Input
                  {...register('facility')}
                  type="text"
                  disabled={isPendingCreate}
                  placeholder="Enter facility name (optional)"
                  maxLength={50}
                />
                {errors.facility?.message && (
                  <FieldError>{errors.facility.message}</FieldError>
                )}
              </Field>

              <CategoryField />

              {/* Amount */}
              <Field>
                <FieldLabel htmlFor="amount">Amount *</FieldLabel>
                <Input
                  {...register('amount', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  disabled={isPendingCreate}
                  placeholder="0.00"
                />
                {errors.amount?.message && (
                  <FieldError>{errors.amount.message}</FieldError>
                )}
              </Field>

              {/* Date */}
              <Field>
                <FieldLabel htmlFor="date">Date *</FieldLabel>
                <Input
                  {...register('date')}
                  type="date"
                  required
                  disabled={isPendingCreate}
                />
                {errors.date?.message && (
                  <FieldError>{errors.date.message}</FieldError>
                )}
              </Field>

              {/* Due Date */}
              <Field>
                <FieldLabel htmlFor="dueDate">Due Date</FieldLabel>
                <Input
                  {...register('dueDate')}
                  type="date"
                  disabled={isPendingCreate}
                />
                {errors.dueDate?.message && (
                  <FieldError>{errors.dueDate.message}</FieldError>
                )}
              </Field>

              {/* Reminder Date */}
              <Field>
                <FieldLabel htmlFor="reminderDate">Reminder Date</FieldLabel>
                <Input
                  {...register('reminderDate')}
                  type="date"
                  disabled={isPendingCreate}
                />
                {errors.reminderDate?.message && (
                  <FieldError>{errors.reminderDate.message}</FieldError>
                )}
              </Field>

              {/* Description */}
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <textarea
                  {...register('description')}
                  disabled={isPendingCreate}
                  placeholder="Enter a description (optional)"
                  maxLength={500}
                  className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.description?.message && (
                  <FieldError>{errors.description.message}</FieldError>
                )}
              </Field>

              <AccountField />

              {/* Checkboxes */}
              <div className="space-y-4">
                <Field>
                  <div className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="receiptTaken"
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPendingCreate}
                        />
                      )}
                    />
                    <FieldLabel
                      htmlFor="receiptTaken"
                      className="cursor-pointer"
                    >
                      Receipt Taken
                    </FieldLabel>
                  </div>
                </Field>

                <Field>
                  <div className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="isInstallment"
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPendingCreate}
                        />
                      )}
                    />
                    <FieldLabel
                      htmlFor="isInstallment"
                      className="cursor-pointer"
                    >
                      Is Installment
                    </FieldLabel>
                  </div>
                </Field>

                <Field>
                  <div className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="isReadyToDeduct"
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPendingCreate}
                        />
                      )}
                    />
                    <FieldLabel
                      htmlFor="isReadyToDeduct"
                      className="cursor-pointer"
                    >
                      Ready to Deduct
                    </FieldLabel>
                  </div>
                </Field>
              </div>

              {/* Website */}
              <Field>
                <FieldLabel htmlFor="website">Website</FieldLabel>
                <Input
                  {...register('website')}
                  type="url"
                  disabled={isPendingCreate}
                  placeholder="https://example.com (optional)"
                />
                {errors.website?.message && (
                  <FieldError>{errors.website.message}</FieldError>
                )}
              </Field>

              <Field>
                <Button type="submit" disabled={isPendingCreate}>
                  {isPendingCreate ? (
                    <>
                      <Spinner className="mr-2" />
                      Creating...
                    </>
                  ) : (
                    'Create Transaction'
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

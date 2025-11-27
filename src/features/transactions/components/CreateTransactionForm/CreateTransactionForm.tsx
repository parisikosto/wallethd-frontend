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
  Spinner,
  ToggleGroup,
  ToggleGroupItem,
} from '@/ui';
import { cn } from '@/utils';

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
  issueDate: '',
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
  issueDate: z.string(),
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
              <div className="flex flex-col md:flex-row gap-4">
                {/* Type */}
                <Field className="flex-1">
                  <FieldLabel htmlFor="type">Type *</FieldLabel>
                  <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                      <ToggleGroup
                        type="single"
                        value={field.value}
                        onValueChange={(value) => {
                          if (value) {
                            field.onChange(value);
                          }
                        }}
                        disabled={isPendingCreate}
                        variant="outline"
                        spacing={0}
                        className="w-full"
                      >
                        <ToggleGroupItem
                          value={TransactionType.Income}
                          className={cn(
                            'flex-1',
                            field.value === TransactionType.Income &&
                              'data-[state=on]:bg-green-200 data-[state=on]:dark:bg-green-950/40 data-[state=on]:text-green-900 data-[state=on]:dark:text-green-100 data-[state=on]:hover:bg-green-300 data-[state=on]:dark:hover:bg-green-950/50',
                          )}
                        >
                          Income 💰
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value={TransactionType.Expense}
                          className={cn(
                            'flex-1',
                            field.value === TransactionType.Expense &&
                              'data-[state=on]:bg-red-200 data-[state=on]:dark:bg-red-950/40 data-[state=on]:text-red-900 data-[state=on]:dark:text-red-100 data-[state=on]:hover:bg-red-300 data-[state=on]:dark:hover:bg-red-950/50',
                          )}
                        >
                          Expense 💸
                        </ToggleGroupItem>
                      </ToggleGroup>
                    )}
                  />
                  {errors.type?.message && (
                    <FieldError>{errors.type.message}</FieldError>
                  )}
                </Field>

                {/* Status */}
                <Field className="flex-1">
                  <FieldLabel htmlFor="status">Status *</FieldLabel>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <ToggleGroup
                        type="single"
                        value={field.value}
                        onValueChange={(value) => {
                          if (value) {
                            field.onChange(value);
                          }
                        }}
                        disabled={isPendingCreate}
                        variant="outline"
                        spacing={0}
                        className="w-full"
                      >
                        <ToggleGroupItem
                          value={TransactionStatus.Pending}
                          className={cn(
                            'flex-1',
                            field.value === TransactionStatus.Pending &&
                              'data-[state=on]:bg-yellow-200 data-[state=on]:dark:bg-yellow-950/40 data-[state=on]:text-yellow-900 data-[state=on]:dark:text-yellow-100 data-[state=on]:hover:bg-yellow-300 data-[state=on]:dark:hover:bg-yellow-950/50',
                          )}
                        >
                          Pending ⏳
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value={TransactionStatus.Completed}
                          className={cn(
                            'flex-1',
                            field.value === TransactionStatus.Completed &&
                              'data-[state=on]:bg-green-200 data-[state=on]:dark:bg-green-950/40 data-[state=on]:text-green-900 data-[state=on]:dark:text-green-100 data-[state=on]:hover:bg-green-300 data-[state=on]:dark:hover:bg-green-950/50',
                          )}
                        >
                          Completed ✅
                        </ToggleGroupItem>
                      </ToggleGroup>
                    )}
                  />
                  {errors.status?.message && (
                    <FieldError>{errors.status.message}</FieldError>
                  )}
                </Field>
              </div>

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

              <div className="flex flex-col md:flex-row gap-4">
                {/* Amount */}
                <Field className="flex-1">
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

                {/* Facility */}
                <Field className="flex-1">
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
              </div>

              <CategoryField />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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

                {/* Issue Date */}
                <Field>
                  <FieldLabel htmlFor="issueDate">Issue Date</FieldLabel>
                  <Input
                    {...register('issueDate')}
                    type="date"
                    disabled={isPendingCreate}
                  />
                  {errors.issueDate?.message && (
                    <FieldError>{errors.issueDate.message}</FieldError>
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
              </div>

              <AccountField />

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

              <div className="flex flex-col md:flex-row gap-4">
                {/* Checkboxes */}
                <div className="space-y-4 flex-1">
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
                <Field className="flex-1">
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
              </div>

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

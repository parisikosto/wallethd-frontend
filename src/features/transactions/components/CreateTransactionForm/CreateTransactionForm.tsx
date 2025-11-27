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
import { FormFieldKey } from './interfaces';
import { getCreateTransactionPayload } from './utils';

const defaultValues: CreateTransactionFormSchema = {
  [FormFieldKey.Type]: TransactionType.Expense,
  [FormFieldKey.Status]: TransactionStatus.Completed,
  [FormFieldKey.Note]: '',
  [FormFieldKey.Facility]: '',
  [FormFieldKey.Category]: '',
  [FormFieldKey.Amount]: 0,
  [FormFieldKey.Date]: new Date().toISOString().split('T')[0],
  [FormFieldKey.IssueDate]: '',
  [FormFieldKey.DueDate]: '',
  [FormFieldKey.ReminderDate]: '',
  [FormFieldKey.Description]: '',
  [FormFieldKey.Account]: '',
  [FormFieldKey.ReceiptTaken]: false,
  [FormFieldKey.IsInstallment]: false,
  [FormFieldKey.IsReadyToDeduct]: true,
  [FormFieldKey.Website]: '',
};

const validationSchema = z.object({
  [FormFieldKey.Type]: z.enum(
    Object.values(TransactionType) as [string, ...string[]],
  ),
  [FormFieldKey.Status]: z.enum(
    Object.values(TransactionStatus) as [string, ...string[]],
  ),
  [FormFieldKey.Note]: z
    .string()
    .min(1, { message: 'Note is required' })
    .max(50, { message: 'Note must be at most 50 characters' }),
  [FormFieldKey.Facility]: z
    .string()
    .max(50, { message: 'Facility must be at most 50 characters' }),
  [FormFieldKey.Category]: z
    .string()
    .min(1, { message: 'Category is required' }),
  [FormFieldKey.Amount]: z
    .number()
    .positive({ message: 'Amount must be positive' })
    .min(0.01, { message: 'Amount must be at least 0.01' }),
  [FormFieldKey.Date]: z.string().min(1, { message: 'Date is required' }),
  [FormFieldKey.IssueDate]: z.string(),
  [FormFieldKey.DueDate]: z.string(),
  [FormFieldKey.ReminderDate]: z.string(),
  [FormFieldKey.Description]: z
    .string()
    .max(500, { message: 'Description must be at most 500 characters' }),
  [FormFieldKey.Account]: z.string().min(1, { message: 'Account is required' }),
  [FormFieldKey.ReceiptTaken]: z.boolean(),
  [FormFieldKey.IsInstallment]: z.boolean(),
  [FormFieldKey.IsReadyToDeduct]: z.boolean(),
  [FormFieldKey.Website]: z
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

export type CreateTransactionFormSchema = z.infer<typeof validationSchema>;

export const CreateTransactionForm = (): JSX.Element => {
  const { createTransaction, isPendingCreate } = useCreateTransaction();

  const methods = useForm<CreateTransactionFormSchema>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = methods;

  const onSubmit: SubmitHandler<CreateTransactionFormSchema> = (data) => {
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
                    name={FormFieldKey.Type}
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
                  {errors[FormFieldKey.Type]?.message && (
                    <FieldError>{errors[FormFieldKey.Type].message}</FieldError>
                  )}
                </Field>

                {/* Status */}
                <Field className="flex-1">
                  <FieldLabel htmlFor="status">Status *</FieldLabel>
                  <Controller
                    control={control}
                    name={FormFieldKey.Status}
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
                  {errors[FormFieldKey.Status]?.message && (
                    <FieldError>
                      {errors[FormFieldKey.Status].message}
                    </FieldError>
                  )}
                </Field>
              </div>

              {/* Note */}
              <Field>
                <FieldLabel htmlFor="note">Note *</FieldLabel>
                <Input
                  {...register(FormFieldKey.Note)}
                  type="text"
                  required
                  disabled={isPendingCreate}
                  placeholder="Enter a note"
                  maxLength={50}
                />
                {errors[FormFieldKey.Note]?.message && (
                  <FieldError>{errors[FormFieldKey.Note].message}</FieldError>
                )}
              </Field>

              <div className="flex flex-col md:flex-row gap-4">
                {/* Amount */}
                <Field className="flex-1">
                  <FieldLabel htmlFor="amount">Amount *</FieldLabel>
                  <Input
                    {...register(FormFieldKey.Amount, { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    disabled={isPendingCreate}
                    placeholder="0.00"
                  />
                  {errors[FormFieldKey.Amount]?.message && (
                    <FieldError>
                      {errors[FormFieldKey.Amount].message}
                    </FieldError>
                  )}
                </Field>

                {/* Facility */}
                <Field className="flex-1">
                  <FieldLabel htmlFor="facility">Facility</FieldLabel>
                  <Input
                    {...register(FormFieldKey.Facility)}
                    type="text"
                    disabled={isPendingCreate}
                    placeholder="Enter facility name (optional)"
                    maxLength={50}
                  />
                  {errors[FormFieldKey.Facility]?.message && (
                    <FieldError>
                      {errors[FormFieldKey.Facility].message}
                    </FieldError>
                  )}
                </Field>
              </div>

              <CategoryField />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Date */}
                <Field>
                  <FieldLabel htmlFor="date">Date *</FieldLabel>
                  <Input
                    {...register(FormFieldKey.Date)}
                    type="date"
                    required
                    disabled={isPendingCreate}
                  />
                  {errors[FormFieldKey.Date]?.message && (
                    <FieldError>{errors[FormFieldKey.Date].message}</FieldError>
                  )}
                </Field>

                {/* Issue Date */}
                <Field>
                  <FieldLabel htmlFor="issueDate">Issue Date</FieldLabel>
                  <Input
                    {...register(FormFieldKey.IssueDate)}
                    type="date"
                    disabled={isPendingCreate}
                  />
                  {errors[FormFieldKey.IssueDate]?.message && (
                    <FieldError>
                      {errors[FormFieldKey.IssueDate].message}
                    </FieldError>
                  )}
                </Field>

                {/* Due Date */}
                <Field>
                  <FieldLabel htmlFor="dueDate">Due Date</FieldLabel>
                  <Input
                    {...register(FormFieldKey.DueDate)}
                    type="date"
                    disabled={isPendingCreate}
                  />
                  {errors[FormFieldKey.DueDate]?.message && (
                    <FieldError>
                      {errors[FormFieldKey.DueDate].message}
                    </FieldError>
                  )}
                </Field>

                {/* Reminder Date */}
                <Field>
                  <FieldLabel htmlFor="reminderDate">Reminder Date</FieldLabel>
                  <Input
                    {...register(FormFieldKey.ReminderDate)}
                    type="date"
                    disabled={isPendingCreate}
                  />
                  {errors[FormFieldKey.ReminderDate]?.message && (
                    <FieldError>
                      {errors[FormFieldKey.ReminderDate].message}
                    </FieldError>
                  )}
                </Field>
              </div>

              <AccountField />

              {/* Description */}
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <textarea
                  {...register(FormFieldKey.Description)}
                  disabled={isPendingCreate}
                  placeholder="Enter a description (optional)"
                  maxLength={500}
                  className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors[FormFieldKey.Description]?.message && (
                  <FieldError>
                    {errors[FormFieldKey.Description].message}
                  </FieldError>
                )}
              </Field>

              <div className="flex flex-col md:flex-row gap-4">
                {/* Checkboxes */}
                <div className="space-y-4 flex-1">
                  <Field>
                    <div className="flex items-center space-x-2">
                      <Controller
                        control={control}
                        name={FormFieldKey.ReceiptTaken}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isPendingCreate}
                          />
                        )}
                      />
                      <FieldLabel
                        htmlFor={FormFieldKey.ReceiptTaken}
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
                        name={FormFieldKey.IsInstallment}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isPendingCreate}
                          />
                        )}
                      />
                      <FieldLabel
                        htmlFor={FormFieldKey.IsInstallment}
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
                        name={FormFieldKey.IsReadyToDeduct}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isPendingCreate}
                          />
                        )}
                      />
                      <FieldLabel
                        htmlFor={FormFieldKey.IsReadyToDeduct}
                        className="cursor-pointer"
                      >
                        Ready to Deduct
                      </FieldLabel>
                    </div>
                  </Field>
                </div>

                {/* Website */}
                <Field className="flex-1">
                  <FieldLabel htmlFor={FormFieldKey.Website}>
                    Website
                  </FieldLabel>
                  <Input
                    {...register(FormFieldKey.Website)}
                    type="url"
                    disabled={isPendingCreate}
                    placeholder="https://example.com (optional)"
                  />
                  {errors[FormFieldKey.Website]?.message && (
                    <FieldError>
                      {errors[FormFieldKey.Website].message}
                    </FieldError>
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

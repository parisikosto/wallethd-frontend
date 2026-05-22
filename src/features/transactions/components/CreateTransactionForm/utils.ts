import {
  type CreateTransactionDto,
  TransactionStatus,
  TransactionType,
} from '@/api';

import {
  FormFieldKey,
  getEmptyTransactionFormValues,
  type TransactionFormSchema,
} from '../TransactionForm';

export const getCreateTransactionInitialValuesFromSearchParams = (
  searchParams: URLSearchParams,
): TransactionFormSchema | undefined => {
  const type = searchParams.get('type');
  const yearParam = searchParams.get('year');
  const monthParam = searchParams.get('month');

  if (
    (type !== TransactionType.Income && type !== TransactionType.Expense) ||
    !yearParam ||
    monthParam === null
  ) {
    return undefined;
  }

  const year = Number(yearParam);
  const monthIndex = Number(monthParam);

  if (
    Number.isNaN(year) ||
    Number.isNaN(monthIndex) ||
    monthIndex < 0 ||
    monthIndex > 11
  ) {
    return undefined;
  }

  const month = String(monthIndex + 1).padStart(2, '0');

  return {
    ...getEmptyTransactionFormValues(),
    [FormFieldKey.Type]: type,
    [FormFieldKey.Date]: `${year}-${month}-01`,
  };
};

export const getCreateTransactionPayload = ({
  account,
  amount,
  category,
  date,
  description,
  dueDate,
  facility,
  isInstallment,
  isReadyToDeduct,
  issueDate,
  note,
  receiptTaken,
  reminderDate,
  status,
  type,
  website,
}: TransactionFormSchema): CreateTransactionDto => {
  return {
    account,
    amount: amount || 0,
    category,
    date,
    description:
      description && description.trim() !== '' ? description : undefined,
    dueDate: dueDate && dueDate.trim() !== '' ? dueDate : undefined,
    facility: facility && facility.trim() !== '' ? facility : undefined,
    issueDate: issueDate && issueDate.trim() !== '' ? issueDate : undefined,
    isInstallment,
    isReadyToDeduct,
    note,
    receiptTaken,
    reminderDate:
      reminderDate && reminderDate.trim() !== '' ? reminderDate : undefined,
    status: status as TransactionStatus,
    type: type as TransactionType,
    website: website && website.trim() !== '' ? website : '',
  };
};

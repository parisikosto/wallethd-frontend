import { type Transaction, TransactionStatus, TransactionType } from '@/api';

import type { TransactionFormSchema } from '../TransactionForm';

import { FormFieldKey } from './constants';

export const getEmptyTransactionFormValues = (): TransactionFormSchema => ({
  [FormFieldKey.Type]: TransactionType.Expense,
  [FormFieldKey.Status]: TransactionStatus.Completed,
  [FormFieldKey.Note]: '',
  [FormFieldKey.Facility]: '',
  [FormFieldKey.Category]: '',
  [FormFieldKey.Amount]: null,
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
  [FormFieldKey.Attachments]: [],
});

export const generateDefaultValues = (
  transaction: Transaction,
): TransactionFormSchema => {
  const {
    account,
    amountDecimal,
    attachments,
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
  } = transaction;

  return {
    account: account._id,
    amount: amountDecimal,
    attachments,
    category: category._id,
    date: date.split('T')[0],
    description: description || '',
    dueDate: dueDate?.split('T')[0] || '',
    facility: facility || '',
    isInstallment,
    isReadyToDeduct,
    issueDate: issueDate?.split('T')[0] || '',
    note,
    receiptTaken,
    reminderDate: reminderDate?.split('T')[0] || '',
    status,
    type,
    website: website || '',
  };
};

export const generateDuplicateDefaultValues = (
  transaction: Transaction,
): TransactionFormSchema => ({
  ...generateDefaultValues(transaction),
  attachments: [],
  date: new Date().toISOString().split('T')[0],
  status: TransactionStatus.Pending,
});

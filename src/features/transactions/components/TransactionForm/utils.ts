import type { Transaction } from '@/api';

import type { TransactionFormSchema } from '../TransactionForm';

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

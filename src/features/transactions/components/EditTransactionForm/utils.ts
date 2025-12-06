import type {
  TransactionStatus,
  TransactionType,
  UpdateTransactionDto,
} from '@/api';

import type { TransactionFormSchema } from '../TransactionForm';

export const getUpdateTransactionPayload = ({
  account,
  amount,
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
}: TransactionFormSchema): UpdateTransactionDto => {
  return {
    account,
    amount: amount || 0,
    attachments,
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

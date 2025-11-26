import type {
  CreateTransactionDto,
  TransactionStatus,
  TransactionType,
} from '@/api';

import type { CreateTransactionFormSchemaType } from './CreateTransactionForm';

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
  note,
  receiptTaken,
  reminderDate,
  status,
  type,
  website,
}: CreateTransactionFormSchemaType): CreateTransactionDto => {
  return {
    account,
    amount,
    category,
    date,
    description:
      description && description.trim() !== '' ? description : undefined,
    dueDate: dueDate && dueDate.trim() !== '' ? dueDate : undefined,
    facility: facility && facility.trim() !== '' ? facility : undefined,
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

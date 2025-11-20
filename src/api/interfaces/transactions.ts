export enum TransactionStatus {
  Completed = 'completed',
  Pending = 'pending',
}

export enum TransactionType {
  Expense = 'expense',
  Income = 'income',
}

export interface Transaction {
  _id: string;
  amount: number;
  attachments: string[];
  createdAt: string;
  date: string;
  description?: string;
  dueDate?: string;
  facility?: string;
  isInstallment: boolean;
  isReadyToDeduct: boolean;
  note: string;
  receiptTaken: boolean;
  reminderDate?: string;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt: string;
  website?: string;
}

export interface TransactionAccount {
  _id: string;
  name: string;
}

export interface TransactionParentCategory {
  _id: string;
  name: string;
}

export interface TransactionCategory {
  _id: string;
  name: string;
  parent: TransactionParentCategory | null;
}

export const TransactionStatus = {
  Completed: 'completed',
  Pending: 'pending',
} as const;
export type TransactionStatus =
  (typeof TransactionStatus)[keyof typeof TransactionStatus];

export const TransactionType = {
  Expense: 'expense',
  Income: 'income',
} as const;
export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export interface Transaction {
  _id: string;
  account: TransactionAccount;
  amount: number;
  amountDecimal: number;
  attachments: string[];
  category: TransactionCategory;
  createdAt: string;
  date: string;
  description?: string;
  dueDate?: string;
  facility?: string;
  isInstallment: boolean;
  isReadyToDeduct: boolean;
  issueDate?: string;
  note: string;
  receiptTaken: boolean;
  reminderDate?: string;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt: string;
  user: string;
  website?: string;
}

export interface CreateTransactionDto {
  account: string;
  amount: number;
  attachments?: string[];
  category: string;
  date: string;
  description?: string;
  dueDate?: string;
  facility?: string;
  isInstallment?: boolean;
  isReadyToDeduct?: boolean;
  issueDate?: string;
  note: string;
  receiptTaken?: boolean;
  reminderDate?: string;
  status: TransactionStatus;
  type: TransactionType;
  website?: string;
}

export interface UpdateTransactionDto {
  account?: string;
  amount?: number;
  attachments?: string[];
  category?: string;
  date?: string;
  description?: string;
  dueDate?: string;
  facility?: string;
  isInstallment?: boolean;
  isReadyToDeduct?: boolean;
  issueDate?: string;
  note?: string;
  receiptTaken?: boolean;
  reminderDate?: string;
  status?: TransactionStatus;
  type?: TransactionType;
  website?: string;
}

export interface TransactionsMonthlyData {
  actualSavings: number;
  budgetForNecessities: number;
  expectedSavings: number;
  expenses: Transaction[];
  incomes: Transaction[];
  isOnTrack: boolean;
  isOverBudget: boolean;
  totalExpenses: number;
  totalIncome: number;
  wantsBudget: number;
}

export interface TransactionSummary {
  completedExpenses: number;
  completedIncome: number;
  pendingExpenses: number;
  pendingIncome: number;
  totalExpenses: number;
  totalIncome: number;
}

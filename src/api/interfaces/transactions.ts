export interface TransactionAccount {
  _id: string;
  name: string;
}

export interface TransactionCategory {
  _id: string;
  name: string;
  parent?: TransactionCategory;
}

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
  account?: TransactionAccount;
  amount: number;
  amountDecimal: number;
  attachments: string[];
  category?: TransactionCategory;
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

export interface TransactionSummary {
  completedExpenses: number;
  completedIncome: number;
  pendingExpenses: number;
  pendingIncome: number;
  totalExpenses: number;
  totalIncome: number;
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

export interface CreateTransactionDto {
  account: string;
  amount: number;
  category: string;
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
  website: string;
}

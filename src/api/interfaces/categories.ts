import type { TransactionType } from './transactions';

export interface Category {
  _id: string;
  createdAt: string;
  description?: string;
  isArchived: boolean;
  name: string;
  order: number;
  parent?: Category;
  slug: string;
  transactionType: TransactionType;
  updatedAt: string;
}

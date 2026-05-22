export const AppRouterPath = {
  Home: '/',
  Login: '/login',
  NotFound: '*',
  Settings: '/settings',
  Signup: '/signup',
  Transactions: '/transactions',
  TransactionsDuplicate: '/transactions/:id/duplicate',
  TransactionsEdit: '/transactions/:id/edit',
  TransactionsNew: '/transactions/new',
  YearSummary: '/year-summary/:year',
  YearSummaryFor: (year: number) => `/year-summary/${year}`,
  TransactionsNewIncomeForMonth: (year: number, monthIndex: number) =>
    `/transactions/new?type=income&year=${year}&month=${monthIndex}`,
  TransactionsNewExpenseForMonth: (year: number, monthIndex: number) =>
    `/transactions/new?type=expense&year=${year}&month=${monthIndex}`,
} as const;

export const AppRouterPath = {
  Home: '/',
  Login: '/login',
  NotFound: '*',
  Settings: '/settings',
  Signup: '/signup',
  Transactions: '/transactions',
  TransactionsEdit: '/transactions/:id/edit',
  TransactionsNew: '/transactions/new',
  YearSummary: '/year-summary/:year',
  YearSummaryFor: (year: number) => `/year-summary/${year}`,
} as const;

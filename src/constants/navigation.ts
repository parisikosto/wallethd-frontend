import {
  IconDashboard,
  IconListDetails,
  IconSettings,
} from '@tabler/icons-react';

export const navigationItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: IconDashboard,
  },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: IconListDetails,
  },
];

export const secondaryNavigationItems = [
  {
    title: 'Settings',
    url: '/settings',
    icon: IconSettings,
  },
];

export const getPageTitle = (pathname: string): string => {
  const yearSummaryMatch = /^\/year-summary\/(\d{4})$/.exec(pathname);

  if (yearSummaryMatch) {
    return `Year Summary ${yearSummaryMatch[1]}`;
  }

  const item = [...navigationItems, ...secondaryNavigationItems].find(
    (navItem) => navItem.url === pathname,
  );

  return item?.title ?? 'Dashboard';
};

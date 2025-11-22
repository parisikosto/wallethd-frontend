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

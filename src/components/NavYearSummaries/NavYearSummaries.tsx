import type { JSX } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconCalendarStats } from '@tabler/icons-react';

import { useTransactionsYears } from '@/features';
import { AppRouterPath } from '@/router';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui';

export const NavYearSummaries = (): JSX.Element | null => {
  const location = useLocation();
  const { isFetchingTransactionsYears, transactionsYears } =
    useTransactionsYears();

  const currentYear = new Date().getFullYear();
  const pastYears =
    transactionsYears?.filter((year) => year !== currentYear) ?? [];

  if (isFetchingTransactionsYears || pastYears.length === 0) {
    return null;
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Year Summaries</SidebarGroupLabel>
      <SidebarMenu>
        {pastYears.map((year) => {
          const url = AppRouterPath.YearSummaryFor(year);
          const isActive = location.pathname === url;

          return (
            <SidebarMenuItem key={year}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className={
                  isActive
                    ? 'border-2 border-gray-300 !font-normal'
                    : 'border-2 border-transparent !font-normal'
                }
              >
                <Link to={url}>
                  <IconCalendarStats />
                  <span>{year}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

import type { ComponentPropsWithoutRef, JSX } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { secondaryNavigationItems } from '@/constants';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui';

export const NavSecondary = ({
  ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup>): JSX.Element => {
  const location = useLocation();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {secondaryNavigationItems.map((item) => {
            const isActive = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

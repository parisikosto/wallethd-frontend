import type { ComponentPropsWithoutRef, JSX } from 'react';
import { IconSearch, IconSettings } from '@tabler/icons-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui';

const items = [
  {
    title: 'Settings',
    url: '/settings',
    icon: IconSettings,
  },
  {
    title: 'Search',
    url: '#',
    icon: IconSearch,
  },
];

export const NavSecondary = ({
  ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup>): JSX.Element => {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

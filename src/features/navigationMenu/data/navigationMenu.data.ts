import type { NavigationMenu } from '@/features/navigationMenu/ui/NavigationMenu.types.ts'

export const navigationMenuData: NavigationMenu = {
  nav: [
    {
      path: '/',
      icon: 'dashboard',
      text: 'Dashboard',
    },
    {
      path: '/tasks',
      icon: 'tasks',
      text: 'All Tasks',
    },
    {
      path: '/calendar',
      icon: 'calendar',
      text: 'Calendar',
    },
    {
      path: '/saved',
      icon: 'saved',
      text: 'Saved',
    },
    {
      path: '/settings',
      icon: 'settings',
      text: 'Settings',
    },
  ],
}

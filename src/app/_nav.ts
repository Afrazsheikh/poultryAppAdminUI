import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/home',
    icon: 'icon-speedometer',
  },
  {
    name: 'Manage Restaurants',
    icon: 'icon-pencil',
    children: [
      {
        name: 'Add Restaurant',
        url: '/home/base/register',
        icon: 'icon-home'
      },
      {
        name: 'Set Password',
        url: '/home/base/password',
        icon: 'icon-key'
      },
      /*{
        name: 'Menu',
        url: '/home/base/collapses',
        icon: 'icon-options-vertical'
      },*/
      {
        name: 'Settings',
        url: '/home/base/forms',
        icon: 'icon-settings'
      }
    ]
  },
  {
    name: 'Order & History',
    url: '/home/history',
    icon: 'icon-clock'
  },
];

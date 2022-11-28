import { INavData } from '@coreui/angular';
import { Dashboard } from '@mui/icons-material';
import { } from '../app/views/dashboard/dashboard.component'


export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/home',
    icon: 'icon-speedometer',
  },

  {
    name: 'Account List',
    url: '/home/history',
    icon: 'icon-clock'
  },
];

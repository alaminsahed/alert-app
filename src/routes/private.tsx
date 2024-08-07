import { lazy } from 'react';

import { PRIVATE } from 'constants/appRoutes';
import CreateIncident from 'pages/dashboard/compoents/create-incident/page';

const DashboardPage = lazy(() => import('pages/dashboard/page'));

interface IRoute {
  path: string;
  element: React.JSX.Element;
  permissions?: any;
}

export const privateRoutes: IRoute[] = [
  {
    path: PRIVATE.HOME,
    element: <DashboardPage />,
    permissions: '',
  },
  {
    path: PRIVATE.CREATE_INCIDENT,
    element: <CreateIncident />,
    permissions: '',
  },
];

import { lazy } from 'react';

import { PRIVATE } from 'constants/appRoutes';
import CreateIncidentPage from 'pages/create-incident/page';

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
    element: <CreateIncidentPage />,
    permissions: '',
  },
];

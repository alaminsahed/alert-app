import { lazy } from 'react';

import { PRIVATE } from 'constants/appRoutes';
import CreateIncidentPage from 'pages/create-incident/page';
import IncidentDetailsPage from 'pages/incident-details/page';
import LawEnforcementContactListPage from 'pages/law-enforcement-contact-list/page';

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
  {
    path: PRIVATE.VIEW_INCIDENT(':id'),
    element: <IncidentDetailsPage />,
    permissions: '',
  },
  {
    path: PRIVATE.LAW,
    element: <LawEnforcementContactListPage />,
    permissions: '',
  },
];

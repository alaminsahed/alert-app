import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { PRIVATE } from 'constants/appRoutes';
import { RootState } from 'store/reducers';

const GuestRouteWrapper = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return auth.access_token ? (
    <Navigate to={PRIVATE.HOME} replace />
  ) : (
    <Outlet />
  );
};

export default GuestRouteWrapper;

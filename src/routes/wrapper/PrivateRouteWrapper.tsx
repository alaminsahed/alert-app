import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { RootState } from 'store/reducers';
import { PUBLIC } from 'constants/appRoutes';

const PrivateRouteWrapper = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return auth.access_token ? (
    <Outlet />
  ) : (
    // <Navigate to={PUBLIC.SIGN_IN} replace />
    <Outlet />
  );
};

export default PrivateRouteWrapper;

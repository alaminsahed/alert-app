import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PUBLIC } from 'constants/appRoutes';
import PrivateLayout from 'layout/PrivateLayout';
import NotFoundPage from 'pages/not-found/page';
import SignInPage from 'pages/sign-in/page';
import { privateRoutes } from 'routes';
import GuestRouteWrapper from 'routes/wrapper/GuestRouteWrapper';
import PrivateRouteWrapper from 'routes/wrapper/PrivateRouteWrapper';
import { RootState } from 'store/reducers';
import './App.css';
import Otp from 'pages/otp/page';
import Register from 'pages/register/page';

const App = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Auth */}
        <Route element={<GuestRouteWrapper />}>
          <Route path={PUBLIC.SIGN_IN} element={<SignInPage />} />
        </Route>
        <Route path={PUBLIC.OTP(':number')} element={<Otp />} />
        <Route
          path={PUBLIC.REGISTER(':otp', ':number')}
          element={<Register />}
        />

        {/* Private Routes */}
        <Route element={<PrivateRouteWrapper />}>
          <Route element={<PrivateLayout />}>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>

        {/* Not Found */}
        {auth.access_token ? (
          <Route element={<PrivateRouteWrapper />}>
            <Route element={<PrivateLayout />}>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        ) : (
          <Route path="*" element={<NotFoundPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

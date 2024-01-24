import { Navigate, Route } from 'react-router-dom';
import { Pages } from '~/types';

export const homeRoutes = (
  <Route path={Pages.home} element={<Navigate to={Pages.ecosystem} />} />
);

import { Route } from 'react-router-dom';
import { Pages } from '~/types';

import { Ecosystem } from './pages';

export const ecosystemRoutes = (
  <Route path={Pages.ecosystem} element={<Ecosystem />} />
);

import { Route } from 'react-router-dom';
import { Pages } from '~/types';

import { Ecosystem } from '../Ecosystem';

export const homeRoutes = <Route path={Pages.home} element={<Ecosystem />} />;

import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import { bridgeRoutes } from './systems/Bridge/routes';
import { ecosystemRoutes } from './systems/Ecosystem/routes';
import { homeRoutes } from './systems/Home/routes';
import { Pages } from './types';

export const routes = (
  <BrowserRouter>
    <Routes>
      <Route>
        <Route path="*" element={<Navigate to={Pages.ecosystem} />} />
        {homeRoutes}
        {bridgeRoutes}
        {ecosystemRoutes}
      </Route>
    </Routes>
  </BrowserRouter>
);

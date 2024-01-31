import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import { bridgeRoutes } from './systems/Bridge/routes';
import { ecosystemRoutes } from './systems/Ecosystem/routes';
import { Pages } from './types';

export const routes = (
  <BrowserRouter>
    <Routes>
      <Route>
        <Route path="*" element={<Navigate to={Pages.ecosystem} />} />
        {bridgeRoutes}
        {ecosystemRoutes}
      </Route>
    </Routes>
  </BrowserRouter>
);

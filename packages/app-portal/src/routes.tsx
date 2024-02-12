import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { bridgeRoutes } from './systems/Bridge/routes';
import { ecosystemRoutes } from './systems/Ecosystem/routes';
import { Pages } from './types';

export const routes = (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route>
        <Route path="*" element={<Navigate to={Pages.ecosystem} />} />
        {bridgeRoutes}
        {ecosystemRoutes}
      </Route>
    </Routes>
  </BrowserRouter>
);

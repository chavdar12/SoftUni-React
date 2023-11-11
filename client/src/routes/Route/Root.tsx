import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import {
  AdminAddItemPage,
  AdminDashboardPage,
  LandingPage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
} from "#pages";

const RootContext = React.createContext({});

export function Root() {
  return (
    <RootContext.Provider value={{}}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin-add-item" element={<AdminAddItemPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </RootContext.Provider>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default Root;

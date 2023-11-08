import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { ContactUsPage, LandingPage, LoginPage, RegisterPage, ShopPage } from '#pages';

const RootContext = React.createContext({});

export function Root() {
  return (
    <RootContext.Provider value={{}}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
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

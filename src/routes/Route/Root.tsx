import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LoginPage, RegisterPage, LandingPage } from "#pages";

const RootContext = React.createContext({});

export function Root() {
  return (
    <RootContext.Provider value={{}}>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LandingPage />} />
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

import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  LandingPage,
  UserProfilePage,
  AddProductPage,
  ProductPage,
  CartPage,
  ShopPage,
  AdminDashboardPage,
  AdminLoginPage,
  AdminUsersPage,
  CheckoutPage,
} from "#pages";

const RootContext = React.createContext({});

export function Root() {
  return (
    <RootContext.Provider value={{}}>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route
          path="/add-product"
          // element={
          //   <ProtectedRoute allowedRoles={["admin"]}>
          //     <AdminDashboardPage />
          //   </ProtectedRoute>
          // }
          element={<AddProductPage />}
        />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/admin-dashboard"
          // element={
          //   <ProtectedRoute allowedRoles={["admin"]}>
          //     <AdminDashboardPage />
          //   </ProtectedRoute>
          // }
          element={<AdminDashboardPage />}
        />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin-users" element={<AdminUsersPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
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

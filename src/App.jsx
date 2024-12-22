import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { refreshUser } from "./redux/auth/operation";
import { selectIsRefreshing, selectIsLoggedIn } from "./redux/auth/selectors";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import RegistrationPage from "./pages/RegisterPage/RegisterPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn); // Використовуйте селектор для автентифікації

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <p>Refreshing user data...</p>;
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/contacts">
              <RegistrationPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/contacts" />
            ) : (
              <RestrictedRoute redirectTo="/contacts">
                <LoginPage />
              </RestrictedRoute>
            )
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login">
              <ContactsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

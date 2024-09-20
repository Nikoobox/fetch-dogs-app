import { useState, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { CircularProgress } from "@mui/material";

import { ProtectedRoute } from "./components/Auth";
import AppProviders from "./components/Providers";
import Navbar from "./components/Navbar";
import { useAppSelector } from "./hooks";
import "./App.css";

const Login = lazy(() => import("./components/Login"));
const SearchPage = lazy(() => import("./components/SearchPage"));

const App = () => {
  // needed to access redux store
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <CircularProgress style={{ display: "block", margin: "auto" }} />
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/search"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SearchPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

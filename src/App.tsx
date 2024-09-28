import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { CircularProgress, Box } from "@mui/material";

import { ProtectedRoute } from "./components/Auth";
import AppProviders from "./components/Providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAppSelector } from "./hooks";

const Login = lazy(() => import("./components/Login"));
const SearchPage = lazy(() => import("./components/SearchPage"));

const App = () => (
  <AppProviders>
    <AppContent />
  </AppProviders>
);

const AppContent = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  console.log("AppContent-isAuthenticated", isAuthenticated);
  return (
    <>
      <Suspense
        fallback={
          <Box width="100%" height="100%" display="flex">
            <CircularProgress
              sx={{ display: "block", margin: "auto", color: "black" }}
            />
          </Box>
        }
      >
        <Navbar />
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

        <Footer />
      </Suspense>
    </>
  );
};

export default App;

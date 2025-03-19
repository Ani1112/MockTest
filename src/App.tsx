import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import TestInterface from "./components/test/TestInterface";
import TestResults from "./components/test/TestResults";
import TestCreator from "./components/test/TestCreator";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./components/auth/AuthProvider";
import React from "react";
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test/:testId"
              element={
                <ProtectedRoute>
                  <TestInterface />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test-results/:testId"
              element={
                <ProtectedRoute>
                  <TestResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-test"
              element={
                <ProtectedRoute>
                  <TestCreator />
                </ProtectedRoute>
              }
            />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
      <div className="w-[800px] h-[600px]"></div>
    </AuthProvider>
  );
}

export default App;

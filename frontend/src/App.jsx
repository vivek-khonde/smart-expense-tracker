import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";


function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Default Route */}
      <Route
        path="/"
        element={
          user ? <Navigate to="/dashboard" /> : <Navigate to="/register" />
        }
      />

      {/* Public Routes */}
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" /> : <Register />}
      />

      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
             <Layout>
        <Dashboard />
      </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <ProtectedRoute>
             <Layout>
        <Categories />
      </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Layout>
        <Transactions />
      </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;


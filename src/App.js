import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AllPosts from "./components/AllPosts";
import Create from "./components/Create";
import Edit from "./components/Edit";

import Login from "./components/Login";
import Register from "./components/Register";

import AppLayout from "./components/AppLayout";

import ProtectedRoute from "./components/ProtectedRoute";

import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AllPosts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <AuthenticatedRoute>
                <Create />
              </AuthenticatedRoute>
            }
          />

          <Route
            path="/edit"
            element={
              <AuthenticatedRoute>
                <Edit />
              </AuthenticatedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
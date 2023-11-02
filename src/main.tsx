import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login";
import "./styles/index.css";
import Modal from "./components/Table/modal";
import Admin from "./components/Administrator/admin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
  { path: "/app", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/modal", element: <Modal /> },
  { path: "/admin", element: <Admin /> },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

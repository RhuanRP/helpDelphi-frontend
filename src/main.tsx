import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import Modal from "./components/Modal/modal";
import Admin from "./Admin";
import { Toaster } from "./components/Toaster";

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
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

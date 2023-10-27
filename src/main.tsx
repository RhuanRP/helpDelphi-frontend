import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login";
import "./styles/index.css";
import Modal from "./components/Table/modal";

const router = createBrowserRouter([
  { path: "/app", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/modal", element: <Modal />}
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

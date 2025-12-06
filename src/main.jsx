import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";

import './index.css'

import LoginPage from "./pages/LoginPage.jsx"

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  // { path: "/register", element: <Register /> },
  // { path: "/feed", element: <PostFeed /> },
  // { path: "*", element: <Error /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

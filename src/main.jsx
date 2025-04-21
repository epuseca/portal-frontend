import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegiserPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import TagPage from './pages/tag.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import SystemPage from './pages/system.jsx';
import CreateUser from './components/layout/user/createUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/user",
        element: <UserPage />
      },
      {
        path: "/user/create", 
        element: <CreateUser />
      },
      {
        path: "/tag",
        element: <TagPage />
      },
      {
        path: "/system",
        element: <SystemPage />
      },
      
    ]
  },
  {
    path: "/register",
    element: <RegiserPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>,
)

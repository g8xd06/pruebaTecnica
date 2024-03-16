import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './routes/Login.jsx'
import Register from './routes/Register.jsx'
import Dashboard from './routes/Dashboard.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import AuthProvider from './auth/AuthProvider.jsx'
import History from './routes/History.jsx'
import Quotation from './routes/Quotation'

//Configuracion de rutas
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/history",
                element: <History />
            },
            {
                path: "/quotation",
                element: <Quotation />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
        
  </React.StrictMode>,
)

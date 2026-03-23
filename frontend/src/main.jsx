import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Gallery from './pages/Gallery.jsx'
import Admin from './pages/Admin.jsx'
import Contact from './pages/Contact.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {index:true,element: <Home/>},
      {path: "gallery", element:<Gallery/>},
      {path: "contact", element:<Contact/>},
      {path: "admin/login", element:<AdminLogin/>},
      {path: "admin", element:(
        <ProtectedRoute>
          <Admin/>
        </ProtectedRoute>
      )},

    ]

  }


])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)

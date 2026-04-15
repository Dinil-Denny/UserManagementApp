import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import App from './App'

//user pages
import UserLogin from "./pages/user/userLogin";
import UserRegister from '@pages/user/userRegister';
import InputOTPForm from '@pages/user/otp';

//admin pages
import AdminLogin from '@pages/admin/adminLogin';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}> 
      {/* ---------------user routes----------------- */}
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/register' element={<UserRegister/>}/>
      <Route path='/otp-verification' element={<InputOTPForm/>}/>

      {/* ----------------admin routes----------------- */}
      <Route path='/admin/login' element={<AdminLogin/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}> 
      <Route path='/login' element={<UserLogin/>}></Route>
      <Route path='/register' element={<UserRegister/>}></Route>
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

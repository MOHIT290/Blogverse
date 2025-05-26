import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from "./components/index.js"
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Addpost from './pages/Addpost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'


const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" element={<App />} >

      <Route path='' element={<Home />} />
      <Route path='/login' element={
        <AuthLayout authentication={false} >
          <Login />
        </AuthLayout>
      } />

      <Route path='/signup' element={
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      } />

      <Route path='/all-posts' element={
        <AuthLayout authentication>
          <AllPosts />
        </AuthLayout>
      } />

      <Route path='/add-post' element={
        <AuthLayout >
          <Addpost />
        </AuthLayout>
      } />

      <Route path='/edit-post/:slug' element={
        <AuthLayout >
          <EditPost />
        </AuthLayout>
      } />

      <Route path='/post/:slug' element={
        <AuthLayout >
          <Post />
        </AuthLayout>
      } />


    </Route>

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

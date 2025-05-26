import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import conf from './conf/conf'
import { useDispatch } from 'react-redux'
import { Header } from "./components/index"
import { Outlet } from 'react-router-dom'
import service from './appwrite/config'
import authservice from './appwrite/auth'
import { login, logout } from './store/authslice'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // console.log(conf.appwriteBucketId)
  useEffect(() => {
    authservice.getcurrentUser().then((userdata) => {

      if (userdata) {
        dispatch(login({ userdata }))
      }

      
      else {
        dispatch(logout())
      }

    }).finally(() => setLoading(false))

  }, [])

  return loading ? <h1>Loading...</h1> : (

    <div className='min-h-screen flex flex-wrap content-between  bg-gray-400 p-0 m-0 absolute top-0 left-0 w-full'>
      <div className='w-full block'>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default App

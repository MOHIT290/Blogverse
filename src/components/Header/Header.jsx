import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Logo, LogoutBtn } from "../index"


function Header() {

  // recent changes .auth
  const authstatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const userdetails = useSelector((state) => state.auth.userData)

  const navitems = [

    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authstatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authstatus
    },

    {
      name: "All posts",
      slug: "/all-posts",
      active: authstatus
    },

    {
      name: "Add post",
      slug: "/add-post",
      active: authstatus
    }

  ]

console.log("userdetails is ", userdetails)

  return (
    <header className='bg-gray-500'>
      <nav className='flex h-20'>
        <div className='mr-4'>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <ul className='flex ml-auto'>
          {navitems?.map((navitem) => (
            navitem.active ?
              <li key={navitem.name}>
                <button
                  onClick={() => navigate(navitem.slug)}
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >
                  {navitem.name}
                </button>
              </li> : null
          ))}



          {authstatus && userdetails && <li className="inline-block relative group flex  px-6 py-2  font-medium cursor-pointer">
            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-black font-bold">
              {userdetails.name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute right-0 mt-6 w-48 bg-white rounded-md shadow-md z-50 hidden group-hover:block">
              <ul className="text-black py-2">
                <li className="px-4 py-2 hover:bg-gray-100">
                  Hello, {userdetails.name}
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <LogoutBtn />
                </li>
              </ul>
            </div>

          </li>

          }

          {/* {authstatus && <li>
            <LogoutBtn />
          </li>} */}


        </ul>

      </nav>

    </header>
  )
}

export default Header
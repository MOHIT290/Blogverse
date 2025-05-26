import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login as authlogin } from '../store/authslice'
import authservice from '../appwrite/auth'
import { Input, Button, Logo } from './index'


/*LogIn page when existing user tries to login */


function Login() {

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const login = async (data) => {

        const session = await authservice.login(data)
        if (session) {
            const userdata = await authservice.getcurrentUser()

            console.log({ ...userdata })
            if (userdata) {
                dispatch(authlogin(userdata))
                navigate("/")
               
            }

        }

    }

    return (

        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                <form onSubmit={handleSubmit(login)}>
                    <div className='space-y-5'>

                        <Input
                            label="Email"
                            type="text"
                            placeholder="Enter your Email "
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password "
                            {...register("password", {
                                required: true
                            })}

                        />

                        <Button
                            type="submit"
                            className="w-full"
                        >Sign In</Button>

                    </div>

                </form>

            </div>
        </div>
    )
}

export default Login
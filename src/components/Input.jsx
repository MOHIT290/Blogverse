import React, { forwardRef, useId } from 'react'

/*
If you are using React Hook Form, ref is required so it can manage input state efficiently.

You need ref in your Input component because:
1) React Hook Form relies on ref to track the input field and validate it.
2) Your Input component is reusable, so forwarding ref ensures it can work with any parent form.
3) Without ref, React Hook Form won’t recognize your input, causing errors or making validation fail.

*/


const Input = forwardRef(({
    label,
    type = "text",
    className = "",
    ...props
}, ref) => {
    const id = useId

    return (

        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>

    )

})

export default Input
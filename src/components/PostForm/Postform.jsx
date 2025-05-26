import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import service from '../../appwrite/config'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Button, Input, RTE, Select } from '../index'

function Postform({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm(
        {
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                status: post?.status || 'active',
                content: post?.content || ""
            }
        })

    const navigate = useNavigate()
    const userdata = useSelector((state) => state.auth.userData)

    // console.log(userdata)
    // console.log(userdata.userdata.$id)
    // console.log("Userdata Keys:", Object.keys(userdata));


    const submit = async (data) => {
        if (post) {
            // data gives you an access of all images 

            const file = data.image[0] ? service.uploadFile(data.image[0]) : null

            // since new immage is being uploaded so already existing image needs to be deleted
            if (file) {
                service.deleteFile(post.Image)
            }

            const dbPost = await service.updatePost(
                post.$id, {
                ...data,
                Image: file ? file.$id : undefined
            }
            )

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

        }

        else {
            const file = await service.uploadFile(data.image[0])

            if (file) {
                const dbpost = await service.createPost(
                    {
                        ...data,
                        Image: file ? file.$id : undefined,
                        userId: userdata.userdata.$id
                    }
                )

                if (dbpost) {
                    navigate(`/post/${dbpost.$id}`)
                }
            }

        }


    }

    // This function will replace some of the characters with '-'
    const slugTransform = (value) => {

        if (value && typeof value === "string") {
            return value.trim().toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, '-')
        }

        return ""
    }


    useEffect(() => {
        const subscription = watch((value, { name }) => {

            // If any change occurs in 'title' field then the same value should be set to Slug field except few char will be replaced with '-'   
            if (name === "title") {
                setValue('slug', slugTransform(value.title))
            }

        })

        return () => {
            subscription.unsubscribe()
        }

    }, [watch, slugTransform, setValue])


    return (
        <form onSubmit={handleSubmit(submit)}
            className='flex flex-wrap' >

            <Input
                label="Title :"
                placeholder="Enter the Title"
                className="mb-4"
                {...register("title", {
                    required: true
                })}
            />


            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", {
                    required: true
                })}

            />

            <RTE
                control={control}
                label="Content :"
                name="content"
                defaultValue={post ? post.content : ""}
            /* defaultValue=getValues("content") also we can use */

            />

            <div className='w-1/3 px-2'>

                <Input
                    label="Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {
                        required: !post
                    })}

                />

                {post && (

                    <div>
                        <img src={service.getFilePreview(post.Image)}
                            alt={post.title}
                            className='rounded-lg'
                        />
                    </div>

                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: true })}

                />


                <Button
                    type='submit'
                    bgColor={post ? "bg-green-500" : undefined}
                    className='w-full'
                >
                    {post ? "Update" : "Submit"}
                </Button>


            </div>

        </form>
    )
}

export default Postform

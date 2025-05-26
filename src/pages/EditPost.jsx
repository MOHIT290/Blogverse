import React, { useEffect, useState } from 'react'
import { Postform } from '../components/index'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setpost] = useState()
    const { slug } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        service.getPost(slug).then((post) => {

            if (post) {
                setpost(post)
            }

            else {
                navigate("/")
            }

        })

    }, [slug, navigate])

    return post ?
        (
            <div className='py-8'>

                <Postform post={post} />
 
            </div>
        ) : null
}

export default EditPost
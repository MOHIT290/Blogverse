import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'
import { Button } from '../components/index'
import parse from "html-react-parser"

function Post() {

    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    // recent changes done added .auth
    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.userdata.$id : false

    const [imageUrl, setImageUrl] = useState("");


    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/")
            })

        }
    }, [slug, navigate])


    useEffect(() => {
        const fetchImage = async () => {
            try {
                const url = await service.getFilePreview(post.Image);
                console.log("Resolved Image URL:", url);
                setImageUrl(url);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        if (post && post.Image) {
            fetchImage();
        }
    }, [post]);



    const deletPost = () => {

        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.Image)
                navigate("/")
            }
        })

    }

    if (!post) {
        return <div>Loading...</div>; // Or a proper skeleton loader
    }

    return (
        <div className='py-8'>

            <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>

                <div className="relative border rounded-xl overflow-hidden shadow-lg">
                    <img

                        // src={service.getFilePreview(post.Image)}
                        src={`${imageUrl}&mode=admin`}
                        alt={post.title}
                        className='rounded-xl w-full h-auto object-cover'
                    />

                    {isAuthor && (
                        <div>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor='bg-green-500' className='mr-3' >
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor='bg-red-500' onClick={deletPost} >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {parse(post.content)}
            </div>

        </div>
    )
}

export default Post
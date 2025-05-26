import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'


function PostCard({ $id, title, Image }) {

    // console.log("Image ID:", Image);
    // console.log("Image URL:", service.getFilePreview(Image));
    
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const url = await service.getFilePreview(Image);
                console.log("Resolved Image URL:", url);
                setImageUrl(url);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        if (Image) {
            fetchImage();
        }
    }, [Image]);



    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full flex justify-center mb-4'>

                    {/* <img src={imageUrl} alt={title} className='rounded-xl' /> */}

                    {imageUrl ? (
                        <img src={`${imageUrl}&mode=admin`} alt={title} className="rounded-xl max-h-64 object-cover" />
                    ) : (
                        <p>Loading image...</p>
                    )}
                </div>
                <h2 
                 className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
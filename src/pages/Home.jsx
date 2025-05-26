import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import service from '../appwrite/config'
import { PostCard } from "..//components/index"

function Home() {

    
    const authstatus = useSelector((state) => state.auth.status)
    const userdetails = useSelector((state) => state.auth.userData)

    const [posts, setposts] = useState([])

    useEffect(() => {
        // service.getPosts().then((posts) => {
        //     if (posts) {
        //         setposts(posts.documents)
        //     }
        // })

        if (userdetails && userdetails?.$id) {
            service.getPosts(userdetails.$id).then((posts) => {
                if (posts) {
                    setposts(posts.documents);
                }
            });
        }
    }, [authstatus, userdetails?.$id])



    if (posts.length === 0) {
        return (
            <>
                {!authstatus ? <h1>No Posts yet</h1> : <h1>Loading</h1>}

            </>
        )
    }
    return (
        <div className='w-full py-8'>
            <div className='flex flex-wrap'>

                {posts.map((post) => (

                    <div key={post.$id}>
                        <PostCard
                            $id={post.$id}
                            title={post.title}
                            Image={post.Image}
                        />
                    </div>

                ))}

            </div>


        </div>
    )
}

export default Home


import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { PostCard } from "../components//index.js"
import { useSelector } from 'react-redux'

function AllPosts() {

  const [posts, setposts] = useState([])
  const userdetails = useSelector((state) => state.auth.userData)


  useEffect(() => {

    // service.getPosts().then((posts) => {
    //   console.log(posts.documents)
    //   setposts(posts.documents)
    // }
    // )
    if (userdetails && userdetails?.$id) {
      service.getPosts(userdetails.$id).then((posts) => {
        if (posts) {
          setposts(posts.documents);
        }
      });
    }


  }, [userdetails?.$id])



  return (
    <div>

      <div className='flex flex-wrap'>
        {posts && posts.map((post) => (
          <div key={post.$id}>
            <PostCard
              {...post}
            />

          </div>
        ))}
      </div>
    </div>
  )
}

export default AllPosts


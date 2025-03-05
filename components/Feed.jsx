"use client"
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import React from 'react'

const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className=' mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
      setFilteredPosts(data)
    }
    fetchPosts()
  },[])

  const handleClick = (tag) => {
    setFilteredPosts(posts.filter((post) => post.tag.includes(tag)))
    }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    if( e.target.value === '#'){
      setFilteredPosts(posts.filter((post) => post.tag.includes(e.target.value)))
    }
    else{

      setFilteredPosts(posts.filter((post) => post.creator.username.includes(e.target.value)))
    }

  }
  return (
    <section className='feed'>
      <form action="" className=' relative w-full flex-center'>
        <input type="text" 
        placeholder='Search for a Tag or a username  ' 
        value={searchText} 
        onChange={handleSearchChange}
        required 
        className='search_input peer' />
      </form>
      <PromptCardList
      data={filteredPosts}
      handleTagClick={handleClick}
      />
    </section>
  )
}

export default Feed
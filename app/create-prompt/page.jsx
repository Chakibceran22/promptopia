"use client"

import { useState } from "react"
import { useSession } from "@node_modules/next-auth/react"
import { useRouter } from "@node_modules/next/navigation"
import Form from "@components/Form"
const CreatePrompt = () => {
    const [submiting, setSubmiting] = useState(false)
    const router = useRouter();
    const {data: session} = useSession();
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmiting(true)
        
        try {
            const response = await fetch('/api/prompt/new',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt : post.prompt,
                    userId : session?.user.id,
                    tag : post.tag
                })
            })
            if(response.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setSubmiting(false)
        }
    }
    return (
        <Form
            type = "Create"
            post={post}
            setPost= {setPost}
            submiting={submiting}
            handleSubmit = {createPrompt}
        />
    )
}

export default CreatePrompt
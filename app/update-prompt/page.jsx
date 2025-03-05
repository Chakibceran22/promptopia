"use client"

import { Suspense, useEffect, useState } from "react"
import { useSession } from "@node_modules/next-auth/react"
import { useRouter, useSearchParams } from "@node_modules/next/navigation"
import Form from "@components/Form"
const EditPrompt = () => {
    const [submiting, setSubmiting] = useState(false)
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    useEffect(() => {
        const getPromptDetails = async()=> {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if(promptId) getPromptDetails()
    },[promptId])
    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmiting(true)
        if(!promptId) return alert('Prompt Not Found')
        
        try {
            const response = await fetch(`/api/prompt/${promptId}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt : post.prompt,
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
        <Suspense fallback={<div>Loading...</div>}>
            <Form
            type = "Edit"
            post={post}
            setPost= {setPost}
            submiting={submiting}
            handleSubmit = {updatePrompt}
        />
        </Suspense>
    )
}

export default EditPrompt
"use client"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Form from "@components/Form"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Separate component to handle search params
const EditPromptContent = () => {
    const searchParams = useSearchParams();
    const [submiting, setSubmiting] = useState(false)
    const router = useRouter();
    const [promptId, setPromptId] = useState(null);

    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    useEffect(() => {
        const id = searchParams.get('id');
        setPromptId(id);
        
        if(id) {
            const getPromptDetails = async () => {
                try {
                    const response = await fetch(`/api/prompt/${id}`)
                    const data = await response.json()
                    setPost({
                        prompt: data.prompt,
                        tag: data.tag
                    })
                } catch (error) {
                    console.error("Failed to fetch prompt details:", error)
                }
            }
            getPromptDetails();
        }
    }, [searchParams]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmiting(true)
        
        if(!promptId) {
            alert('Prompt Not Found')
            setSubmiting(false)
            return
        }
        
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            
            if(response.ok){
                router.push('/')
            } else {
                const errorData = await response.json();
                console.error("Update failed:", errorData);
                alert('Failed to update prompt')
            }
        } catch (error) {
            console.error(error)
            alert('An error occurred while updating the prompt')
        } finally {
            setSubmiting(false)
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submiting={submiting}
            handleSubmit={updatePrompt}
        />
    )
}

// Wrapper component with Suspense
const UpdatePromptPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditPromptContent />
        </Suspense>
    )
}

export default UpdatePromptPage
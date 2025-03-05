"use client"
import { Suspense, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@components/Form"

// Wrapper component to handle Suspense
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
            const getPromptDetails = async()=> {
                const response = await fetch(`/api/prompt/${id}`)
                const data = await response.json()
                setPost({
                    prompt: data.prompt,
                    tag: data.tag
                })
            }
            getPromptDetails();
        }
    }, [searchParams]);

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
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submiting={submiting}
            handleSubmit={updatePrompt}
        />
    )
}

// Main component with Suspense wrapper
const EditPrompt = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditPromptContent />
        </Suspense>
    )
}

export default EditPrompt
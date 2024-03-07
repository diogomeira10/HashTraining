import { IoSend } from "react-icons/io5";
import { Input } from "./Input"
import { useState, useEffect } from "react";
import { CommentCard } from "./CommentCard";


export function Comments({ onChange, content, postId, username, setComment }) {


    const [comments, setComments] = useState([])

    console.log(comments)

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/post/getComments/${postId}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data = await response.json();
                setComments(data.comments);
            } catch (error) {
                console.log('Error fetching comments')
            }
        }
        fetchComments()
    }, [comments])

    const addComment = async () => {
        try {
            const response = await fetch('/api/post/addComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, content, postId }),
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`Failed to add comment: ${response.statusText}`);
            }

            // Parse the response JSON data
            const data = await response.json();

            console.log('Successfuly added comment', data)

            // Return the response data, which should contain the updated post
            return data;
        } catch (error) {
            // Handle any errors
            console.error('Error adding comment:', error);
            throw error;
        }
    };


    const renderedComments = comments.map((post) => {
        return <CommentCard user={post.username} content={post.content} />
    }).reverse()


    const handleSubmit = (e) => {
        e.preventDefault()
        addComment()
        setComment('')

    }

    return <div className='w-full relative'>
        <div className='flex flex-col justify-center'>
            {renderedComments}
        </div>


        <form className='flex bottom-44 left-0 right-0 mb-5' onSubmit={handleSubmit}>
            <input placeholder="write your comment here..." className="bg-gray-200 text-gray-800 rounded-lg p-2 text-sm max-w-xs w-full" type='text' value={content} onChange={onChange} />
            <div className='ml-1 mt-1'>
                <button className='text-xl' type="submit">
                    <IoSend />
                </button>
            </div>
        </form>
    </div>

}
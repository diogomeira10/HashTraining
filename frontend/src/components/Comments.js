import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSend } from "react-icons/io5";


import { useState, useEffect } from "react"
import { Input } from "./Input"


export function Comments({ posts, closeComments}) {

    const [comment, setComment] = useState('')

    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventeDefault()
    }



    return <div className='w-full relative'>
    <form className='flex bottom-44 left-0 right-0 mb-5' onSubmit={handleSubmit}>
        <Input className='w-full' type='text' value={comment} onChange={handleCommentChange} />
        <div className='absolute right-2 top-1'>
        <IoSend />
        </div>

    </form>
</div>

}
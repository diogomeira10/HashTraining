import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSend } from "react-icons/io5";


import { useState, useEffect } from "react"
import { Input } from "./Input"


export function Comments({ posts }) {

    const [comment, setComment] = useState('')

    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventeDefault()
    }



    return <div className='border w-full h-screen relative'>
    <div className='flex justify-center'>
        <div className='text-xl absolute left-5'><IoMdArrowRoundBack /></div>
        <div>Comments</div>
    </div>
    <form className='flex absolute bottom-44 left-0 right-0' onSubmit={handleSubmit}>
        <Input className='w-full' type='text' value={comment} onChange={handleCommentChange} />

        <div className='absolute right-2 top-1'>
        <IoSend />
        </div>

    </form>
</div>

}
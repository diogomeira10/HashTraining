import { useState } from "react";
import { LiaPhotoVideoSolid } from "react-icons/lia";


export function AddPost({ userId }) {
  const [imgUrlInput, setImgUrlInput] = useState("");
  const [content, setContent] = useState("");
  console.log(content)
  console.log(imgUrlInput)

  const handleImageUrlChange = (event) => {
    setImgUrlInput(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault()
    handleAddPost()

  }

  const handleAddPost = async () => {
    console.log("clicked")
    try {
      const response = await fetch("/api/addPost", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, author: userId, imageUrl: imgUrlInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to add post');
      }

      const data = await response.json();
      console.log('Post added successfully:', data);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="text-white">


      <div className="flex justify-center mt-20">
        <form className="flex flex-col" onSubmit={handlePostSubmit}>
          <label className="font-bold mb-2">Image Url</label>
          <input
            className="text-white border"
            type="text"
            value={imgUrlInput}
            onChange={handleImageUrlChange}
            style={{ backgroundColor: '#333553', borderRadius: '5px', borderColor: '#419EF4' }}
          />
          <br />
          <label className="font-bold mb-2">Description</label>
          <input
            className="text-white border"
            type="text"
            value={content}
            onChange={handleContentChange}
            style={{ backgroundColor: '#333553', borderRadius: '5px', borderColor: '#419EF4' }}
          />

          <div className="flex justify-center">
            <button style={{ borderColor: '#419EF4' }} className="mt-5 border-2 rounded-xl w-24 font-bold p-2">Add Post</button>
          </div>
        </form>
      </div>



      <div className="flex justify-center">
        <div className="flex flex-col gap-7 justify-center items-center border rounded-xl w-4/5 h-52  border-white text-9xl fixed bottom-16" style={{ borderColor: '#419EF4' }}>
          <div className="font-bold text-base">Photo/Video</div>
          <LiaPhotoVideoSolid style={{ fill: '#419EF4' }} />
        </div>
      </div>
    </div>
  );
}
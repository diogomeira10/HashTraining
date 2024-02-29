import { useState } from "react";

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


  const handleAddPost = async () => {
    console.log("clicked")
    try {
      const response = await fetch("/api/addPost", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({content, author: userId, imageUrl: imgUrlInput}),
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
      <div>AddPost</div>
      <div>
        <form onSubmit= {handleAddPost}>
          <label>ImgUrl</label>
          <input className="text-black" type="text" value={imgUrlInput} onChange={handleImageUrlChange} />
          <br/>
          <label>Content</label>
          <input className="text-black" type="text" value={content} onChange={handleContentChange} />
          <button>Click me</button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { Input } from "../../components/Input";


export function AddPost({ userId }) {

  const [imgUrlInput, setImgUrlInput] = useState("");
  const [content, setContent] = useState("");
  const [sport, setSport] = useState('')
  console.log(content)
  console.log(imgUrlInput)
  console.log(sport)
  console.log(userId)

  const handleImageUrlChange = (event) => {
    setImgUrlInput(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSportChange = (event) => {
    setSport(event.target.value)
  }

  const handlePostSubmit = (e) => {
    e.preventDefault()
    handleAddPost()
    setImgUrlInput("")
    setContent("")
    setSport("")


  }

  const handleAddPost = async () => {
    console.log("clicked")
    try {
      const response = await fetch("/api/addPost", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, author: userId, imageUrl: imgUrlInput, sport }),
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
    <div className="text-white pt-16">
      <div className="flex justify-center mt-20">
        <form className="flex flex-col" onSubmit={handlePostSubmit}>
          <label className="font-bold mb-2">Image Url</label>
          <Input type="text"
            value={imgUrlInput}
            onChange={handleImageUrlChange} />
          <br />
          <label className="font-bold mb-2">Description</label>
          <Input type="text"
            value={content}
            onChange={handleContentChange} />
          <label className="font-bold mb-2 mt-5">Sport</label>
          <Input type="text"
            value={sport}
            onChange={handleSportChange} />

          <div className="flex justify-center">
            <button className="mt-10 border-2 border-blue  rounded-xl w-28 font-bold p-2 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">Add Post</button>
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

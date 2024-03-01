import { FaRegHeart } from "react-icons/fa";
import { PiPlugBold } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";


export function Post({ content, imgUrl, username }) {

    console.log(username)

    return (
        <div>
            <div className='w-80 h-96'>
                <div className='flex items-center mb-3'>
                    <img className='{w-10 h-10 rounded-full' src='https://ekcfbmsotzc.exactdn.com/en/blog/wp-content/uploads/2021/08/Soccer-Cristiano-Ronaldo.png?strip=all&lossy=1&ssl=1}' alt="post_image" />
                    <div className="ml-3 font-bold">cristiano</div>
                </div>
                <div className='max-w-full h-full overflow-hidden'>
                    <img className='w-full h-full object-cover rounded-xl' src={imgUrl} alt='post_image' />
                </div>
                <div className='flex gap-3 mt-2 ml-2'>
                    <FaRegHeart className="text-xl" />
                    <PiPlugBold className="text-xl" />
                    <FaRegComment className="text-xl" />
                </div>
                <div className='flex gap-5 ml-2 mt-2'>
                    <p className='font-bold'>{username}</p>
                    <p className="font-thin">{content}</p>
                </div>
            </div>

        </div>
    )
}
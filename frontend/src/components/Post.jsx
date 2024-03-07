//Sports Icons
import { IoMdFootball } from "react-icons/io"; //futebol
import { FaFootballBall } from "react-icons/fa"; //raguebi
import { MdSportsTennis } from "react-icons/md"; //tenis
import { FaBasketballBall } from "react-icons/fa"; //basketball
import { FaPersonSwimming } from "react-icons/fa6"; //swimming
import { RiBoxingFill } from "react-icons/ri";  //Boxing
import { MdOutlineSurfing } from "react-icons/md"; //Surfing
import { MdSkateboarding } from "react-icons/md"; //Skateboarding
import { FaSnowboarding } from "react-icons/fa"; //Snowboarding
import { BiCycling } from "react-icons/bi"; //BiCycling
import { FaVolleyballBall } from "react-icons/fa"; //VolleyballBall


//Profile icons
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";


//plugs
import { PiPlugsBold } from "react-icons/pi";
import { PiPlugsConnectedBold } from "react-icons/pi";



import { useEffect, useState } from "react";
import { Comments } from './Comments';




export function Post({ content, imgUrl, username, sport, showProfile, setUsername, postId, userLogedIn }) {



    const [profileImage, setProfileImage] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const [isConnected, setIsConnected] = useState(false);
    const [showComments, setShowComments] = useState(false)
    const [comment, setComment] = useState('')
    const [likes, setLikes] = useState(null)
    // console.log(showComments)
    // console.log(comment)
    // console.log(postId)

    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }

    const handleOpenComments = () => {
        setShowComments(!showComments)
    }

    const handleCloseComments = () => {
        setShowComments(false)
    }


    const handleHeartClick = () => {
        setIsLiked(!isLiked)
        handleLikePost()
    }

    const handleLightningClick = () => {
        setIsConnected(!isConnected);
        addFriendShip()
    };

    useEffect(() => {
        const getProfileImage = async () => {
            try {
                const response = await fetch(`/api/profilePicture/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch number of posts');
                }
                const data = await response.json();
                setProfileImage(data.profileImage);
            } catch (error) {
                console.error('Error fetching number of posts:', error);
                setProfileImage(null);
            }
        };

        const getLikesOfPost = async () => {
            try {
                const response = await fetch(`/api/post/getLikes/${postId}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch likes');
                }

                const data = await response.json()
                setLikes(data.likes.length)

                if (data.likes.includes(username)) {
                    setIsLiked(true)
                }
                console.log('Likes', data.likes)

            } catch (error) {
                console.error('Error fetching likes:', error);
            }




        }
        const getUserFriends = async () => {
            try {
                const response = await fetch(`/api/friends/${userLogedIn}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch user friends');
                }
                const data = await response.json()
                console.log(data)

                const isFriend = data.some(friend => friend.friend === username);
                console.log(data)
                if (isFriend) {
                    setIsConnected(true);
                }

            } catch (error) {
                console.error('Error fetching number of posts', error);

            }
        }


        getUserFriends()
        getLikesOfPost()
        getProfileImage()
    }, [])



    const getSportIcon = (sport) => {
        switch (sport.toLowerCase()) {
            case "football":
                return <IoMdFootball />;
            case "rugby":
                return <FaFootballBall />;
            case "tennis":
                return <MdSportsTennis />;
            case "basketball":
                return <FaBasketballBall />;
            case "swimming":
                return <FaPersonSwimming />;
            case "boxing":
                return <RiBoxingFill />;
            case "surfing":
                return <MdOutlineSurfing />;
            case "skateboarding":
                return <MdSkateboarding />;
            case "snowboarding":
                return <FaSnowboarding />;
            case "cycling":
                return <BiCycling />;
            case "volleyball":
                return <FaVolleyballBall />;
            default:
                return null;
        }
    };

    const handleUserClick = () => {
        showProfile()
        setUsername(username)
    }

    const handleLikePost = async () => {
        try {
            const response = await fetch(`/api/post/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username })
            })

            if (!response.ok) {
                throw new Error('Failed to like/unlike post');
            }

            const data = await response.json()
            console.log(data.message)

        } catch (error) {
            console.error('Error liking/unliking post:', error);
        }
    }

    const addFriendShip = async () => {
        try {
            const response = await fetch('/api/addFriend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user1: userLogedIn, user2: username }),
            });

            if (!response.ok) {
               
                throw new Error('Error adding friendship');
            }

            const friendship = await response.json();
            console.log('Friendship added:', friendship);
            return friendship;
        } catch (error) {
            console.error('Error adding friendship:', error.message);
            throw error;
        }
    }

    return (
        <div>
            <div className='w-80 h-96 mb-36'>

                <div onClick={handleUserClick} className='flex justify-between items-center mb-3'>
                    <div className='flex items-center'>
                        <img className='{w-10 h-10 rounded-full' src={profileImage} alt="post_image" />
                        <div className="ml-3 font-bold">{username}</div>
                    </div>
                    <div className='text-2xl'>{getSportIcon(sport)}</div>
                </div>


                <div className='max-w-full h-full overflow-hidden'>
                    <img className='w-full h-full object-cover rounded-xl' src={imgUrl} alt='post_image' />
                </div>
                <div className='flex gap-6 mt-2 ml-2'>
                    <div className="heart-container " onClick={handleHeartClick}>
                        <div className={`heart-icon ${isLiked ? 'liked' : ''}`}>
                            {isLiked ? <FaHeart className="text-xl" style={{ color: '#419EF4' }} /> : <FaRegHeart className="text-xl" />}
                        </div>
                    </div>
                    {(username !== userLogedIn && <div onClick={handleLightningClick} className="lightning-container">
                        {isConnected ? (
                            <PiPlugsConnectedBold className={`text-xl text-yellow-500 ml-4 ${isConnected ? 'connected' : ''}`} />
                        ) : (
                            <div className={`lightning text-xl ml-4 ${isConnected ? 'connected' : ''}`}><PiPlugsBold /></div>
                        )}
                    </div>)}

                    <div className='' onClick={handleOpenComments}>
                        <FaRegComment className="text-xl" />

                    </div>
                </div>
                <div className='flex gap-5 ml-2 mt-2'>
                    <p className='font-bold'>{username}</p>
                    <p className="font-thin mt-1 text-xs">{content}</p>
                </div>
            </div>
            {showComments && <Comments setComment={setComment} username={username} postId={postId} content={comment} onChange={handleCommentChange} closeComments={handleCloseComments} />}

        </div>
    )
}
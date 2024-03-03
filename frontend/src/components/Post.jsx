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
import { PiPlugBold } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";


export function Post({ content, imgUrl, username, sport}) {
    console.log(sport)

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



    return (
        <div>
            <div className='w-80 h-96 mb-40'>
                
                    <div className='flex justify-between items-center mb-3'>
                        <div className='flex items-center'>
                        <img className='{w-10 h-10 rounded-full' src='https://ekcfbmsotzc.exactdn.com/en/blog/wp-content/uploads/2021/08/Soccer-Cristiano-Ronaldo.png?strip=all&lossy=1&ssl=1' alt="post_image" />
                        <div className="ml-3 font-bold">{username}</div>
                        </div>
                        <div className='text-2xl'>{getSportIcon(sport)}</div>
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
                    <p className="font-thin mt-1 text-xs">{content}</p>
                </div>
            </div>
        </div>
    )
}
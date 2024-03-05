import { useState, useEffect} from "react"
import { Comments } from "../../components/Comments"

import { FriendCard } from "../../components/FriendCard"

export function Friends ({userId, userLogedIn}) {

    const [connectionsList, setConnectionsList] = useState([])
    console.log('I am the connections List', connectionsList)


    useEffect(() => {
        const getUserFriends = async () => {
            try{
              const response = await fetch(`/api/friends/${userLogedIn}`)
              if(!response.ok) {
                throw new Error('Failed to fetch user friends');
              }
              const data = await response.json()
              setConnectionsList(data)
            } catch (error) {
              console.error('Error fetching number of posts', error);
              setConnectionsList(null);
            }
          }

          getUserFriends()
    }, [])

    const renderedFriends = connectionsList.map((friendship) => {

        let friend 
        if(friendship.user === userLogedIn) {
            friend = friendship.friend
        } else {
            friend = friendship.user
        }

        return <FriendCard friend={friend} />
    })

    return <div className="text-white flex flex-col items-center mt-28 h-full"> 
    
    <div style={{ color: '#419EF4'}} className='mb-12 font-bold text-2xl'>#Connections</div>
    <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)',backgroundColor: '#333553', borderColor: '#419EF4',  height: '100vh' }} className='flex justify-center border w-4/5 p-8 rounded '>
        {renderedFriends}
    </div>
</div>

}
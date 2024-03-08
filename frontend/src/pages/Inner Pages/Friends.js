import { useState, useEffect } from "react";
import { FriendCard } from "../../components/FriendCard";
import { Chat } from "../../components/Chat";

export function Friends({ userLogedIn }) {
  const [connectionsList, setConnectionsList] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [showChat, setShowChat] = useState(false);
  console.log(showChat);


  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false)
  }


  console.log(selectedFriend);

  useEffect(() => {});

  useEffect(() => {
    const getUserFriends = async () => {
      try {
        const response = await fetch(`/api/friends/${userLogedIn}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user friends");
        }
        const data = await response.json();
        setConnectionsList(data);
      } catch (error) {
        console.error("Error fetching number of posts", error);
        setConnectionsList([]);
      }
    };

    getUserFriends();
  }, []);

  const renderedFriends = connectionsList.map((friendship) => {
    let friend;
    if (friendship.user === userLogedIn) {
      friend = friendship.friend;
    } else {
      friend = friendship.user;
    }

    return (
      <div key={friendship._id} >
        <FriendCard openChat={() => handleSelectFriend(friend)} friend={friend} />
      </div>
    );
  });

  return (
    <div className="text-white flex flex-col items-center mt-28 h-full">
      <div style={{ color: "#419EF4" }} className="mb-12 font-bold text-2xl">
        #Connections
      </div>
      <div
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
          backgroundColor: "#333553",
          borderColor: "#419EF4",
          height: "100vh",
        }}
        className="flex gap-3 flex-col items-center border w-4/5 p-8 rounded "
      >
        {renderedFriends}
      </div>
      {showChat && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <Chat
              showChat={showChat}
              user={userLogedIn}
              friend={selectedFriend}
              onClose={handleCloseChat}
            />
        </div>
      )}
    </div>
  );
}

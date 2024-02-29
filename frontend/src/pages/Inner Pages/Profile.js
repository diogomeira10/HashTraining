import { FaBoltLightning } from "react-icons/fa6";

export function Profile({userId}) {
  return (
    <div className="text-white font-bold">
      <div className="flex justify-center mt-16 gap-6">
        <div className="flex-col">
          <img src={{}} alt="user_img" />
          <p>User Name</p>
        </div>

        <div>
          <div className="flex-col">
            <div className="flex justify-around gap-5">
              <p>14</p>
              <p>135</p>
              <p>33</p>
            </div>
            <div className="flex justify-around gap-5">
              <p>Posts</p> 
              <p>Connections</p>
              <p>Follows</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-14 border-b-2 border-blue-400">
      <FaBoltLightning style={{color: "yellow"}} />
      <p>Invite to Train</p>
      </div>
    </div>
  );
}

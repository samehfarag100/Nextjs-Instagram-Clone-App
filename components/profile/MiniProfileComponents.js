import { signOut, useSession } from "next-auth/react";
import React from "react";

const MiniProfileComponents = () => {
  const { data: session } = useSession();

  return (
    <div className="">
      <div className="flex items-center justify-between space-x-4 mt-14 ml-10 p-5">
        {/* User Image Profile */}
        <div>
          <img
            onClick={signOut}
            className="h-14 w-14 rounded-full border p-1 hover:scale-125 
            cursor-pointer transition duration-200 ease-in-out"
            src={session?.user?.image}
            alt=""
          />
        </div>
        {/* User Info Profile */}
        <div>
          <p className="font-bold">{session?.user?.username}</p>
          <p className="text-sm">Welcome To Instagram</p>
        </div>
        {/* User Sign Out Profile */}
        <div>
          <button
            className="text-blue-500 font-semibold cursor-pointer"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniProfileComponents;

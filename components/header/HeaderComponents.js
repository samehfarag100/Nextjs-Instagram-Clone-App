import Image from "next/image";
import React from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modelState } from "@/atoms/modelAtioms";
const HeaderComponents = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modelState);
  
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between mx-5 lg:mx-auto max-w-6xl">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="md:relative hidden md:inline-flex w-24 cursor-pointer"
        >
          <Image
            alt=""
            layout="fill"
            objectFit="contain"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative md:hidden w-10 flex-shrink-0 cursor-pointer"
        >
          <Image
            alt=""
            layout="fill"
            objectFit="contain"
            src="https://1000logos.net/wp-content/uploads/2017/02/insta-logo.png"
          />
        </div>
        {/* Middle - search input field */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md ">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 pl-10 w-full block 
             sm:text-sm border-gray rounded-md focus:border-black focus:ring-black"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center justify-end md:space-x-4 space-x-2">
          <div>
            <HomeIcon onClick={() => router.push("/")} className="nav_icon" />
          </div>
          <div>
            <MenuIcon className="h-6 md:hidden cursor-pointer" />
          </div>
          {session ? (
            <>
              <div className="relative nav_icon">
                <PaperAirplaneIcon className="nav_icon " />
                <div
                  className="absolute flex items-center justify-center -top-1 -right-2 bg-red-500 
            h-4 w-4 text-white rounded-full text-sm animate-pulse"
                >
                  3
                </div>
              </div>
              <div>
                <PlusCircleIcon
                  onClick={() => setOpen(true)}
                  className="nav_icon"
                />
              </div>
              <div>
                <UserGroupIcon className="nav_icon" />
              </div>
              <div>
                <HeartIcon className="nav_icon" />
              </div>
              <>
                <img
                  onClick={signOut}
                  className="h-10 w-10 rounded-full cursor-pointer"
                  src={session?.user?.image}
                />
              </>
            </>
          ) : (
            <button onClick={signIn} className="text-blue-500 font-semibold">
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderComponents;

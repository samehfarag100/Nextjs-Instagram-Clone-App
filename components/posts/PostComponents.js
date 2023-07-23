import React from "react";
import {
  DotsHorizontalIcon,
  BookmarkIcon,
  ChatIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

import Moment from "react-moment";
import usePostHooks from "@/Hook/post/usePostHooks";
const PostComponents = ({ id, caption, userImg, image, username }) => {
  const [
    session,
    comment,
    setComment,
    comments,
    setComments,
    likes,
    setLikes,
    hasLiked,
    setHasLiked,
    sendComment,
    likePost,
  ] = usePostHooks({id});

  return (
    <div className="bg-white my-7 p-2  border rounded-sm shadow">
      {/* ################### Header ################### */}
      <div className="flex justify-between items-center p-5">
        {/* User Info */}
        <div className="flex items-center space-x-3 ">
          <img
            className="w-12 h-12 rounded-full object-contain border p-1 mr-3 cursor-pointer "
            src={userImg}
            alt=""
          />
          <p className="flex-1 font-bold">{username}</p>
        </div>
        {/* Dot Icon */}
        <div>
          <DotsHorizontalIcon className="h-6 text-gray-500 cursor-pointer" />
        </div>
      </div>
      {/* ################### Image ################### */}
      <div>
        <img src={image} className="object-cover w-full" />
      </div>
      {/* ################### Buttons ################### */}
      <div className="flex justify-between items-center pt-4 px-4">
        {/* Left Icons */}
        {session && (
          <div className="flex items-center space-x-3">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="post_btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="post_btn" />
            )}

            <ChatIcon className=" post_btn " />
            <PaperAirplaneIcon className="post_btn" />
          </div>
        )}
        {/* Right Icon */}
        <div>
          <BookmarkIcon className="post_btn" />
        </div>
      </div>
      {/* ################### Captions ################### */}
      <div className=" space-x-3 p-5 mr-1">
        <p>
          {likes.length > 0 && (
            <p className="font-bold mb-1">{likes.length} likes</p>
          )}
        </p>
        <div className="flex items-center space-x-3">
          <p className="font-bold cursor-pointer">{username}</p>
          <p className="text-sm truncate">{caption}</p>
        </div>
      </div>
      {/* ################### Comments ################### */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-hide">
          {comments.map((item) => (
            <div key={item.id} className="flex items-center space-x-2 mb-3">
              <img
                src={item.data().userImage}
                className="h-7 rounded-full"
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{item.data().username}</span>{" "}
                {item.data().comment}
              </p>
              <Moment className="pr-5 text-xs" fromNow>
                {item.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {/* ################### Input Box ################### */}
      {session && (
        <form className="flex items-center p-4 ">
          {/* Emoji Icons && Input Field */}
          {/* Emoji Icons */}
          <EmojiHappyIcon className="h-6" />
          {/* Input Field */}
          <input
            className="outline-none border-none focus:ring-0 flex-1"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a Comment..."
          />
          {/* Add Button */}
          <button
            type="submit"
            disabled={!comment}
            className="font-semibold text-blue-500 disabled:bg-red-300
           disabled:text-black disabled:p-1 disabled:cursor-not-allowed 
           disabled:rounded-lg"
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default PostComponents;

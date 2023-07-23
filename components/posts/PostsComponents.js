import React from "react";
import PostComponents from "./PostComponents";
import usePostsHook from "@/Hook/post/usePostsHook";

const PostsComponents = () => {
  const [posts] = usePostsHook();
  return (
    <div className="p-2">
      {/* This Components Will Have All Posts */}
      {posts.map((item) => (
        <PostComponents
          id={item.id}
          key={item.data().id}
          caption={item.data().caption}
          username={item.data().username}
          image={item.data().image}
          userImg={item.data().userImage}
        />
      ))}
    </div>
  );
};

export default PostsComponents;

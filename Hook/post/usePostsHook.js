import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
const usePostsHook = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, [db]);

  return [posts]
};

export default usePostsHook;

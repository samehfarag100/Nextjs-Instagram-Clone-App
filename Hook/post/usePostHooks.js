import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";

const usePostHooks = ({ id }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");
    // This Code To Add New Field In Collection Posts
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      email: session.user.email,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  // This Code To Get All Comments From Firestore
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db]);

  // This Code To Get All Likes From New Filed Called (Likes) In Collection (posts)

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, []);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session.user.uid) !== -1);
  }, [likes]);

  return [
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
  ];
};

export default usePostHooks;

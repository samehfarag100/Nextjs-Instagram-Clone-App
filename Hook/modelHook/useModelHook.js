import React, { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modelState } from "@/atoms/modelAtioms";
import { db, storage } from "@/firebase";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
const useModelHook = () => {
  const [open, setOpen] = useRecoilState(modelState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  // this function to Upload Photo
  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);
    // 1) Create a Post and add To Firestore 'Posts' Collection
    // 2) get the Post ID for the newly Created post
    // 3) Upload the image To Firebase Storage With The Post ID
    // 4) get a Download URL From fb Storage and update the Original Posts Collection With Image

    // 1) Step => 1
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.name,
      email: session.user.email,
      userImage: session.user.image,
      caption: captionRef.current.value,
      timestamp: serverTimestamp(),
    });

    // console.log("New doc added with ID", docRef.id);
    // 1) Step => 2 + Step => 3
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        // 4) step => 4

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  // this function to selected photo that we want
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return [
    open,
    setOpen,
    filePickerRef,
    captionRef,
    selectedFile,
    setSelectedFile,
    loading,
    setLoading,
    session,
    uploadPost,
    addImageToPost,
  ];
};

export default useModelHook;

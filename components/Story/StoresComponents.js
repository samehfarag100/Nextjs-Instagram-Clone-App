import React, { useEffect, useState } from "react";
import StoryComponents from "./StoryComponents";
import createRandomUser from "@/faker";
import { useSession } from "next-auth/react";
const StoresComponents = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const suggestions = [...Array(20)].map(() => createRandomUser());
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="flex space-x-2 p-6 mt-8 border-gray-200 
    border rounded-sm overflow-x-scroll scrollbar-hide">

      {
        session && (
          <StoryComponents image={session.user.image} username={session.user.username} />
        )
      }
      {suggestions &&
        suggestions.map((profile) => (
          <StoryComponents
            key={profile.id}
            image={profile?.avatar}
            username={profile?.username}
          />
        ))}
    </div>
  );
};

export default StoresComponents;

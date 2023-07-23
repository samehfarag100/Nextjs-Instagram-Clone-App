import createRandomUser from "@/faker";
import React, { useEffect, useState } from "react";

const SuggestionsComponents = () => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map(() => createRandomUser());
    setSuggestions(suggestions);
  }, []);

  return (
    <div className=" mt-4 ml-10 p-5">
      {/* Suggestions Tittle && See all Button */}
      <div className="flex justify-between mb-5">
        <h3>Suggestions For You..</h3>
        <button>See All</button>
      </div>
      {/* Users Suggestions */}

      {suggestions.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center space-x-5 space-y-5 "
        >
          {/* User Suggestions Image */}
          <div className="hover:scale-125 cursor-pointer transition duration-200 ease-in-out">
            <img
              className="h-14 w-14 rounded-full border p-1"
              src={item.avatar}
              alt=""
            />
          </div>
          {/* User Suggestions Info */}
          <div className="truncate flex-1 ">
            <p className="font-bold cursor-pointer">{item.username}</p>
            <p className="text-sm">{item.company}</p>
          </div>
          {/* Suggestions Follow Buttons */}
          <div className="text-blue-500 font-semibold cursor-pointer">
            <button>Follow</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestionsComponents;

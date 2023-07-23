import React from "react";
import StoresComponents from "../Story/StoresComponents";
import PostsComponents from "../posts/PostsComponents";
import MiniProfileComponents from "../profile/MiniProfileComponents";
import SuggestionsComponents from "../profile/SuggestionsComponents";
import { useSession } from "next-auth/react";

const FeedComponents = () => {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl
      xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}
    >
      {/* ########## Section-1 ########## */}
      {/* Clo-span-2 this mean that this section will contain two column */}
      <section className="col-span-2">
        {/* Stories */}
        <StoresComponents />
        {/* Posts */}
        <PostsComponents />
      </section>

      {/* ########## Section-2 ########## */}
      {session && (
        <section className="hidden xl:inline-grid md:col-span-1">
          <div>
            {/* Mini Profile */}
            <MiniProfileComponents />
            {/* Suggestions */}
            <SuggestionsComponents />
          </div>
        </section>
      )}
    </main>
  );
};

export default FeedComponents;

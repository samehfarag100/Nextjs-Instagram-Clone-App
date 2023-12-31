import Head from "next/head";
import { Inter } from "next/font/google";
import HeaderComponents from "@/components/header/HeaderComponents";
import FeedComponents from "@/components/feed/FeedComponents";
import { useSession } from "next-auth/react";
import ModelComponents from "@/components/model/ModelComponents";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <HeaderComponents />
      {session ? (
        <>
          <FeedComponents />
          <ModelComponents />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1
            className="bg-red-600 p-3 text-white font-medium rounded-lg cursor-pointer"
            onClick={() => router.push("/auth/signin")}
          >
            Please Sign In
          </h1>
        </div>
      )}
    </div>
  );
}

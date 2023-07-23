import React from "react";
import { getProviders, signIn } from "next-auth/react";
import HeaderComponents from "@/components/header/HeaderComponents";

const signin = ({ providers }) => {
  return (
    <>
      <HeaderComponents />
      <div
        className="flex flex-col justify-center items-center
       min-h-screen py-2 px-14 -mt-56 text-center"
      >
        <img
          className="w-90 h-52 mt-32 "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png"
          alt=""
        />
        <p className="font-bold text-sm italic">
          This is not a Real App, it is built For Educational Purpose only.
        </p>
      </div>
      <div className="mt-40">
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="flex items-center justify-center">
            <button
              className="p-3 bg-blue-500 rounded-lg text-white "
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              sign In with {provider.name}{" "}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default signin;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

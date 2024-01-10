"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

export default function page({}: Props) {
  const router = useRouter();
  const handleSubmit = () => {
    // have pop up that confirms transaction will be completed
    // toast on confirmation
    router.push("/dashboard");
  };
  return (
    <div className="bg-white p-4 rounded-lg m-4 w-fill flex flex-col justify-between grow gap-4 grow">
      <div>
        <h2>User Profile</h2>
        <p>Name</p>
        <p>last transaction</p>
      </div>
      <div>display points</div>
      <div className="flex flex-row gap-4 justify-center my-4">
        <button className="w-16 h-16 rounded-full text-xs ring-4">
          Reward 1
        </button>
        <button className="w-16 h-16 rounded-full text-xs ring-4">
          Reward 2
        </button>
        <button className="w-16 h-16 rounded-full text-xs bg-neutral-300 text-neutral-700">
          Reward 3
        </button>
        <button className="w-16 h-16 rounded-full text-xs bg-neutral-300 text-neutral-700">
          Reward 4
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-pink-600 text-lg py-4 px-8 text-white rounded-xl m-auto"
      >
        Confirm
      </button>
    </div>
  );
}

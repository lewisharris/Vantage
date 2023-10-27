import React from "react";

type Props = {};

export default function Members({}: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-white p-4 rounded-lg m-4 w-fill flex flex-row justify-between">
        <button className="bg-indigo-600 text-white p-4 rounded-xl">
          Export members
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg m-4 w-fill flex flex-col justify-between">
        <div className="flex flex-row justify-between">
          <button className="bg-indigo-600 text-white p-4 rounded-xl w-40">
            Filter
          </button>
          <button className="bg-indigo-600 text-white p-4 rounded-xl">
            Search members
          </button>
        </div>
        <div className="flex flex-col gap-2 overflow-scroll">
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
          <div className="border-b-2 p-2 ">Member Table entry</div>
        </div>
      </div>
    </div>
  );
}

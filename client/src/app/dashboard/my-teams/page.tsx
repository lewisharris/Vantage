import React from "react";

type Props = {};

export default function MyTeams({}: Props) {
  return (
    <div className="mt-14 w-full h-full">
      <div className="bg-white m-6 p-6 rounded-lg">
        <h1 className="text-2xl">Search Employees</h1>
        <button></button>
      </div>
      <div className="bg-white m-6 p-6 rounded-lg flex flex-col gap-4">
        <h3 className="text-lg">My Teams</h3>
        <div className="flex flex-row gap-4">
          <button className="border-2 bg-indigo-600 border-indigo-600 border-solid rounded-md h-32 w-32 flex">
            <p className="m-auto text-sm text-white text-bold">London East</p>
          </button>
          <button className="border-2 bg-pink-600 border-pink-600 border-solid rounded-md h-32 w-32 flex">
            <p className="m-auto text-sm text-white text-bold">
              London Shoreditch
            </p>
          </button>
          <button className="border-2 border-color-slate-200 border-dashed rounded-md h-32 w-32 flex">
            <p className="m-auto text-5xl text-slate-200">+</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-white m-6 p-6 rounded-lg grow">
        <h1 className="text-2xl">London East</h1>
        <div>Team Size</div>
        <div>Team Members</div>
        <div>Add Team Members</div>
        <div>Delete Team</div>
      </div>
    </div>
  );
}

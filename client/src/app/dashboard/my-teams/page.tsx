"use client";
import React, { useState } from "react";
import { useCreateNewTeamMember } from "../../../hooks/account";

type Props = {};

export default function MyTeams({}: Props) {
  const [createUser, setCreateUser] = useState(false);
  const [createTeamMember, { data, loading, error }] = useCreateNewTeamMember({
    onCompleted: data => {
      console.log(data);
    },
    onError: error => {
      return error;
    }
  });
  // createTeamMember({ variables: { input: { id: "123" } } })

  return (
    <div className="mt-14 w-full h-full">
      <div className="bg-indigo-300 flex flex-row text-white">
        {createUser ? (
          <>
            <div className="w-screen z-10 h-screen opacity-50 bg-black absolute top-0 left-0"></div>
            <div className="text-black w-[50vw] h-[50vh] fixed z-20 left-0 top-0 rounded-3xl bg-white m-auto translate-x-1/2 translate-y-1/2 drop-shadow-xl">
              <p>Modal with overlay that closes it</p>
            </div>
          </>
        ) : null}
        <button
          onClick={() => setCreateUser(true)}
          className="p-2 bg-indigo-500"
        >
          Create team member +
        </button>
        <button className="p-2 ml-auto bg-indigo-500">Export Data</button>
      </div>
      <div className="bg-white m-6 p-6 rounded-lg flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <button className="border-2 bg-indigo-400 border-indigo-400 border-solid rounded-md h-14 w-32 flex">
            <p className="m-auto text-sm text-white text-bold">London East</p>
          </button>
          <button className="border-2 bg-pink-400 border-pink-400 border-solid rounded-md h-14 w-32 flex">
            <p className="m-auto text-sm text-white text-bold">
              London Shoreditch
            </p>
          </button>
          <button className="border-2 bg-indigo-400 border-indigo-400 border-solid rounded-md h-14 w-32 flex">
            <p className="m-auto text-sm text-white text-bold">London East</p>
          </button>
          <button className="border-2 bg-pink-400 border-pink-400 border-solid rounded-md h-14 w-32 flex">
            <p className="m-auto text-sm text-white text-bold">
              London Shoreditch
            </p>
          </button>
          <button className="border-2 bg-indigo-400 border-indigo-400 border-solid rounded-md h-14 w-32 flex">
            <p className="m-auto text-sm text-white text-bold">London East</p>
          </button>
          <button className="border-2 bg-pink-400 border-pink-400 border-solid rounded-md h-14 w-32 flex">
            <p className="m-auto text-sm text-white text-bold">
              London Shoreditch
            </p>
          </button>
          <button className="border-2 bg-indigo-400 border-indigo-400 border-solid rounded-md h-14 w-32 flex">
            <p className="m-auto text-sm text-white text-bold">London East</p>
          </button>
          <button className="border-2 border-color-slate-200 border-dashed rounded-md h-14 w-32 flex">
            <p className="m-auto text-5xl text-slate-200">+</p>
          </button>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col bg-white m-6 p-6 rounded-lg grow">
          <div>
            <div className="flex flex-row">
              <h2 className="text-2xl">London East</h2>
              <p>[14]</p>
              <div className="ml-auto">
                <button className="bg-indigo-400 h-10 w-10 rounded-lg text-indigo-800 text-2xl font-bold mx-2">
                  +
                </button>
                <button className="bg-red-400 h-10 w-10 rounded-lg text-red-800 text-2xl font-bold mx-2">
                  -
                </button>
              </div>
            </div>
            <ul>
              <li>Buster</li>
              <li>Boster</li>
              <li>Bonstero</li>
              <li>Dave</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col bg-white m-6 p-6 rounded-lg grow">
          <div></div>
        </div>
      </div>
    </div>
  );
}

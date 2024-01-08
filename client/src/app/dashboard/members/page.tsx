import React from "react";
import CreateClient from "../../../components/temp/CreateClient";
import MemberList from "../../../components/members/MembersList";

type Props = {};

export default function Members({}: Props) {
  return (
    <div className="flex flex-col w-full mb-14 sm:mb-auto">
      <div className="bg-white p-4 rounded-lg m-4 w-fill flex flex-row justify-between">
        <CreateClient />
        <button className="bg-indigo-600 text-white p-4 rounded-xl">
          Search members
        </button>
        <button className="bg-indigo-600 text-white p-4 rounded-xl">
          Export members
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg m-4 w-fill flex flex-col justify-start grow gap-4">
        <MemberList />
      </div>
    </div>
  );
}

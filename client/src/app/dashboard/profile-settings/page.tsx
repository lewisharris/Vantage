import React from "react";

type Props = {};

export default function ProfileSettings({}: Props) {
  return (
    <div className="w-full flex flex-row">
      <div className="bg-white m-6 p-6 w-3/6">
        <div>Account Settings</div>
        <div>Name:</div>
        <div>Plan:</div>
        <div>Name:</div>
        <div>Plan:</div>
      </div>
      <div className="bg-white m-6 p-6 w-3/6">
        <div>Account Settings</div>
        <div>Name:</div>
        <div>Plan:</div>
        <div>Name:</div>
        <div>Plan:</div>
      </div>
    </div>
  );
}

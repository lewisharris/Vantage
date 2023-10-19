import React from "react";

type TierCardProps = {
  tier: String;
  price: String;
  buttonColor: String;
};

const TierCard = ({ tier, price, buttonColor }: TierCardProps) => {
  return (
    <div className="box-shadow m-10 text-center p-10 shadow-lg bg-white rounded-lg">
      <h2>{tier}</h2>
      <div>£{price} Per Month</div>
      <button className={`${buttonColor} text-white px-6 py-4 rounded-xl mt-4`}>
        Choose this plan
      </button>
      <div>details</div>
      <div>details</div>
      <div>details</div>
      <div>details</div>
      <div>details</div>
    </div>
  );
};

type Props = {};

export default function Pricing({}: Props) {
  return (
    <div className="flex flex-row justify-centerflex flex-col grow h-screen">
      <div className="flex flex-row justify-center">
        <TierCard tier="Free Trial" price="0" buttonColor="bg-indigo-400" />
        <TierCard tier="Individual" price="35" buttonColor="bg-indigo-600" />
        <TierCard tier="Enterprise" price="60" buttonColor="bg-indigo-800" />
      </div>
    </div>
  );
}

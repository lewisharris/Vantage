import React from "react";

const TierCard = () => {
  return (
    <div className="box-shadow m-10 text-center p-14 w-48 shadow-lg">
      <h3>Tier 1</h3>
      <div>details</div>
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
    <div className="flex flex-row justify-center">
      <TierCard />
      <TierCard />
      <TierCard />
    </div>
  );
}

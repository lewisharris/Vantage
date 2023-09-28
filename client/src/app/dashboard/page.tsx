import React from "react";
import Card from "../../components/dashboard/Card";
type Props = {};

export default function Dashboard({}: Props) {
  return (
    <div className=" mt-14 h-screen w-screen grid overflow-scroll">
      <Card />
      <Card />
    </div>
  );
}

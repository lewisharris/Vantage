import React from "react";

type Props = { children: React.ReactNode };

export default function Card({ children }: Props) {
  return (
    <div className="bg-white m-14 rounded-xl h-80 p-8 grow">
      <div className="">{children}</div>
    </div>
  );
}

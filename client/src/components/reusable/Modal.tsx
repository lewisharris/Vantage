import React, { ReactElement, ReactNode } from "react";

interface Props {
  toggleOpen: () => void;
  content: ReactNode;
}

export default function Modal({ toggleOpen, content }: Props): ReactElement {
  return (
    <>
      <div
        className="w-screen z-10 h-screen opacity-50 bg-black absolute top-0 left-0"
        onClick={toggleOpen}
      ></div>
      <div className="text-black w-[50vw] h-[50vh] fixed z-20 left-0 top-0 rounded-3xl bg-white m-auto translate-x-1/2 translate-y-1/2 drop-shadow-xl">
        {content}
      </div>
    </>
  );
}

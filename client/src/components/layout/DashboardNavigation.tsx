"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

type IconProps = {
  link: string;
  src: string;
  alt: string;
  title?: string;
};
const Icon = ({ src, alt, title, link }: IconProps) => {
  return (
    <Link
      href={link}
      className="p-4 auto flex flex-row cursor-pointer text-gray-600 items-center hover:bg-violet-200 hover:text-violet-900"
    >
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        className="w-6 h-fit opacity-70"
      />
      <span className="pr-4 ml-6 flex flex-row flex-nowrap">{alt}</span>
    </Link>
  );
};

type Props = {};

export default function DashboardNavigation({}: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <div
      className={`${
        isExpanded ? "w-fit" : "w-screen sm:w-14"
      } shrink-0 transition-all grow-0 overflow-hidden bg-white flex flex-row sm:flex-col h-screen shadow-md shadow-slate-300 pt-10`}
    >
      <Link
        href="/dashboard/profile-settings"
        className="my-8 mx-auto text-center font-bold w-8 h-8 text-xs flex flex-row items-center justify-center rounded-full text-lg bg-violet-400"
      >
        V
      </Link>
      {isExpanded ? (
        <button
          onClick={() => {
            setIsExpanded(false);
          }}
          className="p-4 auto flex flex-row cursor-pointer text-gray-600 items-center w-fill"
        >
          <img
            className="w-6 h-fit opacity-70"
            src="/assets/svg/close.svg"
            alt="Close"
            link="/dashboard"
          />
        </button>
      ) : (
        <button
          onClick={() => {
            setIsExpanded(true);
          }}
          className="p-4 auto flex flex-row cursor-pointer text-gray-600 items-center w-fill"
        >
          <img
            className="w-6 h-fit opacity-70"
            src="/assets/svg/open.svg"
            alt="Expand"
            link="/dashboard"
          />
        </button>
      )}

      <Icon src="/assets/svg/grid.svg" alt="Overview" link="/dashboard" />
      <Icon
        src="/assets/svg/graph.svg"
        alt="Analytics"
        link="/dashboard/customer-insight"
      />
      <Icon
        src="/assets/svg/people.svg"
        alt="Members"
        link="/dashboard/members"
      />
      <Icon src="/assets/svg/team.svg" alt="Teams" link="/dashboard/my-teams" />
      <Icon
        src="/assets/svg/card.svg"
        alt="Transactions"
        link="/dashboard/transactions"
      />
      <div className="mt-auto">
        <Icon
          src="/assets/svg/settings.svg"
          alt="Settings"
          link="/dashboard/settings"
        />
      </div>
    </div>
  );
}

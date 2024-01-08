"use client";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useGetAdminUser } from "../../hooks/account";
import UserContext from "../../context/UserContext";

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
      className="p-4 flex flex-row cursor-pointer text-gray-600 items-center hover:bg-violet-200 hover:text-violet-900"
    >
      <Image
        src={src}
        alt={alt}
        width={20}
        height={20}
        className="opacity-70"
      />
      <span className="pr-4 ml-6 flex flex-row flex-nowrap hidden sm:inline">
        {alt}
      </span>
    </Link>
  );
};

type Props = {};

export default function DashboardNavigation({}: Props) {
  const [user] = useContext(UserContext);
  const { data, loading, error } = useGetAdminUser({
    variables: {
      input: user
    },
    onError: error => {
      return error;
    }
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <nav
      className={`${
        isExpanded ? "w-full sm:w-fit" : "w-full sm:w-14"
      } transition-all shrink-0 sm:overflow-hidden justify-between bg-white flex flex-row sm:flex-col h-fill sm:h-[calc(100vh-56px)] shadow-md shadow-slate-300 fixed bottom-0 sm:relative`}
    >
      <Link
        href="/dashboard/profile-settings"
        className="hidden my-8 mx-auto text-center font-bold w-8 h-8 text-xs sm:flex flex-row items-center justify-center rounded-full text-lg bg-violet-400"
      >
        {data?.adminUser?.company?.name
          ? data.adminUser.company.name.charAt(0)
          : "V"}
      </Link>
      {isExpanded ? (
        <>
          <button
            onClick={() => {
              setIsExpanded(false);
            }}
            className="p-4 auto flex flex-row cursor-pointer text-gray-600 items-center w-fill hidden sm:inline"
          >
            <img
              className="w-6 h-fit opacity-70"
              src="/assets/svg/close.svg"
              alt="Close"
              link="/dashboard"
            />
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            setIsExpanded(true);
          }}
          className="p-4 auto flex flex-row cursor-pointer text-gray-600 items-center w-fill hidden sm:inline"
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
      <Link href="/dashboard/scan">
        <Image
          src="/assets/svg/qr.svg"
          alt="scan-qr-code"
          width={60}
          height={50}
          className="cursor-pointer border-solid border-black rounded-full bg-white absolute bottom-8 left-[50vw] z-30 -translate-x-8 p-4 border-solid border-pink-500 border-2"
        />
      </Link>
      <Icon src="/assets/svg/team.svg" alt="Teams" link="/dashboard/my-teams" />
      <Icon
        src="/assets/svg/card.svg"
        alt="Transactions"
        link="/dashboard/transactions"
      />
      <div className="inline sm:m-auto">
        <Icon
          src="/assets/svg/settings.svg"
          alt="Settings"
          link="/dashboard/settings"
        />
      </div>
    </nav>
  );
}

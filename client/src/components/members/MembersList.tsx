"use client";
import React, { ReactElement, useState, useEffect } from "react";
import Image from "next/image";
import { useFindMembers } from "../../hooks/account";
import { User } from "../../types/account";

export default function MembersList(): ReactElement {
  const [isExpandedView, setIsExpandedView] = useState<boolean>(false);
  const companyId = localStorage.getItem("companyId");

  let fetchOptions = {
    variables: { input: companyId },
    fetchPolicy: "cache-and-network"
  };

  const [findMembers, { data, loading }] = useFindMembers();

  const members: [User] = data?.findMembers.users;

  useEffect(() => {
    findMembers(fetchOptions);
  }, [members]);

  const toggleExpandedView = (userId: string) => {
    setIsExpandedView(true);
  };

  return (
    <div className="flex flex-col grow">
      <div className="flex flex-row justify-between gap-6">
        <button className="flex flex-row gap-2 items-center">
          Filter
          <Image
            src="/assets/svg/filter.svg"
            alt="filter"
            height={20}
            width={20}
          />
        </button>
        <button className="flex flex-row gap-2 mr-auto items-center">
          Sort
          <Image
            src="/assets/svg/sort.svg"
            alt="filter"
            height={20}
            width={20}
          />
        </button>
        <button
          disabled={loading}
          onClick={() => {
            findMembers(fetchOptions);
          }}
        >
          <Image
            src="/assets/svg/refreshIcon.svg"
            alt="refresh"
            height={24}
            width={24}
            className={`${loading ? "animate-spin" : null}`}
          />
        </button>
      </div>
      {loading ? (
        <p className="text-center text-xl my-auto">Loading...</p>
      ) : members && !isExpandedView ? (
        <>
          <table
            className={`text-xs sm:text-base ${
              isExpandedView ? "w-0" : "w-fill"
            }`}
          >
            <thead className="border-neutral-300 border-b-2">
              <tr className="h-12 text-left">
                <th className="hidden sm:table-cell">Member ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member: User) => {
                const { id, first_name, last_name, email } = member;
                return (
                  <tr
                    key={id}
                    className="h-12 text-left text-neutral-700 border-b-2 border-neutral-100"
                  >
                    <td className="hidden sm:table-cell text-xs">{id}</td>
                    <td>
                      {first_name.charAt(0).toUpperCase() + first_name.slice(1)}
                    </td>
                    <td>
                      {last_name.charAt(0).toUpperCase() + last_name.slice(1)}
                    </td>
                    <td>{email}</td>
                    <td>
                      <button
                        onClick={() => {
                          toggleExpandedView(id);
                        }}
                      >
                        <Image
                          src="/assets/svg/arrow-right.svg"
                          alt="open"
                          height={14}
                          width={14}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-row justify-between mt-auto">
            <button>
              <Image
                src="/assets/svg/prev.svg"
                alt="prev"
                width={20}
                height={20}
                className="m-4"
              />
            </button>
            <select className="sm:px-6">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <button>
              <Image
                src="/assets/svg/next.svg"
                alt="next"
                width={20}
                height={20}
                className="m-4"
              />
            </button>
          </div>
        </>
      ) : members && isExpandedView ? (
        <div>
          View Member
          <button
            onClick={() => {
              setIsExpandedView(false);
            }}
          >
            x
          </button>
        </div>
      ) : (
        <div className="text-center text-xl my-auto">
          Unable to retrieve members...
        </div>
      )}
    </div>
  );
}

"use client";
import React, { ReactElement, useState, useEffect } from "react";
import Image from "next/image";
import { useFindMembers } from "../../hooks/account";
import { User } from "../../types/account";

export default function MembersList(): ReactElement {
  const [isExpandedView, setIsExpandedView] = useState<boolean>(false);
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    findMembers(fetchOptions);
  }, []);

  let fetchOptions = {
    variables: { input: companyId },
    fetchPolicy: "cache-and-network"
  };

  const [findMembers, { data, loading }] = useFindMembers();

  const members: [User] = data?.findMembers.users;

  const toggleExpandedView = (userId: string) => {
    setIsExpandedView(true);
  };

  return (
    <div className="flex flex-col grow">
      <div className="flex flex-row justify-between gap-4">
        <button>Filter</button>
        <button className="mr-auto">Sort</button>
        <button
          disabled={loading}
          onClick={() => {
            findMembers(fetchOptions);
          }}
        >
          <Image
            src="/assets/svg/refreshIcon.svg"
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
                        +
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-row justify-between mt-auto">
            <button>Prev</button>
            <select className="px-6">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <button>Next</button>
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

"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AuthContext } from "@/context/authContext";
type Props = {};

export default function Dashboard() {
  return <div className=" mt-14 w-screen grid overflow-scroll">Dashboard</div>;
}

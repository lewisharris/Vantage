"use client";
import React, { ReactElement, useState } from "react";
import QrReader from "react-qr-scanner";
import { useRouter } from "next/navigation";

interface Props {}

export default function scan({}: Props): ReactElement {
  const router = useRouter();
  const delay = 100;
  const handleError = (err) => {
    console.error(err);
  };
  const handleScan = (data) => {
    if (data) {
      router.push("/dashboard/scan/confirm");
    }
  };
  return (
    <div className="bg-white p-4 rounded-lg m-4 w-fill flex flex-col justify-between grow">
      <div className="flex flex-row items-center">
        <hr className="border-b border-solid border-2 border-neutral-200 grow m-4"></hr>
        <QrReader
          className="w-56 rounded-xl m-auto"
          delay={delay}
          facingMode="rear"
          onError={handleError}
          onScan={handleScan}
        />
        <hr className="border-b border-solid border-2 border-neutral-200 grow m-4"></hr>
      </div>
      <h2 className="text-center text-2xl text-neutral 600 my-8">
        Please scan qr code
      </h2>
    </div>
  );
}

import Link from "next/link";
import Layout from "./layout";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center w-screen h-screen p-14 text-6xl font-bold ">
        <p>Easily connect with your customers.</p>
        <p className="text-violet-600">{` Reward loyalty`}</p>
      </div>
    </main>
  );
}

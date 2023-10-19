import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VANTAGE",
  description: "Connect with customers",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center w-screen h-screen p-14 text-6xl font-bold ">
        <p>Easily connect with your customers.</p>
        <p className="text-violet-600">{` Reward loyalty`}</p>
        <div>
          <div>
            Are you a business owner looking to supercharge customer engagement
            and loyalty? Look no further! Our CMS Loyalty Platform is here to
            transform your customer relationships and boost your bottom line.
          </div>
        </div>
      </div>
    </main>
  );
}

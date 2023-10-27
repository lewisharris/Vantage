import Link from "next/link";
import Image from "next/image";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-row w-screen h-[calc(100vh-56px)] items-center justify-center">
      <LoginForm />
      <div className="hidden grow w-3/6 sm:flex flex-row items-center justify-center">
        <Image
          src="/assets/images/transaction.jpg"
          alt="transaction"
          width={500}
          height={500 || undefined}
        />
      </div>
    </div>
  );
}

import Link from "next/link";
import { FC } from "react";

const Custom404: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-red-600">Ooops!</h1>
      <h2 className="mt-4 text-2xl">
        The page you are looking for is not there.
      </h2>
      <p className="mt-6 text-lg">
        Go back to{" "}
        <Link href="/">
          <a className="text-blue-500 underline">Home</a>
        </Link>
      </p>
    </div>
  );
};

export default Custom404;

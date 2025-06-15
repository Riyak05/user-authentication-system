"use client";

import Image from "next/image";
import Link from "next/link";

export default function ServerError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        <Image
          src="/images/error-illustration.svg"
          alt="500 Error"
          width={300}
          height={200}
          className="mx-auto mb-8"
        />
        <h1 className="text-5xl font-bold text-gray-900 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Server Error
        </h2>
        <p className="text-gray-600 mb-8">
          We're sorry, but something went wrong on our server. Please try again
          later.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

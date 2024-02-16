"use client";
import Lottie from "lottie-react";
import React from "react";
import animationData from "../../public/Animation - 1707836199018.json";
import Link from "next/link";
const paymentConfirmed = () => {
  return (
    <div className="max-w-[500px] mt-20 mx-auto flex flex-col justify-center items-center">
      <Lottie
        animationData={animationData}
        loop={false}
        className="w-[200px]"
      />
      <h2 className="font-bold text-3xl">Payment Confirmed Successfully</h2>
      <h3 className="text-lg my-5">thank you. </h3>
      <Link
        className="inline-block rounded bg-primary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
        href={"/"}
      >
        Back to Home page
      </Link>
    </div>
  );
};

export default paymentConfirmed;

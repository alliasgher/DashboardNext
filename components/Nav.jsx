"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();

  return (
    <div className="navbar bg-pink-100 text-primary-content">
      <div className="flex justify-between items-center container mx-auto px-4 h-16">
        <div>
          <button
            className="btn btn-glass text-lg text-purple-500"
            onClick={() => router.push("/")}
          >
            Home
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-purple-500">Dashboard</h1>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Nav;

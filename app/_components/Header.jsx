"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
import Cart from "./Cart";

const Header = () => {
  const { user } = useUser();
  const { cart, setCart, openCart, setOpenCart } = useCartContext();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Careers", href: "#" },
    { label: "Services", href: "#" },
    { label: "Projects", href: "#" },
    { label: "About", href: "#" },
  ];

  const getCartItems = () => {
    CartApis.getUserCartItems(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        res?.data?.data.forEach((cItem) => {
          setCart((oldCart) => [
            ...oldCart,
            { id: cItem?.id, product: cItem?.attributes?.products?.data[0] },
          ]);
        });
      }
    );
  };

  useEffect(() => {
    user && getCartItems();
  }, [user]);

  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-primary dark:text-primary" href="/">
              <span className="sr-only">Home</span>
              <Image
                src={"/Dev_Art.png"}
                priority={false}
                width={50}
                alt="Logo"
                height={50}
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                {menuItems.map((menuItem, index) => (
                  <li key={index}>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                      href={menuItem.href}
                    >
                      {menuItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {!user ? (
              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-sky-500"
                  href="/sign-in"
                >
                  Login
                </Link>
                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                    href="/sign-up"
                  >
                    Register
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex gap-5 items-center dark:text-gray-50">
                <h2
                  onClick={() => setOpenCart(!openCart)}
                  className="flex items-center select-none cursor-pointer"
                >
                  <ShoppingCart />({cart?.length}){openCart && <Cart />}
                </h2>
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

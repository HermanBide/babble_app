"use client"
import { sidebarLinks } from '@/constants'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";

const Bottombar = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
      {sidebarLinks.map((link) => {
      const isActive =
        (pathname.includes(link.route) && link.route.length > 1) ||
        pathname === link.route;

      // if (link.route === "/profile") link.route = `${link.route}/${userId}`;

      return (
        <Link
          href={link.route}
          key={link.label}
          className={`bottombar_link ${isActive && "bg-white border-solid border-2 border-gray-200 shadow-md"}`}
        >
          <Image
          style={{ background: "white"}}
            src={link.imgURL}
            alt={link.label}
            width={24}
            height={24}
          />

          <p className='text-subtle-medium text-gray-700 font-bold max-sm:hidden'>{link.label.split(/\s+/)[0]}</p>
        </Link>
      );
    })}
      </div>
    </section>
  )
}

export default Bottombar
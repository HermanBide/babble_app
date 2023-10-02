"use client"
import React from "react";
import { sidebarLinks } from "../../constants/index";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";


const LeftSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  return (
  //   <section className='custom-scrollbar leftsidebar'>
  //   <div className='flex flex-1 w-full flex-col gap-6 px-6'>
  //     {/* Mapping over array of objects from constants file */}
  //     {sidebarLinks.map((link) => {

  //       const isActive = (pathname.includes(link.route) && link.route.length >  1) || pathname === link.route;

  //       return (
  //         <Link key={link.route} href={link.route} className={`leftsidebar_link ${isActive && 'bg-primary-500'}`} >
  //           <div className="group relative flex items-center">
  //             <a className="bg-white py-2 px-4 rounded-xl group-hover:text-blue-500">
  //               {link.icon}
  //             </a>
  //             <p className="hidden md:block ml-2 text-xs text-gray-600 
  //             "
  //             // opacity-0 group-hover:opacity-100 transition-opacity duration-300
  //             >
  //               {link.label}
  //             </p>
  //           </div>
  //         </Link>
  //       )
  //     } )}
        
  //   </div>
  // </section>
    

  <section className='custom-scrollbar leftsidebar'>
  <div className='flex w-full flex-1 flex-col gap-6 px-6'>
    {sidebarLinks.map((link) => {
      const isActive =
        (pathname.includes(link.route) && link.route.length > 1) ||
        pathname === link.route;

      // if (link.route === "/profile") link.route = `${link.route}/${userId}`;

      return (
        <Link
          href={link.route}
          key={link.label}
          className={`leftsidebar_link ${isActive && "bg-white border-solid border-2 border-gray-200 shadow-md"}`}
        >
          <Image
          // style={{ background: "red"}}
            src={link.imgURL}
            alt={link.label}
            width={24}
            height={24}
          />

          <p className='text-gray-700 font-bold max-lg:hidden'>{link.label}</p>
        </Link>
      );
    })}
  </div>

  <div className='mt-10 px-6'>
    <SignedIn>
      <SignOutButton signOutCallback={() => router.push("/sign-in")}>
        <div className='flex cursor-pointer gap-4 p-4'>
          <Image
            src='/assets/logout.svg'
            alt='logout'
            width={24}
            height={24}
          />

          <p className='text-gray-700 font-bold max-lg:hidden'>Logout</p>
        </div>
      </SignOutButton>
    </SignedIn>
  </div>
</section>
 
  );
};

export default LeftSidebar;

"use client"
import {
  OrganizationSwitcher,
  SignIn,
  SignOutButton,
  SignedIn,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import Image from "next/image";

const Topbar = () => {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        {/*Logo Image*/}
        {/* <Image src="/" alt="logo" width={25} height={25} /> */}
        <p className="text-heading3-bold text-[#001d3d] max-xs:hidden">
          babble.io
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          {/*code within Signin **signout** only renders if user is signed in */}
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <HiOutlineLogout size={23} />
                {/* <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={25}
                  height={25}
                /> */}
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            elements: { organizationSwitcherTrigger: "py-2 px-4" },
          }}
        />
      </div>
    </nav>
  );
};

export default Topbar;

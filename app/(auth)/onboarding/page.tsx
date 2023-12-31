"use client";
import AccountProfile from "@/components/forms/AccountProfile";
//import currentuser from clerk
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
// import { clerkAuthMiddleware } from '@/middleware/clerkMiddleware';

// export const getServerSideProps = clerkAuthMiddleware;

export class userData {
  id: any;
  objectId: any;
  username!: string;
  name!: string;
  bio!: string;
  image!: string;
}

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  // const user: any = [12, 323, 45, 45, 34, 34, 34, 3];
  const userInfo: any = {};
  //User object data from database
  const userData: userData = {
    id: user.id,
    objectId: userInfo?._id || "",
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName || "", // Provide a default value ""
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">This is the onboarding </h1>
      <p className="mt-3 text-base-regular text-gray-700">
        Complete your profile now to use babble
      </p>
      <section className="mt-8 bg-white p-10">
        <AccountProfile
          // user={userData}
          user={userData}
          btnTitle="Continue"
        />
      </section>
    </main>
  );
};

export default Page;

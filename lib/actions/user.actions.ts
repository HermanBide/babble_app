"use server ";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface params {
  userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string,
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path
}: params ): Promise<void> {
  connectToDB();

  try {
    
      await User.findOneAndUpdate(
        { id: userId },
        { username: username.toLowerCase(), name, bio, image, onboarded: true },
        //Update and insert (update existing row if value exists and inserts new row if specified value doesnt exist)
        {upsert: true}
      );
    
      //revalidate data associated with a specific path (update cached data without waiting for revalidation period to expire)
      if(path === "/profile/edit") {
        revalidatePath(path)
      }
  } catch (error: any) {
    throw new Error(`failed to create/update user: ${error.message}`)
  }
}

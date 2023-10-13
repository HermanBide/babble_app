"use server ";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { error } from "console";
import Community from "../models/community.model";
import Post from "../models/post.model";

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

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId }).populate({
      path: "communities",
      model: Community,
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    // Find all threads authored by the user with the given userId
    const threads = await User.findOne({ id: userId }).populate({
      path: "posts",
      model: Post,
      populate: [
        {
          path: "community",
          model: Community,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        },
        {
          path: "children",
          model: Post,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });
    return threads;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}
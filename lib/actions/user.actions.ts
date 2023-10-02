"use server ";

import User from "../models/user.model";
import { connectToDB } from "../validations/mongoose";

export async function updateUser(
  userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string
): Promise<void> {
  connectToDB();

  await User.findOneAndUpdate(
    { id: userId },
    { username: username.toLowerCase(), name, bio, image, onboarded: true },
    //Update and insert (update existing row if value exists and inserts new row if specified value doesnt exist)
    {upsert: true}
  );
}

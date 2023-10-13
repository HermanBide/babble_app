import Post from '../models/post.model'
import User from "../models/user.model";
import { connectToDB } from '../mongoose';

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export default async function createPost({ text, author, communityId, path}: Params) {
    try{
        connectToDB()

        const createdPost = await Post.create({
            text,
            author,
            // community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
          });

            // Update User model
    await User.findByIdAndUpdate(author, {
        $push: { posts: createdPost._id },
      });
  

        // if (communityIdObject) {
        //     // Update Community model
        //     await Community.findByIdAndUpdate(communityIdObject, {
        //       $push: { threads: createdThread._id },
        //     });
        //   }
    } catch (error: any) {
        console.log(error)
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}
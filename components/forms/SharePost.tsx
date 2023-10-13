"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";

import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.actions";
import { PostValidation } from "@/lib/validations/post";
import createPost from "@/lib/actions/post.actions";
//define props
interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const SharePost = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      post: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    await createPost({
      text: values.post,
      author: userId,
      communityId: null,
      path: pathname,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 "
      >
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-gray-700">
                content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 ">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          {" "}
          Share your Post
        </Button>
      </form>
    </Form>
  );
};

export default SharePost;

import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'
import SharePost from '@/components/forms/SharePost'
import { authMiddleware } from "@clerk/nextjs";

const page = async () => {
  const user = await currentUser()
  if(!user) return null

  const userInfo = await fetchUser(user.id)
  if(!userInfo?.onboarding) redirect('/onboarding')

  return (
    <>
    <h1 className='head-text'>Create Post</h1>
    <SharePost userId={userInfo._id} />
    </>
  )
}

export default page;
import * as z from 'zod'

export const userValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3).max(20),
    username: z.string().min(3).max(20),
    bio:z.string().min(100).max(1000),
})
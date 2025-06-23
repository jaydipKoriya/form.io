import { z } from "zod";
import { email } from "zod/v4";

export const LoginSchema=z.object({
    username:z.string().min(6,'Username must be at least 6 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
})



export type LoginFormInput=z.infer<typeof LoginSchema>
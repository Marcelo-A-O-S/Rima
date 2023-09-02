import { z } from "zod";

const createSchema = z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email().nonempty()
})

const updateSchema = z.object({
    id: z.number(),
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email().nonempty()
})
const idSchema = z.object({
    id: z.number()
})
const lastNameSchema = z.object({
    lastName: z.string().nonempty()
})
const firstNameSchema = z.object({
    firstName: z.string().nonempty()
})
const emailSchema = z.object({
    email: z.string().email().nonempty()
})
export { createSchema, updateSchema, idSchema, lastNameSchema, firstNameSchema, emailSchema }

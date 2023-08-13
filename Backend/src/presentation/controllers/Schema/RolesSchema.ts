import { z } from "zod";

const createSchema = z.object({
    roleName: z.string().nonempty("O valor não pode ser vazio!"),
    typeid: z.number()
})
const updateSchema = z.object({
    id: z.number(),
    roleName: z.string().nonempty("O valor não pode ser vazio!"),
    typeid: z.number()
})
const roleNameSchema = z.object({
    roleName: z.string().nonempty("O valor não pode ser vazio!")
})
const idSchema = z.object({
    id: z.number()
})
export { createSchema, updateSchema , roleNameSchema , idSchema }

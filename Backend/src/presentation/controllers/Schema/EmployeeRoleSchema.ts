import { number, z } from "zod";

const updateSchema = z.object({
    id:number(),
    employeeid:number(),
    roleid:number()
})

const createSchema = z.object({
    employeeid:number(),
    roleid:number()
})

const idSchema = z.object({
    id: number()
})

export { updateSchema, createSchema, idSchema }

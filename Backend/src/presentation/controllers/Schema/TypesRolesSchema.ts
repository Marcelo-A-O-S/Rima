import { z } from "zod";


const createSchema = z.object({
    typeName: z.string().nonempty("O valor não pode ser vazio!")
});
const updateSchema = z.object({
    id: z.number(),
    typeName: z.string().nonempty("O valor não pode ser vazio")
});
const TypeNameSchema = z.object({
    typeName: z.string().nonempty("O valor não pode ser vazio")
})

const IdSchema = z.object({
    id: z.number()
})

export { createSchema, updateSchema , TypeNameSchema , IdSchema }

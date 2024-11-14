import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const validationSchema = toTypedSchema(z.object({
    name: z
        .string({message: "Este campo deve ser um texto."})
        .min(3, {message: "Este campo deve ter no mínimo 3 letras."})
        .max(20, {message: "Este campo deve ter no máximo 20 letras."}),
    details: z
        .optional(z.string()),
    // amount: z
    //     .string({message: "Este campo deve ter um valor válido"}),
    calculate: z
        .enum(["y", "n"], {message: "Escolha entre as opções disponíveis"})
}));

/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as Zod from "zod";

// Schemas
import { GeneralSchema } from "./schemas";

interface IDefaultValues {
  [key: string]: any;
}

interface ISchemaObject extends Zod.AnyZodObject {
  [key: string]: any;
}

type PDefaultValues = IDefaultValues;

/**
 * Mount the form integrated with Zod validation
 *
 * @description This function will mount the hook-forms statement with Zod schema validation integrated
 * @param defaultValues The default values for the input's form
 * @param schemaObject An optional schema validation to agregate to validation flux
 * @returns The Hook-Forms Statement
 */
function useFormIntegration(
  defaultValues: PDefaultValues = {},
  schemaObject?: Zod.AnyZodObject
) {
  const form = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(
      schemaObject ? GeneralSchema.extend(schemaObject.shape) : GeneralSchema,
      {
        async: false,
      },
      {
        raw: true,
        mode: "sync",
      }
    ),
  });

  console.log(
    "useFormIntegration",
    (schemaObject ? GeneralSchema.extend(schemaObject.shape) : GeneralSchema)
      .shape
  );

  return { ...form };
}

export default useFormIntegration;

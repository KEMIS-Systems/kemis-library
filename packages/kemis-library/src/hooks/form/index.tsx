/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import { DeepPartial, useForm } from "react-hook-form";
import * as Zod from "zod";

// Schemas
import { GeneralSchema } from "./schemas";

type IDefaultValues<T> = {
  [key in keyof T]?: DeepPartial<T[key]>;
};

interface ISchemaObject extends Zod.AnyZodObject {
  [key: string]: any;
}

/**
 * Mount the form integrated with Zod validation
 *
 * @description This function will mount the hook-forms statement with Zod schema validation integrated
 * @param defaultValues The default values for the input's form
 * @param schemaObject An optional schema validation to agregate to validation flux
 * @returns The Hook-Forms Statement
 */
export function useFormIntegration<ST = any>(
  defaultValues: IDefaultValues<ST>,
  schemaObject?: Zod.AnyZodObject
) {
  const form = useForm({
    defaultValues: defaultValues as unknown as DeepPartial<IDefaultValues<ST>>,
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

  return { ...form };
}

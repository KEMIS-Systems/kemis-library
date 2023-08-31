import * as Zod from "zod";
import { cpf, cnpj } from "cpf-cnpj-validator";

import { useLanguage } from "../../Language";

const { language } = useLanguage();

// CREATE A GENERIC SCHEMA OBJECT
export const GeneralSchema = Zod.object({
  /** A regra de negócio foi implementada com base no "artigo" de souforce
   * @see https://souforce.cloud/regra-de-validacao-para-cpf-e-cnpj-no-salesforce/
   */
  document: Zod.optional(
    Zod.string({
      invalid_type_error: language.input.document.invalid_type_error,
    }).refine(
      (value: string) => {
        if (value.trim() === "") return true;
        const cleanValue = value.replace(/[^\w\s]/gi, "").trim();
        return cleanValue.length === 11
          ? cpf.isValid(cleanValue)
          : cnpj.isValid(cleanValue);
      },
      { message: language.input.document.validation }
    )
  ),

  email: Zod.any()
    .refine((email: string) => {
      if (
        email.trim() === "" ||
        email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        )
      )
        return true;

      return false;
    }, language.input.email.validation)
    .optional()
    .nullable(),
});

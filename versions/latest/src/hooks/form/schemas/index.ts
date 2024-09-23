import * as Zod from "zod";
import { useLanguage } from "../../Language";

import { cnpj } from "../../../utils/cnpj";
import { cpf } from "../../../utils/cpf";

const { language } = useLanguage();

// CREATE A GENERIC SCHEMA OBJECT
export const GeneralSchema = Zod.object({
  /** A regra de negócio foi implementada com base no "artigo" de souforce
   * @see https://souforce.cloud/regra-de-validacao-para-cpf-e-cnpj-no-salesforce/
   */
  document: Zod.optional(
    Zod.string({
      invalid_type_error: "Insira um número correto",
    }).refine(
      (value) => {
        const cleanValue = (value as string).replace(/[^\w\s]/gi, "").trim();

        let isValidDocument = false;

        switch (cleanValue.length) {
          case 11:
            isValidDocument = cpf.isValid(cleanValue);

            break;
          case 14:
            isValidDocument = cnpj.isValid(cleanValue);

            break;
          default:
            isValidDocument = true;
        }

        return isValidDocument;
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

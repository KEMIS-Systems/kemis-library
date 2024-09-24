import { cpf as cpfValidator } from "cpf-cnpj-validator";

import { onlyNumber } from "./format";

const isValid = (value: string | null | undefined): boolean => {
  if (!value) return false;
  return cpfValidator.isValid(onlyNumber(value));
};

export const cpf = {
  isValid
};

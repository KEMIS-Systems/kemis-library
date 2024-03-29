import { AxiosInstance } from "axios";
import { cnpj as cnpjValidator } from "cpf-cnpj-validator";
import IMCnpj from "../models/IMCnpj";
import { onlyNumber } from "./format";

const isValid = (value: string | null | undefined): boolean => {
  if (!value) return false;
  return cnpjValidator.isValid(onlyNumber(value));
};

const getData = async (
  api: AxiosInstance,
  value: string | null | undefined
): Promise<IMCnpj> => {
  if (!value) return { status: "ERROR" };
  try {
    const response = await api.get<IMCnpj>(
      `/queries/cnpj/${onlyNumber(value)}`
    );
    return new Promise<IMCnpj>((resolve) => {
      resolve(response.data);
    });
  } catch (error) {
    return new Promise<IMCnpj>((reject) => {
      reject({ status: "ERROR" });
    });
  }
};

export const cnpj = {
  isValid,
  getData,
};

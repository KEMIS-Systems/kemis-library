import cep from "cep-promise";

interface IMCep {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

export const getAdress = async (value: string) => {
  const adress: IMCep = await cep(value);
  return adress;
};

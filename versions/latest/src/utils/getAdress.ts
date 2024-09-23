import cep from "cep-promise";

interface IMCep {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

const getAdress = async (value: string) => {
  const adress: IMCep = await cep(value);
  return adress;
};

export default getAdress;

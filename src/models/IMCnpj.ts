interface MainActivity {
  code: string;
  text: string;
}

interface BoardOfMembersAndAdministrators {
  name: string;
  qual: string;
}

interface Billing {
  free: boolean;
  database: boolean;
}

export default interface IMCnpj {
  status: "OK" | "ERROR";
  message?: string;
  opening?: string;
  company_status?: string;
  type?: string;
  name?: string;
  company_name?: string;
  size?: string;
  legal_nature?: string;
  main_activity?: MainActivity[];
  secondary_activities?: MainActivity[];
  bma?: BoardOfMembersAndAdministrators[];
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  phonenumber?: string;
  date_status?: string;
  cnpj?: string;
  updated_at?: string;
  rfe?: string;
  status_reason?: string;
  special_status?: string;
  data_situacao_especial?: string;
  share_capital?: string;
  extra?: object;
  billing?: Billing;
}

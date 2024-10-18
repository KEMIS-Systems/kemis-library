export type RawCountry = [string, string, number?, string[]?];
export type Country = {
  name: string;
  flagEmoji: string | undefined;
  iso2: string;
  dialCode: string;
  priority: number;
  areaCodes: string[] | null;
  nodeById: object;
};

export type RawCountry = [string, string, number?, string[]?];
export type Country = {
  name: string;
  nameInLower: string; // TO ONLY PEFORMANCE PURPOSE
  flagEmoji: string | undefined;
  searchPlaceholder: string | undefined;
  iso2: string;
  iso2InLower: string; // TO ONLY PEFORMANCE PURPOSE
  dialCode: string;
  priority: number;
  areaCodes: string[] | null;
  nodeById: object;
};

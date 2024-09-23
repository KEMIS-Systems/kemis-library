export default interface IMIP {
  status: 'OK' | 'ERROR';
  ip?: string;
  city?: string;
  country?: string;
  hostname?: string;
  latitude?: string;
  longitude?: string;
  organization_address?: string;
  postal?: string;
  region?: string;
  timezone?: string;
}

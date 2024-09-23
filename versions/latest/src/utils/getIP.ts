import { AxiosInstance } from 'axios';

import IMIP from "../models/IP";

interface IMIPInfo {
  ip: string;
  city: string;
  country: string;
  hostname: string;
  loc: string;
  org: string;
  postal: string;
  region: string;
  timezone: string;
}

const getIP = async (api: AxiosInstance): Promise<IMIP> => {
  try {
    const response = await api.get<IMIPInfo>(
      'https://ipinfo.io/json?token=03971df7351540'
    );
    return new Promise<IMIP>((resolve) => {
      const location = response.data.loc.split(',');
      resolve({
        status: 'OK',
        ip: response.data.ip,
        city: response.data.city,
        country: response.data.country,
        hostname: response.data.hostname,
        latitude: location[0],
        longitude: location[1],
        organization_address: response.data.org,
        postal: response.data.postal,
        region: response.data.region,
        timezone: response.data.timezone,
      });
    });
  } catch (err) {
    return { status: 'ERROR' };
  }
};

export default getIP;

import { AxiosResponse } from 'axios';

export default function generateUrlBlob(response: AxiosResponse): string {
  return window.URL.createObjectURL(
    new Blob([response.data], {
      type: response.headers['content-type'],
    })
  );
}

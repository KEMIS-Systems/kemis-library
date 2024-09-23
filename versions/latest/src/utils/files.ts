import { AxiosResponse } from "axios";

export function generateUrlBlob(response: AxiosResponse): string {
  return window.URL.createObjectURL(
    new Blob([response.data], {
      type: response.headers["content-type"],
    })
  );
}

export const toBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((resolve: unknown) => {
    canvas.toBlob(resolve as BlobCallback);
  });
};

export function getFileNameOnRequest(response: AxiosResponse): string | null {
  const contentDisposition = response.headers["Content-Disposition"];
  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
    if (fileNameMatch.length === 2) {
      return fileNameMatch[1];
    }
  }
  return null;
}

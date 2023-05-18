const toBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((resolve: unknown) => {
    canvas.toBlob(resolve as BlobCallback);
  });
};

export default toBlob;

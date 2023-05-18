import React, { useCallback, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import dataUrlToFile from "../../utils/dataUrlToFile";

interface ICropImage {
  image: string;
  onChange(value?: File): void;
}

const CropImage = ({ image, onChange }: ICropImage) => {
  const cropperRef = useRef<HTMLImageElement>(null);

  const onCrop = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imageElement: any = cropperRef?.current;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cropper: any = imageElement?.cropper;
    const file = await dataUrlToFile(
      cropper.getCroppedCanvas().toDataURL(),
      `photo-${new Date().getTime()}.jpg`
    );
    onChange(file);
  }, [onChange]);

  return (
    <Cropper
      src={image}
      className="w-full h-full"
      initialAspectRatio={16 / 9}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
    />
  );
};

export default CropImage;

import React, { useCallback, useRef, useState } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import canvasPreview from "../../utils/canvasPreview";
import dataUrlToFile from "../../utils/dataUrlToFile";

interface ICropImage {
  image: string;
  onChange(value?: File): void;
}

const CropImage = ({ image, onChange }: ICropImage) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [crop, setCrop] = useState<Crop>();

  const handleComplete = useCallback(
    async (pixelCrop: PixelCrop) => {
      const imgEl = imgRef.current;
      const canvas = canvasRef.current;

      if (!imgEl || !canvas || !pixelCrop.width || !pixelCrop.height) return;

      canvasPreview(imgEl, canvas, pixelCrop);

      const dataUrl = canvas.toDataURL("image/jpeg");
      const file = await dataUrlToFile(dataUrl, `photo-${new Date().getTime()}.jpg`);
      onChange(file);
    },
    [onChange]
  );

  return (
    <div className="w-full h-full">
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={handleComplete}
        className="w-full"
      >
        <img ref={imgRef} src={image} alt="Crop preview" className="w-full h-full object-contain" />
      </ReactCrop>
      {/* Off-screen canvas used to produce the cropped output */}
      <canvas ref={canvasRef} style={{ display: "none" }} aria-hidden="true" />
    </div>
  );
};

export default CropImage;

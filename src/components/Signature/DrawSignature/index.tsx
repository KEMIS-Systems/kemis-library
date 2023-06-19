import { useCallback, useEffect, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";

import { BsCheck2Circle } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import toBlob from "../../../utils/toBlob";
import blobToFile from "../../../utils/blobToFile";
import React from "react";
import ColorPalette from "../ColorPalette";
import CropImage from "../../CropImage";

interface IModalProps {
  onChange(files: File): void;
}

const DrawSignature = ({ onChange }: IModalProps) => {
  const canvasRef = useRef<CanvasDraw>(null);
  const [canvasSteps, setCanvasSteps] = useState<number>(1);
  const [signatureUrl, setSignatureUrl] = useState<string>("");
  const [colorDraw, setColorDraw] = useState<string>("");

  useEffect(() => {
    setColorDraw("#000000");
  }, []);

  const handleCanvasPreviewStep = useCallback(() => {
    setCanvasSteps(1);
    canvasRef.current?.clear();
    onChange({} as File);
  }, [onChange]);

  const handleCanvasNextStep = useCallback(async () => {
    try {
      const getCanvas = document.getElementById("canvasParent")?.firstChild
        ?.childNodes[1] as HTMLCanvasElement;
      if (getCanvas) {
        const blob = await toBlob(getCanvas);
        const file = blobToFile(blob, "signature.png");
        setSignatureUrl(URL.createObjectURL(file));
        onChange(file);
        setCanvasSteps(2);
      }
    } catch (error) {
      //
    }
  }, [onChange]);

  const handleImageCopped = useCallback(
    (file: File) => {
      onChange(file);
    },
    [onChange]
  );

  const handleBringColor = useCallback((value: string) => {
    setColorDraw(value);
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="border border-gray-300 rounded-t-xl p-2 flex gap-2 justify-between">
          <div className="flex gap-2">
            <button
              className="rounded-full h-10 w-10 flex justify-center items-center border border-gray-300 text-blue-400 bg-transparent hover:text-blue-600 hover:border-gray-400"
              onClick={handleCanvasNextStep}
            >
              <BsCheck2Circle size={20} />
            </button>
            <button
              className="rounded-full h-10 w-10 flex justify-center items-center border border-gray-300 text-red-400 bg-transparent hover:text-red-600 hover:border-gray-400"
              onClick={handleCanvasPreviewStep}
            >
              <BiTrash size={20} />
            </button>
          </div>
          <div className="flex justify-end grow">
            <ColorPalette onHandleTakeColor={handleBringColor} />
          </div>
        </div>
        <div className="border border-gray-300 rounded-b-xl p-1">
          <div
            className="flex flex-row w-full justify-center items-center mb-5"
            id="canvasParent"
          >
            {canvasSteps === 1 ? (
              <CanvasDraw
                disabled={canvasSteps !== 1}
                ref={canvasRef}
                brushRadius={1}
                hideGrid
                hideInterface
                lazyRadius={1}
                loadTimeOffset={2}
                canvasWidth={500}
                canvasHeight={200}
                catenaryColor="#0a0302"
                brushColor={colorDraw}
                className={`w-full border rounded mt-3 ${
                  canvasSteps !== 1 ? "hide" : ""
                }`}
              />
            ) : (
              <>
                <CropImage image={signatureUrl} onChange={handleImageCopped} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawSignature;

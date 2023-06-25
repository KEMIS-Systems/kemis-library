import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsCheck2Circle } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import returnFontsArray from "../../../utils/fontsGoogle";
import toBlob from "../../../utils/toBlob";
import blobToFile from "../../../utils/blobToFile";
import React from "react";
import ColorPalette from "../ColorPalette";
import Dropdown from "../../Form/Dropdown";
import CropImage from "../../CropImage";

interface IProps {
  onChange(files: File): void;
  text: string;
}

interface IWriteSignature {
  font_type: number;
  font_size: number;
}

const defaultValues: IWriteSignature = {} as IWriteSignature;

const WriteSignature = ({ onChange, text }: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const form = useForm({ defaultValues });
  const [colorDraw, setColorDraw] = useState<string>("#000000");
  const [showImage, setShowImage] = useState<boolean>(false);
  const [fontType, setFontType] = useState<string>("");
  const [signatureUrl, setSignatureUrl] = useState<string>("");
  const fonts = returnFontsArray();
  const fontSizes = [
    { value: 20, label: "20px" },
    { value: 22, label: "22px" },
    { value: 24, label: "24px" },
    { value: 26, label: "26px" },
    { value: 28, label: "28px" },
    { value: 30, label: "30px" },
  ];

  const fontTypeSelected = form.watch("font_type");
  const fontSizeSelected = form.watch("font_size");

  useEffect(() => {
    form.setValue("font_type", 1);
    form.setValue("font_size", 20);
  }, [form]);

  const drawText = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = `${fontSizeSelected}px ${fontType}`;
        context.textBaseline = "middle";
        context.fillStyle = colorDraw;
        const textWidth = context.measureText(text).width;
        const x = (canvas.width - textWidth) / 2;
        const y = canvas.height / 2;

        context.fillText(text, x, y);
      }
    }
  }, [fontSizeSelected, fontType, text, colorDraw]);

  useEffect(() => {
    drawText();
  }, [drawText]);

  useEffect(() => {
    fonts.forEach((font) => {
      if (font.value === fontTypeSelected) {
        setFontType(font.script.style.fontFamily);
        drawText();
      }
    });
  }, [fontTypeSelected, fonts, drawText]);

  const handleBringColor = useCallback((value: string) => {
    setColorDraw(value);
  }, []);

  const handleImageCopped = useCallback(
    (file: File) => {
      onChange(file);
    },
    [onChange]
  );

  const handleShowImage = useCallback(async () => {
    if (canvasRef.current) {
      const blob = await toBlob(canvasRef.current);
      const file = blobToFile(blob, "signature.png");
      setSignatureUrl(URL.createObjectURL(file));
      setShowImage(true);
      onChange(file);
    }
  }, [onChange]);

  const handleHideImage = useCallback(() => {
    setShowImage(false);
    onChange({} as File);
  }, [onChange]);

  return (
    <>
      <div className=" w-full">
        <div className="border border-gray-300 rounded-t-xl p-2 flex gap-2 justify-between">
          <div className="flex gap-2">
            {!showImage ? (
              <button
                className="rounded-full h-10 w-10 flex justify-center items-center border border-gray-300 text-blue-400 bg-transparent hover:text-blue-600 hover:border-gray-400"
                onClick={handleShowImage}
              >
                <BsCheck2Circle size={20} />
              </button>
            ) : (
              <button
                className="rounded-full h-10 w-10 flex justify-center items-center border border-gray-300 text-red-400 bg-transparent hover:text-red-600 hover:border-gray-400"
                onClick={handleHideImage}
              >
                <BiTrash size={20} />
              </button>
            )}
          </div>
          <div className="flex justify-end">
            <div>
              <ColorPalette onHandleTakeColor={handleBringColor} />
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-b-xl p-1">
          <div className="flex justify-between gap-2">
            {!showImage ? (
              <div className="flex w-full gap-2 p-1">
                <div className="w-2/3">
                  <Dropdown
                    name="font_type"
                    label={""}
                    rules={{ required: "Font type is required." }}
                    form={form}
                    options={fonts}
                  />
                </div>
                <div className="w-1/3">
                  <Dropdown
                    name="font_size"
                    label={""}
                    rules={{ required: "Font size is required." }}
                    options={fontSizes}
                    form={form}
                  />
                </div>
              </div>
            ) : (
              " "
            )}
          </div>
          <div className="flex flex-row w-full justify-center items-center mb-5">
            {!showImage ? (
              <div className="flex flex-column w-full h-20">
                <canvas
                  id="signature"
                  ref={canvasRef}
                  className="w-full h-full border border-gray-300 rounded-lg"
                >
                  Your browser does not support the canvas element.
                </canvas>
              </div>
            ) : (
              <CropImage image={signatureUrl} onChange={handleImageCopped} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteSignature;

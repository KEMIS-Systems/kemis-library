import React, { useCallback, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import { useLanguage } from "../../../hooks/Language";
import DrawSignature from "../DrawSignature";
import WriteSignature from "../WriteSignature";
import UploadSignature from "../UploadSignature";
import Dialog from "../../Dialog";

interface IModalProps {
  header: string;
  show: boolean;
  onHide: () => void;
  onSubmitted: (file: File) => void;
  text: string;
  classNameDialog?: string;
  uploadSignature?: boolean;
}

const DialogSignature = ({
  header,
  show,
  onHide,
  onSubmitted,
  text,
  classNameDialog,
  uploadSignature,
}: IModalProps) => {
  const { language } = useLanguage();
  const [fileData, setFileData] = useState<File>({} as File);

  const handleFooterDialog = useCallback(() => {
    return (
      <div className="flex justify-end gap-3 mt-2">
        <div>
          <button
            type="button"
            className="bg-light text-white py-2 px-4 rounded-lg font-bold"
            onClick={() => onHide()}
          >
            {language.input.button_cancel}
          </button>
        </div>
        {fileData?.size ? (
          <div>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-lg font-bold"
              onClick={() => onSubmitted(fileData)}
            >
              {language.input.button_save}
            </button>
          </div>
        ) : (
          " "
        )}
      </div>
    );
  }, [onHide, onSubmitted, fileData]);

  return (
    <>
      <Dialog
        header={header}
        visible={show}
        onHide={onHide}
        className={classNameDialog ?? ""}
        footer={handleFooterDialog}
      >
        <TabView className="col-span-2">
          <TabPanel header={language.components.signature.header_draw.title}>
            <DrawSignature onChange={setFileData} />
          </TabPanel>
          <TabPanel header={language.components.signature.header_write.title}>
            <WriteSignature onChange={setFileData} text={text} />
          </TabPanel>
          {uploadSignature && (
            <TabPanel
              header={language.components.signature.header_uploading.title}
            >
              <UploadSignature onChange={setFileData} />
            </TabPanel>
          )}
        </TabView>
      </Dialog>
    </>
  );
};

export default DialogSignature;

import { TabPanel, TabView } from "primereact/tabview";
import { useCallback, useState } from "react";
import { useLanguage } from "../../../hooks/Language";
import Dialog from "../../Dialog";
import DrawSignature from "../DrawSignature";
import UploadSignature from "../UploadSignature";
import WriteSignature from "../WriteSignature";

interface IModalProps {
  header: string;
  show: boolean;
  onHide: () => void;
  onSubmitted: (file: File) => void;
  text: string;
  classNameDialog?: string;
  writeSignature?: boolean;
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
  writeSignature = true,
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
    <Dialog
      header={header}
      visible={show}
      onHide={onHide}
      className={`${classNameDialog} kemis-library-dialog-modal-signature`}
      footer={handleFooterDialog}
    >
      <TabView className="col-span-2">
        {writeSignature && (
          <TabPanel header={language.components.signature.header_write.title}>
            <WriteSignature onChange={setFileData} text={text} />
          </TabPanel>
        )}
        <TabPanel header={language.components.signature.header_draw.title}>
          <DrawSignature onChange={setFileData} />
        </TabPanel>
        {uploadSignature && (
          <TabPanel header={language.components.signature.header_uploading.title}>
            <UploadSignature onChange={setFileData} />
          </TabPanel>
        )}
      </TabView>
    </Dialog>
  );
};

export default DialogSignature;

import React, { useCallback, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";

// import { useLanguage } from '~/hooks/Language';
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
}

const DialogSignature = ({
  header,
  show,
  onHide,
  onSubmitted,
  text,
}: IModalProps) => {
  // const { language } = useLanguage();
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
            {/* {language.input.button_cancel} */}
            Cancel
          </button>
        </div>
        {fileData?.size ? (
          <div>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-lg font-bold"
              onClick={() => onSubmitted(fileData)}
            >
              {/* {language.input.button_save} */}
              Save
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
        className="w-full sm:w-1/2 lg:w-1/3"
        footer={handleFooterDialog}
      >
        <TabView className="col-span-2">
          <TabPanel
            // header={language.pages.profile.signature.header_write.title}
            header={"Write"}
          >
            <WriteSignature onChange={setFileData} text={text} />
          </TabPanel>
          {/* <TabPanel header={language.pages.profile.signature.header_draw.title}> */}
          <TabPanel header={"Design"}>
            <DrawSignature onChange={setFileData} />
          </TabPanel>
          <TabPanel
            // header={language.pages.profile.signature.header_uploading.title}
            header={"Upload"}
          >
            <UploadSignature onChange={setFileData} />
          </TabPanel>
        </TabView>
      </Dialog>
    </>
  );
};

export default DialogSignature;

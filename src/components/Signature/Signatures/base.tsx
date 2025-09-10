import { TabPanel, TabView } from "primereact/tabview";

// Hooks
import { useLanguage } from "../../../hooks/Language";

// Types
import { ISignaturesProps } from "./Partials/types";

// Partials
import DrawSignature from "../DrawSignature";
import UploadSignature from "../UploadSignature";
import WriteSignature from "../WriteSignature";

export function Base({ setFileData, text, uploadSignature, writeSignature }: ISignaturesProps) {
    const { language } = useLanguage();

    return <>
        <TabView className="col-span-2">
            <TabPanel header={language.components.signature.header_draw.title}>
                <DrawSignature onChange={setFileData} />
            </TabPanel>
            {writeSignature && (
                <TabPanel header={language.components.signature.header_write.title}>
                    <WriteSignature onChange={setFileData} text={text || ''} />
                </TabPanel>
            )}
            {uploadSignature && (
                <TabPanel
                    header={language.components.signature.header_uploading.title}
                >
                    <UploadSignature onChange={setFileData} />
                </TabPanel>
            )}
        </TabView>
    </>
}
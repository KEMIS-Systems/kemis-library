import { useState } from "react";

// Partials
import { Base } from "../../base";

// Hooks
import { useLanguage } from "../../../../../hooks/Language";

// Types
import { IInPageSignatureProps } from "./types";

export function InPageSignature({
    onSubmitted,
    text,
    classNameDialog,
    uploadSignature,
    writeSignature = true,
}: IInPageSignatureProps) {
    const { language } = useLanguage();

    const [fileData, setFileData] = useState<File>({} as File);

    return (
        <div className={`${classNameDialog} kemis-library-in-page-signature`}>
            <Base setFileData={setFileData} text={text} uploadSignature={uploadSignature} writeSignature={writeSignature} />
            <div className="flex justify-end gap-3 mt-2">
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
        </div>
    );
};

import { useCallback, useState } from "react";

// Partials
import Dialog from "../../../../Dialog";
import { Base } from "../../base";

// Hooks
import { useLanguage } from "../../../../../hooks/Language";

// Types
import { IDialogSignatureProps } from "./types";

export function DialogSignature({
    header,
    show,
    onHide,
    onSubmitted,
    text,
    classNameDialog,
    uploadSignature,
    writeSignature = false,
}: IDialogSignatureProps) {
    const { language } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false)
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
                            onClick={() => {
                                setIsSubmitting(true)
                                onSubmitted(fileData).then(_r => setIsSubmitting(false))
                            }}
                            data-submitting={isSubmitting}
                            className="kemis-library-button-submitting text-white py-2 px-4 rounded-lg font-bold"
                        >
                            {
                                isSubmitting ? language.input.button_wait : language.input.button_save
                            }
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
            className={classNameDialog ?? ""}
            footer={handleFooterDialog}
        >
            <Base setFileData={setFileData} text={text} uploadSignature={uploadSignature} writeSignature={writeSignature} />
        </Dialog>
    );
};

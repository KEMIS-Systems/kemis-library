export { AutoComplete, BoxElement, Button, CheckBox, Chips, ColorPalette, CropImage, Dialog, DialogFile, DialogPhoto, DialogSignature, DrawSignature, Dropdown, Dropzone, EditorHtml, Form, FormDialog, InputCellPhone, InputDate, InputFile, InputImage, InputMask, InputNumber, InputPassword, InputSwitch, InputText, InputTextArea, ListBox, Loading, MultiSelect, RadioButton, SelectButton, ShowFile, Signatures, SplitButton, UploadPhoto, UploadSignature, WriteSignature } from './components.js';
export { Toast, abbreviate, blobToFile, canvasPreview, cnpj, dataUrlToFile, format, formatCurrency, generateUrlBlob, getAdress, getFileNameOnRequest, getIP, returnFontsArray, slug, toBlob } from './utils.js';
import * as react_hook_form from 'react-hook-form';
import { DeepPartial } from 'react-hook-form';
import * as Zod from 'zod';
import 'react/jsx-runtime';
import 'react';
import 'primereact/dialog';
import 'axios';
import 'react-dropzone';
import 'primereact/selectitem';
import 'primereact/inputmask';
import 'primereact/inputnumber';
import 'primereact/radiobutton';
import 'react-image-crop';
import 'sweetalert2';

interface ILanguage {
    components: {
        error: {
            message: string;
            required: string;
            validation: string;
        };
        dropzone: {
            message: string;
            example: string;
        };
        photo: {
            message: string;
        };
        signature: {
            title: string;
            title_new: string;
            title_update: string;
            msg_1: string;
            err_1: string;
            header_draw: {
                title: string;
                btn_redo: string;
                btn_not_like: string;
                btn_visualize: string;
                success: string;
                error: string;
            };
            header_write: {
                title: string;
                lbl_drop: string;
                btn_not_like: string;
                btn_visualize: string;
            };
            header_uploading: {
                title: string;
                btn_not_like: string;
                btn_visualize: string;
                msg_1: string;
            };
            terms: {
                header: string;
            };
        };
    };
    input: {
        button_accept: string;
        button_cancel: string;
        button_save: string;
        button_wait: string;
        button_filter: string;
        button_clear: string;
        button_delete: string;
        button_edit: string;
        placeholder: {
            search: string;
        };
        password: {
            header: string;
            bottom: {
                title: string;
                rules: {
                    rule1: string;
                    rule2: string;
                    rule3: string;
                    rule4: string;
                };
            };
        };
        document: {
            required: string;
            validation: string;
            invalid_type_error: string;
        };
        email: {
            required: string;
            validation: string;
        };
    };
    booleans: {
        yes: string;
        no: string;
        ok: string;
        noOk: string;
    };
    default: {
        import_message: string;
        validations: {
            cnpj: string;
        };
    };
    pages: {
        message: {
            empty: string;
            pages: string;
        };
        alerts: {
            edit: {
                success: string;
            };
            add: {
                success: string;
            };
            copy: {
                success: string;
            };
            error: {
                error: string;
                error_filter: string;
                zip_code_not_found: string;
            };
            delete: {
                confirm: string;
                sucess: string;
                error: string;
            };
        };
    };
}

interface LanguageContextData {
    language: ILanguage;
}
declare function useLanguage(): LanguageContextData;

type IDefaultValues<T> = {
    [key in keyof T]?: DeepPartial<T[key]>;
};
/**
 * Mount the form integrated with Zod validation
 *
 * @description This function will mount the hook-forms statement with Zod schema validation integrated
 * @param defaultValues The default values for the input's form
 * @param schemaObject An optional schema validation to agregate to validation flux
 * @returns The Hook-Forms Statement
 */
declare function useFormIntegration<ST = any>(defaultValues: IDefaultValues<ST>, schemaObject?: Zod.AnyZodObject): {
    watch: react_hook_form.UseFormWatch<IDefaultValues<ST>>;
    getValues: react_hook_form.UseFormGetValues<IDefaultValues<ST>>;
    getFieldState: react_hook_form.UseFormGetFieldState<IDefaultValues<ST>>;
    setError: react_hook_form.UseFormSetError<IDefaultValues<ST>>;
    clearErrors: react_hook_form.UseFormClearErrors<IDefaultValues<ST>>;
    setValue: react_hook_form.UseFormSetValue<IDefaultValues<ST>>;
    trigger: react_hook_form.UseFormTrigger<IDefaultValues<ST>>;
    formState: react_hook_form.FormState<IDefaultValues<ST>>;
    resetField: react_hook_form.UseFormResetField<IDefaultValues<ST>>;
    reset: react_hook_form.UseFormReset<IDefaultValues<ST>>;
    handleSubmit: react_hook_form.UseFormHandleSubmit<IDefaultValues<ST>, undefined>;
    unregister: react_hook_form.UseFormUnregister<IDefaultValues<ST>>;
    control: react_hook_form.Control<IDefaultValues<ST>, any>;
    register: react_hook_form.UseFormRegister<IDefaultValues<ST>>;
    setFocus: react_hook_form.UseFormSetFocus<IDefaultValues<ST>>;
};

export { type LanguageContextData, useFormIntegration, useLanguage };

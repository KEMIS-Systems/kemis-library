import { PixelCrop } from 'react-image-crop';
import { AxiosInstance, AxiosResponse } from 'axios';
import Swal from 'sweetalert2';

declare const abbreviate: (str: string) => string;

declare const blobToFile: (theBlob: Blob, fileName: string) => File;

declare const canvasPreview: (image: HTMLImageElement, canvas: HTMLCanvasElement, crop: PixelCrop, scale?: number, rotate?: number) => void;

interface MainActivity {
    code: string;
    text: string;
}
interface BoardOfMembersAndAdministrators {
    name: string;
    qual: string;
}
interface Billing {
    free: boolean;
    database: boolean;
}
interface IMCnpj {
    status: "OK" | "ERROR";
    message?: string;
    opening?: string;
    company_status?: string;
    type?: string;
    name?: string;
    company_name?: string;
    size?: string;
    legal_nature?: string;
    main_activity?: MainActivity[];
    secondary_activities?: MainActivity[];
    bma?: BoardOfMembersAndAdministrators[];
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    phonenumber?: string;
    date_status?: string;
    cnpj?: string;
    updated_at?: string;
    rfe?: string;
    status_reason?: string;
    special_status?: string;
    data_situacao_especial?: string;
    share_capital?: string;
    extra?: object;
    billing?: Billing;
}

declare const cnpj: {
    isValid: (value: string | null | undefined) => boolean;
    getData: (api: AxiosInstance, value: string | null | undefined) => Promise<IMCnpj>;
};

declare const dataUrlToFile: (dataUrl: string, fileName: string) => Promise<File>;

declare const returnFontsArray: () => {
    script: {
        style: {
            fontFamily: string;
        };
    };
    value: number;
    label: string;
    className: string;
    family: string;
}[];

declare const format: {
    (value: number): string;
    (value: number | bigint): string;
};

declare const formatCurrency: (value: number) => string;

declare function generateUrlBlob(response: AxiosResponse): string;
declare const toBlob: (canvas: HTMLCanvasElement) => Promise<Blob>;
declare function getFileNameOnRequest(response: AxiosResponse): string | null;

interface IMCep {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
}
declare const getAdress: (value: string) => Promise<IMCep>;

interface IMIP {
    status: "OK" | "ERROR";
    ip?: string;
    city?: string;
    country?: string;
    hostname?: string;
    latitude?: string;
    longitude?: string;
    organization_address?: string;
    postal?: string;
    region?: string;
    timezone?: string;
}

declare const getIP: (api: AxiosInstance) => Promise<IMIP>;

declare function slug(text: string): string;

declare const Toast: typeof Swal;

export { Toast, abbreviate, blobToFile, canvasPreview, cnpj, dataUrlToFile, format, formatCurrency, generateUrlBlob, getAdress, getFileNameOnRequest, getIP, returnFontsArray, slug, toBlob };

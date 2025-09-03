// Icons
import { FaBook } from 'react-icons/fa';

// Types
import type { TComponents } from './type';

// Components
// import AutoComplete from "../../../../../src/components/Form/AutoComplete";
// import CheckBox from "../../../../../src/components/Form/CheckBox";
// import Chips from "../../../../../src/components/Form/Chips";
// import Dropdown from "../../../../../src/components/Form/Dropdown";
// import EditorHtml from "../../../../../src/components/Form/EditorHtml";
// import Form from "../../../../../src/components/Form/Form";
// import FormDialog from "../../../../../src/components/Form/FormDialog";
// import InputCellPhone from "../../../../../src/components/Form/InputCellPhone";
// import InputDate from "../../../../../src/components/Form/InputDate";
// import InputFile from "../../../../../src/components/Form/InputFile";
// import InputImage from "../../../../../src/components/Form/InputImage";
// import InputMask from "../../../../../src/components/Form/InputMask";
// import InputNumber from "../../../../../src/components/Form/InputNumber";
// import InputPassword from "../../../../../src/components/Form/InputPassword";
// import InputSwitch from "../../../../../src/components/Form/InputSwitch";
// import InputText from "../../../../../src/components/Form/InputText";
// import InputTextArea from "../../../../../src/components/Form/InputTextArea";
// import ListBox from "../../../../../src/components/Form/ListBox";
// import MessageError from "../../../../../src/components/Form/MessageError";
// import MultiSelect from "../../../../../src/components/Form/MultiSelect";
// import RadioButton from "../../../../../src/components/Form/RadioButton";
// import SelectButton from "../../../../../src/components/Form/SelectButton";

export const Components: TComponents[] = [
    {
        name: 'Form',
        description: {
            title: 'Form',
            subTitle: 'A simple form component',
            details: 'This component renders a form with various input fields.'
        },
        path: 'form',
        icon: FaBook,
        sub: [
            {
                name: 'AutoComplete',
                description: {
                    title: 'AutoComplete',
                    subTitle: 'Campo de autocompletar',
                    details: 'Componente para seleção automática de opções.'
                },
                path: 'form/auto-complete',
                icon: FaBook,
            },
            {
                name: 'CheckBox',
                description: {
                    title: 'CheckBox',
                    subTitle: 'Caixa de seleção',
                    details: 'Componente para seleção múltipla.'
                },
                path: 'form/check-box',
                icon: FaBook,
            },
            {
                name: 'Chips',
                description: {
                    title: 'Chips',
                    subTitle: 'Seleção de chips',
                    details: 'Componente para seleção de múltiplos itens em formato de chips.'
                },
                path: 'form/chips',
                icon: FaBook,
            },
            {
                name: 'Dropdown',
                description: {
                    title: 'Dropdown',
                    subTitle: 'Menu suspenso',
                    details: 'Componente para seleção de opções em menu suspenso.'
                },
                path: 'form/dropdown',
                icon: FaBook,
            },
            {
                name: 'EditorHtml',
                description: {
                    title: 'EditorHtml',
                    subTitle: 'Editor HTML',
                    details: 'Componente para edição de conteúdo HTML.'
                },
                path: 'form/editor-html',
                icon: FaBook,
            },
            {
                name: 'Form',
                description: {
                    title: 'Form',
                    subTitle: 'Formulário',
                    details: 'Componente principal de formulário.'
                },
                path: 'form/form',
                icon: FaBook,
            },
            {
                name: 'FormDialog',
                description: {
                    title: 'FormDialog',
                    subTitle: 'Formulário em diálogo',
                    details: 'Componente de formulário exibido em modal.'
                },
                path: 'form/form-dialog',
                icon: FaBook,
            },
            {
                name: 'InputCellPhone',
                description: {
                    title: 'InputCellPhone',
                    subTitle: 'Campo celular',
                    details: 'Componente para entrada de número de celular.'
                },
                path: 'form/input-cell-phone',
                icon: FaBook,
            },
            {
                name: 'InputDate',
                description: {
                    title: 'InputDate',
                    subTitle: 'Campo data',
                    details: 'Componente para entrada de datas.'
                },
                path: 'form/input-date',
                icon: FaBook,
            },
            {
                name: 'InputFile',
                description: {
                    title: 'InputFile',
                    subTitle: 'Campo arquivo',
                    details: 'Componente para upload de arquivos.'
                },
                path: 'form/input-file',
                icon: FaBook,
            },
            {
                name: 'InputImage',
                description: {
                    title: 'InputImage',
                    subTitle: 'Campo imagem',
                    details: 'Componente para upload de imagens.'
                },
                path: 'form/input-image',
                icon: FaBook,
            },
            {
                name: 'InputMask',
                description: {
                    title: 'InputMask',
                    subTitle: 'Campo com máscara',
                    details: 'Componente para entrada de dados com máscara.'
                },
                path: 'form/input-mask',
                icon: FaBook,
            },
            {
                name: 'InputNumber',
                description: {
                    title: 'InputNumber',
                    subTitle: 'Campo numérico',
                    details: 'Componente para entrada de números.'
                },
                path: 'form/input-number',
                icon: FaBook,
            },
            {
                name: 'InputPassword',
                description: {
                    title: 'InputPassword',
                    subTitle: 'Campo senha',
                    details: 'Componente para entrada de senha.'
                },
                path: 'form/input-password',
                icon: FaBook,
            },
            {
                name: 'InputSwitch',
                description: {
                    title: 'InputSwitch',
                    subTitle: 'Campo switch',
                    details: 'Componente para alternância de estado.'
                },
                path: 'form/input-switch',
                icon: FaBook,
            },
            {
                name: 'InputText',
                description: {
                    title: 'InputText',
                    subTitle: 'Campo texto',
                    details: 'Componente para entrada de texto.'
                },
                path: 'form/input-text',
                icon: FaBook,
            },
            {
                name: 'InputTextArea',
                description: {
                    title: 'InputTextArea',
                    subTitle: 'Área de texto',
                    details: 'Componente para entrada de texto em área.'
                },
                path: 'form/input-text-area',
                icon: FaBook,
            },
            {
                name: 'ListBox',
                description: {
                    title: 'ListBox',
                    subTitle: 'Caixa de lista',
                    details: 'Componente para seleção em lista.'
                },
                path: 'form/list-box',
                icon: FaBook,
            },
            {
                name: 'MessageError',
                description: {
                    title: 'MessageError',
                    subTitle: 'Mensagem de erro',
                    details: 'Componente para exibição de mensagens de erro.'
                },
                path: 'form/message-error',
                icon: FaBook,
            },
            {
                name: 'MultiSelect',
                description: {
                    title: 'MultiSelect',
                    subTitle: 'Seleção múltipla',
                    details: 'Componente para seleção de múltiplos itens.'
                },
                path: 'form/multi-select',
                icon: FaBook,
            },
            {
                name: 'RadioButton',
                description: {
                    title: 'RadioButton',
                    subTitle: 'Botão de rádio',
                    details: 'Componente para seleção única.'
                },
                path: 'form/radio-button',
                icon: FaBook,
            },
            {
                name: 'SelectButton',
                description: {
                    title: 'SelectButton',
                    subTitle: 'Botão de seleção',
                    details: 'Componente para seleção de opções via botão.'
                },
                path: 'form/select-button',
                icon: FaBook,
            }
        ]
    },
    {
        name: 'Component',
        description: {
            title: 'Componentes',
            subTitle: 'Um componente de formulário simples',
            details: 'Este componente renderiza um formulário com vários campos de entrada.'
        },
        path: 'component',
        icon: FaBook,
        sub: [
            {
                name: 'DialogFile',
                description: {
                    title: 'DialogFile',
                    subTitle: 'Campo de diálogo de arquivo',
                    details: 'Componente para seleção de arquivos em um diálogo.'
                },
                path: 'component/dialog-file',
                icon: FaBook,
            },
        ]
    },
    {
        name: 'Hooks',
        description: {
            title: 'Hooks',
            subTitle: 'Gerenciamento de estado',
            details: 'Componente para gerenciamento de estado com hooks.'
        },
        path: 'hooks',
        icon: FaBook,
        sub: [
            {
                name: 'Hooks',
                description: {
                    title: 'Hooks',
                    subTitle: 'Gerenciamento de estado',
                    details: 'Componente para gerenciamento de estado com hooks.'
                },
                path: 'hooks',
                icon: FaBook,
            },
            {
                name: 'Hooks',
                description: {
                    title: 'Hooks',
                    subTitle: 'Gerenciamento de estado',
                    details: 'Componente para gerenciamento de estado com hooks.'
                },
                path: 'hooks',
                icon: FaBook,
            },
            {
                name: 'Hooks',
                description: {
                    title: 'Hooks',
                    subTitle: 'Gerenciamento de estado',
                    details: 'Componente para gerenciamento de estado com hooks.'
                },
                path: 'hooks',
                icon: FaBook,
            },
            {
                name: 'Hooks',
                description: {
                    title: 'Hooks',
                    subTitle: 'Gerenciamento de estado',
                    details: 'Componente para gerenciamento de estado com hooks.'
                },
                path: 'hooks',
                icon: FaBook,
            }
        ]
    }
]
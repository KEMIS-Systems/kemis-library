// Sub Pages
import { InputDate } from "./InputDate";
import type { IInputDateProps } from "./InputDate/types";



export const Form = {
    InputDate: (args: IInputDateProps) => <InputDate {...args} />,
    AutoComplete: () => <h1>AutoComplete</h1>,
    CheckBox: () => <h1>CheckBox</h1>,
    Chips: () => <h1>Chips</h1>,
    Dropdown: () => <h1>Dropdown</h1>,
    EditorHtml: () => <h1>EditorHtml</h1>,
    Form: () => <h1>Form</h1>,
    FormDialog: () => <h1>FormDialog</h1>,
    InputCellPhone: () => <h1>InputCellPhone</h1>,
    InputFile: () => <h1>InputFile</h1>,
    InputImage: () => <h1>InputImage</h1>,
    InputMask: () => <h1>InputMask</h1>,
    InputNumber: () => <h1>InputNumber</h1>,
    InputPassword: () => <h1>InputPassword</h1>,
    InputSwitch: () => <h1>InputSwitch</h1>,
    InputText: () => <h1>InputText</h1>,
    InputTextArea: () => <h1>InputTextArea</h1>,
    ListBox: () => <h1>ListBox</h1>,
    MessageError: () => <h1>MessageError</h1>,
    MultiSelect: () => <h1>MultiSelect</h1>,
    RadioButton: () => <h1>RadioButton</h1>,
    SelectButton: () => <h1>SelectButton</h1>,
}
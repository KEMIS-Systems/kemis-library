import { useLoaderData } from "react-router-dom";

// Types
import type { IFormDialogProps, TPages } from "./types";

// Components
import { PathTrace } from "@src/components/PathTrace";
import FormDialogComponent from "../../../../../../../src/components/Form/FormDialog";
import InputDateComponent from "../../../../../../../src/components/Form/InputDate";

// Hooks
import { useFormIntegration } from "../../../../../../../src/hooks/form";

export function FormDialog(_props: IFormDialogProps) {
    const { pages } = useLoaderData() as TPages

    const form = useFormIntegration({})

    return <>
        <span className="w-full h-full overflow-y-auto flex flex-col justify-between gap-10">
            <span className="w-full flex-1 md:max-h-[150px] pt-10">
                <hgroup className="">
                    <h1 className="text-4xl font-semibold">FormDialog</h1>
                    <p className="text-md font-medium">Este componete provê uma forma facil e intuitiva visualizar um formulario a patir de um modal</p>
                </hgroup>
            </span>

            <span className="w-full flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
                <input type="radio" name="show-preview" id="show-preview" className="peer/ShowPreview hidden" />

                <span className="w-full  max-sm:flex-1 md:h-full  flex flex-col gap-10 peer-checked/ShowPreview:[&_.show\_preview]:bg-[#141414]">
                    <label htmlFor="show-preview" className=" font-medium text-x ">Preview</label>
                    <span className="w-full h-full
                            show_preview
                            border-[1px] border-[#a8a8a8b3] 
                            bg-[#f5f5f5bd] 
                            backdrop-blur-md
                            rounded-xl
                            p-4
                            py-12
                        "
                    >
                        <FormDialogComponent
                            form={form}
                            header='FormDialog'
                            api={undefined}
                            url="/"
                            visible={true}
                            onHide={() => false}
                            onSubmit={async (d) => new Promise<typeof d>((re, _rej) => {
                                setTimeout(() => {
                                    re(d)
                                }, 5000)
                            })}
                        >
                            <InputDateComponent form={form} label="data" name='data' />
                        </FormDialogComponent>
                    </span>
                </span>

                <input type="radio" name="show-preview" id="show-code" className="peer/ShowCode hidden" />


                <span className="w-full  max-sm:flex-1 md:h-full  flex flex-col gap-10 peer-checked/ShowCode:[&_.show\_code]:bg-[#141414]">
                    <label htmlFor="show-code" className=" font-medium text-x ">Código</label>
                    <code data-line-numbers className="w-full h-full
                            show_code
                            overflow-y-auto
                            border-[1px] border-[#a8a8a8b3] 
                            bg-[#f5f5f5bd] 
                            backdrop-blur-md
                            rounded-xl
                            flex flex-col
                            gap-5
                            p-4
                            py-12
                        "
                    >
                        <span className="w-full h-2 flex flex-row items-center gap-2">
                            <span className="text-sm font-semibold">1</span>
                            <span>
                                <span className="text-red-500">import</span>
                            </span>
                            <span>
                                {"{"}
                            </span>
                            <span>
                                InputDate
                            </span>
                            <span>
                                {"}"}
                            </span>
                            <span className="text-red-500">from</span> <span className="text-yellow-500">"kemis-library/components"</span>
                        </span>
                        <span className="w-full h-2 flex flex-row items-center gap-2">
                            <span className="text-sm font-semibold">2</span>
                            <span>
                                <span className="text-red-500">import</span>
                            </span>
                            <span>
                                {"{"}
                            </span>
                            <span>
                                useFormIntegration
                            </span>
                            <span>
                                {"}"}
                            </span>
                            <span className="text-red-500">from</span> <span className="text-yellow-500">"kemis-library/hooks"</span>
                        </span>
                        <span className="w-full h-2 flex flex-row items-center gap-2">
                            <span className="text-sm font-semibold">3</span>
                            <span>
                                <span className="text-red-500">const</span>
                            </span>
                            <span>
                                form
                            </span>
                            <span className="text-blue-500">
                                useFormIntegration
                            </span>
                            <span className="-ml-2">
                                {"()"}
                            </span>
                            <span className="text-yellow-500 -ml-2">;</span>
                        </span>
                        <span className="w-full h-2 flex flex-row items-center gap-2">
                            <span className="text-sm font-semibold">4</span>
                            <span className="flex items-center gap-2">
                                <span className="text-red-500">{"<InputDate"}</span>
                                <span className="text-fuchsia-500">{"form={form}"}</span>
                                <span className="text-fuchsia-500">{"name={'birth_date'}"}</span>
                                <span className="text-fuchsia-500">{"label={'Data de Nascimento'}"}</span>
                                <span className="text-fuchsia-500">{"form={form}"}</span>
                                <span className="text-red-500">{"/>"}</span>
                            </span>
                        </span>
                    </code>
                </span>
            </span>

            <PathTrace pages={pages} />
        </span>
    </>
}
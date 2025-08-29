import { NavLink, useLoaderData } from "react-router-dom";

// Icons
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

// Types
import type { IInputDateProps, TPages } from "./types";


// Components
import InputDateComponent from "../../../../../../../src/components/Form/InputDate";

// Hooks
import { useFormIntegration } from "../../../../../../../src/hooks/form";


export function InputDate(_props: IInputDateProps) {
    const { pages } = useLoaderData() as TPages

    const form = useFormIntegration({})
    return <>
        <span className="w-full h-full overflow-y-auto flex flex-col justify-between gap-10">
            <span className="w-full flex-1 md:max-h-[150px] pt-10">
                <hgroup className="">
                    <h1 className="text-4xl font-semibold">InputDate</h1>
                    <p className="text-md font-medium">Este componete provê uma forma facil e intuitiva de captar ou receber uma data</p>
                </hgroup>
            </span>

            <span className="w-full flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
                <input type="radio" name="show-preview" id="show-preview" className="peer/ShowPreview hidden" />

                <span className="w-full  max-sm:flex-1 md:h-full  flex flex-col gap-10 peer-checked/ShowPreview:[&_.show\_preview]:bg-[#141414]">
                    <label htmlFor="show-preview" className=" font-medium text-x ">Preview</label>
                    <span className="w-full h-full
                            show_preview
                            border-[1px] border-[#262626b3] 
                            bg-[#14141470] 
                            backdrop-blur-md
                            rounded-xl
                            p-4
                            py-12
                        "
                    >
                        <InputDateComponent form={form} name="birth_date" label="Data de Nascimento" />
                    </span>
                </span>

                <input type="radio" name="show-preview" id="show-code" className="peer/ShowCode hidden" />


                <span className="w-full  max-sm:flex-1 md:h-full  flex flex-col gap-10 peer-checked/ShowCode:[&_.show\_code]:bg-[#141414]">
                    <label htmlFor="show-code" className=" font-medium text-x ">Código</label>
                    <code data-line-numbers className="w-full h-full
                            show_code
                            overflow-y-auto
                            border-[1px] border-[#262626b3] 
                            bg-[#14141470] 
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

            <span className="w-full h-auto flex flex-row flex-nowrap items-center justify-between gap-10 self-end">
                <NavLink to={`../../${pages?.prev?.path || '/'}`} data-show={pages?.prev && true} className="flex-1 md:max-w-[50%] md:h-[100px] p-4 
                        hidden 
                        data-[show=true]:flex flex-row
                        items-center justify-start 
                        gap-3 rounded-md 
                        border-[1px] 
                        border-[#262626b3] 
                        bg-[#14141470] backdrop-blur-md
                        [&_span]:hover:after:opacity-70
                    "
                >
                    <span className="flex-1 max-w-[5rem] h-full
                        flex items-center justify-center relative
                        after:blur-xl after:w-[30%]
                        after:z-[-1] 
                        after:absolute
                        after:inset-[35%]                        
                        after:bg-[#3178C6]
                        after:opacity-10
                    ">
                        <span className="w-20 h-20 
                                flex items-center 
                                justify-center rounded-md 
                                border-[1px] border-[#262626b3] 
                                bg-[#14141490] backdrop-blur-3xl                                
                                z-10                               
                            "
                        >
                            <LuChevronLeft size={32} color="#3178C6" />
                        </span>
                    </span>
                    <span className="w-full h-full flex flex-col gap-2">
                        <span className="font-semibold">Pagina Anterior</span>
                        <p className="font-light text-sm">
                            {pages?.prev?.name}
                        </p>
                    </span>
                </NavLink>
                <NavLink to={`../../${pages?.next?.path || '/'}`} data-show={pages?.next && true} className="flex-1 md:max-w-[50%] md:h-[100px] p-4 
                        hidden 
                        data-[show=true]:flex flex-row
                        items-center justify-start 
                        gap-3 rounded-md 
                        border-[1px] 
                        border-[#262626b3] 
                        bg-[#14141470] backdrop-blur-md
                        [&_span]:hover:after:opacity-70
                    "
                >
                    <span className="flex-1 max-w-[5rem] h-full
                        flex items-center justify-center relative
                        after:blur-xl after:w-[30%]
                        after:z-[-1] 
                        after:absolute
                        after:inset-[35%]                        
                        after:bg-[#3178C6]
                        after:opacity-10
                    ">
                        <span className="w-20 h-20 
                                flex items-center 
                                justify-center rounded-md 
                                border-[1px] border-[#262626b3] 
                                bg-[#14141490] backdrop-blur-3xl                                
                                z-10                               
                            "
                        >
                            <LuChevronRight size={32} color="#3178C6" />
                        </span>
                    </span>
                    <span className="w-full h-full flex flex-col gap-2">
                        <span className="font-semibold">Proxima Pagina</span>
                        <p className="font-light text-sm">
                            {pages?.next?.name}
                        </p>
                    </span>
                </NavLink>
            </span>
        </span>
    </>
}
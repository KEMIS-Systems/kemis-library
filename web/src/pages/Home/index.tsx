import { DiCode, DiNpm, DiReact } from "react-icons/di";
import { SiTypescript } from "react-icons/si";
import { NavLink } from "react-router-dom";

export function Home() {
    return <>
        <span className="w-full h-auto p-10 md:pt-52 md:mb-[6rem] flex flex-col items-center justify-center gap-20 ">
            <hgroup className="items-center justify-center select-none cursor-default">
                <h1 className="text-2xl md:text-5xl font-semibold ">
                    Kemis Library
                </h1>
                <p className="font-medium text-xs md:text-xl text-center">A biblioteca de componentes que torna o desenvolvimento das aplicações mais simples e rápido</p>
            </hgroup>

            <span className="w-full md:w-[60%] max-sm:flex-1  max-sm:overflow-y-auto md:h-auto flex flex-col gap-3">
                <span className="w-full h-auto flex flex-col md:flex-row md:items-center gap-5">
                    <span className="w-full md:w-3/12 h-[348px] p-4 
                        flex flex-col
                        items-center justify-center 
                        gap-3 rounded-md 
                        border-[1px] 
                        border-[#a8a8a8b3] 
                        bg-[#f5f5f5bd] 
                        backdrop-blur-md
                        [&_span]:hover:after:opacity-70
                    "
                    >
                        <span className="flex-1 max-h-[40%] w-full 
                        flex items-center justify-center relative
                        after:blur-xl 
                        after:w-14
                        after:h-14
                        after:z-[-1] 
                        after:rounded-full
                        after:absolute
                        after:top-1/2
                        after:-translate-y-1/2
                        after:bg-blue-600
                        after:opacity-10
                    ">
                            <span className="w-20 h-20 
                                flex items-center 
                                justify-center rounded-md 
                                border-[1px] border-[#a8a8a8b3] 
                                bg-[#14141490] backdrop-blur-3xl                                
                                z-10                               
                            "
                            >
                                <DiCode size={64} />
                            </span>
                        </span>
                        <hgroup className="items-center justify-center select-none cursor-default">
                            <h3 className="text-xl font-semibold">Integrado com Zod</h3>
                            <p className="font-light text-sm text-center">Uma gestão de validação simples e intuitiva</p>
                        </hgroup>
                    </span>
                    <span className="w-full md:flex-1 h-[348px] p-4 flex flex-col
                        items-center justify-center 
                        gap-3 rounded-md 
                        border-[1px] 
                        border-[#a8a8a8b3] 
                        bg-[#f5f5f5bd]  backdrop-blur-md
                        [&_span]:hover:after:opacity-70
                    "
                    >
                        <span className="flex-1 max-h-[40%] w-full 
                                flex items-center 
                                justify-center relative
                                after:blur-xl 
                                after:w-14
                                after:h-14
                                after:z-[-1] 
                                after:rounded-full
                                after:absolute
                                after:top-1/2
                                after:-translate-y-1/2
                                after:bg-[#00d8ff]
                                after:opacity-10
                            "
                        >
                            <span className="w-20 h-20 
                                flex items-center 
                                justify-center rounded-md 
                                border-[1px] border-[#a8a8a8b3] 
                                bg-[#14141490] backdrop-blur-3xl                                
                                z-10                               
                            "
                            >
                                <DiReact size={64} color="#00d8ff" />
                            </span>
                        </span>
                        <hgroup className="items-center justify-center select-none cursor-default">
                            <h3 className="text-xl font-semibold">Feito para React</h3>
                            <p className="font-light text-sm text-center">
                                Feita por quem usa React para quem ama React
                            </p>
                        </hgroup>
                    </span>
                </span>
                <span className="w-full h-auto flex flex-col md:flex-row md:items-center gap-5">
                    <span className="w-full md:flex-1 md:h-[348px] p-4 flex flex-col
                        items-center justify-center 
                        gap-3 rounded-md 
                        border-[1px] 
                        border-[#a8a8a8b3] 
                        bg-[#f5f5f5bd]  backdrop-blur-md
                        [&_span]:hover:after:opacity-70
                    "
                    >
                        <span className="flex-1 max-h-[40%] w-full 
                        flex items-center justify-center relative
                        after:blur-xl 
                        after:w-14
                        after:h-14
                        after:z-[-1] 
                        after:rounded-full
                        after:absolute
                        after:top-1/2
                        after:-translate-y-1/2
                        after:bg-[#cb3837]
                        after:opacity-10
                    ">
                            <span className="w-20 h-20 
                                flex items-center 
                                justify-center rounded-md 
                                border-[1px] border-[#a8a8a8b3] 
                                bg-[#14141490] backdrop-blur-3xl                                
                                z-10                               
                            "
                            >
                                <DiNpm size={50} color="#cb3837" />
                            </span>
                        </span>
                        <hgroup className="items-center justify-center select-none cursor-default">
                            <h3 className="text-xl font-semibold">Disponivel em diversas versões</h3>
                            <p className="font-light text-sm text-center">Disponivel como um pacote no NPM, você pode optar pela versão que mais se adequa ao seu projeto. Mas é claro, a ultima versão é sempre a melhor</p>
                        </hgroup>
                    </span>
                    <span className="w-full md:w-3/12 md:h-[348px] p-4 
                        flex flex-col
                        items-center justify-center 
                        gap-3 rounded-md 
                        border-[1px] 
                        border-[#a8a8a8b3] 
                        bg-[#f5f5f5bd]  backdrop-blur-md
                        [&_span]:hover:after:opacity-70
                    "
                    >
                        <span className="flex-1 max-h-[40%] w-full 
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
                                border-[1px] border-[#a8a8a8b3] 
                                bg-[#14141490] backdrop-blur-3xl                                
                                z-10                               
                            "
                            >
                                <SiTypescript size={32} color="#3178C6" />
                            </span>
                        </span>
                        <hgroup className="items-center justify-center select-none cursor-default">
                            <h3 className="text-xl font-semibold">Full Typed</h3>
                            <p className="font-light text-sm text-center">Totalmente tipada, para fornecer um ambiente mais estavel possivel durante o desenvolvimento</p>
                        </hgroup>
                    </span>
                </span>
            </span>
        </span>

        <span className="w-1/2 flex border-[2px] border-dashed border-[#a8a8a8b3] bg-[#14141490] backdrop-blur-3xl ml-[25%] mr-[25%]"></span>

        <span className="w-full h-auto p-10 md:my-[6rem] flex flex-col items-center justify-center gap-14">
            <hgroup className="items-center justify-center select-none cursor-default">
                <h1 className="text-3xl md:text-5xl font-semibold h1-main-gradiente">
                    Começe a construir
                </h1>
                <p className="font-medium text-xs md:text-xl text-center">De facil uso, basta instalar e começar a usar</p>
            </hgroup>

            <NavLink to="/guide" className="w-full md:w-40 h-12                     
                    relative
                    bg-transparent
                    rounded-xl

                    after:blur-xl 
                    after:w-14
                    after:h-full
                    after:z-[-1] 
                    after:rounded-md
                    after:absolute
                    after:left-1/2
                    after:-translate-x-1/2
                    after:top-1/2
                    after:-translate-y-1/2
                    after:bg-[#00d8ff]
                    after:opacity-10

                    hover:after:opacity-70
                "
            >
                <span className="
                    w-full h-full
                    border-[1px] 
                    rounded-xl
                    border-[#a8a8a8b3] 
                    bg-[#f5f5f5bd]  
                    backdrop-blur-md
                    z-10

                    flex flex-row 
                    items-center  justify-center 
                    gap-4 "
                >
                    Começar
                </span>
            </NavLink>
        </span>
    </>
}
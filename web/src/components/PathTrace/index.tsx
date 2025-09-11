import { NavLink } from "react-router-dom";

// Icons
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

// Types
import type { IPathTraceProps } from "./types";

export function PathTrace({ pages }: IPathTraceProps) {
    return (
        <span className="w-full h-auto flex flex-row flex-nowrap items-center justify-between gap-10 self-end">
            <NavLink to={`../../${pages?.prev?.path || '/'}`} data-show={pages?.prev && true} className="flex-1 md:max-w-[50%] md:h-[100px] p-4 
                    hidden 
                    data-[show=true]:flex flex-row
                    items-center justify-start 
                    gap-3 rounded-md 
                    border-[1px] 
                    border-[#a8a8a8b3] 
                    bg-[#f5f5f5bd] backdrop-blur-md
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
                            border-[1px] border-[#a8a8a8b3] 
                            bg-[#a8a8a8b3] backdrop-blur-3xl                                
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
                    border-[#a8a8a8b3] 
                    bg-[#f5f5f5bd] backdrop-blur-md
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
                            border-[1px] border-[#a8a8a8b3] 
                            bg-[#f5f5f5bd] backdrop-blur-3xl                                
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
    )
}
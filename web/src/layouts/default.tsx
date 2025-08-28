import { NavLink, Outlet } from "react-router-dom";

// Icons
import { Components } from "@src/assets/data/components";
import { LuHousePlug, LuLayers } from "react-icons/lu";

export function DefaultLayout() {
    return <>
        <main className="w-full h-full flex flex-col md:flex-row md:flex-nowrap gap-5 bg-green-500">
            <aside className="max-sm:w-full h-14 md:flex-1 md:max-w-[15%] md:h-full bg-red-500">
                <nav className="w-full h-full 
                        py-10 
                        px-4
                        overflow-y-auto 
                        flex flex-row 
                        md:flex-col 
                        flex-nowrap gap-5
                        max-sm:items-center
                        border-r-[1px]
                        border-[#262626b3] bg-[#14141490] 
                        backdrop-blur-3xl
                    "
                >
                    <span className="w-full h-10 flex items-center gap-5 mb-5">
                        Kemis Library
                    </span>

                    <span className="w-full h-auto flex flex-col gap-2">
                        <input
                            type="checkbox"
                            name="show-introduction-menu"
                            id="show-introduction-menu"
                            className="peer/ShowIntroduction hidden"
                        />
                        <label
                            htmlFor="show-introduction-menu"
                            className="w-full h-auto 
                                flex items-center gap-2
                                rounded-md
                                p-3
                                cursor-pointer
                                border-transparent

                                peer-checked/ShowIntroduction:[&+ul]:h-[200px]
                                peer-checked/ShowIntroduction:[&+ul]:py-2
                                peer-checked/ShowIntroduction:[&+ul]:border-dashed
                                peer-checked/ShowIntroduction:[&+ul]:border-l-[1px]
                                peer-checked/ShowIntroduction:[&+ul]:border-[#262626b3]
                                
                                peer-checked/ShowIntroduction:border-[#262626b3]
                                peer-checked/ShowIntroduction:bg-[#14141490] 
                                
                                border-[1px]

                                hover:border-[#262626b3]
                                hover:bg-[#14141490] 
                                
                                hover:active:border-[#1f1f1fb3]
                                hover:active:bg-[#08080890] 
                                
                                active:border-[#1f1f1fb3]
                                active:bg-[#08080890] 

                                select-none
                                
                            "
                        >
                            <LuHousePlug size={16} />
                            Introdução
                        </label>
                        <ul className="w-full min-h-[0px] 
                                h-0 max-h-[500px] 
                                bg-yellow-500
                                border-transparent
                                px-5 py-0
                                overflow-y-auto
                                [&_li]:text-sm
                                flex flex-col gap-5
                            "
                        >
                            <li className="
                                w-full
                                h-12                               
                                rounded-md
                                p-2
                                cursor-pointer
                                border-transparent
                                border-[1px]

                                hover:border-[#262626b3]
                                hover:bg-[#14141490] 
                                
                                hover:active:border-[#1f1f1fb3]
                                hover:active:bg-[#08080890] 
                                
                                active:border-[#1f1f1fb3]
                                active:bg-[#08080890] 
                                "
                            >
                                <NavLink
                                    to="./installation"
                                    className="w-full h-full  
                                        border-none
                                        outline-none
                                        flex items-center
                                        gap-4
                                    "
                                >
                                    Instalação
                                </NavLink>
                            </li>
                            <li className="
                                w-full
                                h-12                               
                                rounded-md
                                p-2
                                cursor-pointer
                                border-transparent
                                border-[1px]

                                hover:border-[#262626b3]
                                hover:bg-[#14141490] 
                                
                                hover:active:border-[#1f1f1fb3]
                                hover:active:bg-[#08080890] 
                                
                                active:border-[#1f1f1fb3]
                                active:bg-[#08080890] 
                                "
                            >
                                <NavLink
                                    to="./installation"
                                    className="w-full h-full  
                                        border-none
                                        outline-none
                                        flex items-center
                                        gap-4
                                    "
                                >
                                    Instalação
                                </NavLink>
                            </li>
                            <li className="
                                w-full
                                h-12                               
                                rounded-md
                                p-2
                                cursor-pointer
                                border-transparent
                                border-[1px]

                                hover:border-[#262626b3]
                                hover:bg-[#14141490] 
                                
                                hover:active:border-[#1f1f1fb3]
                                hover:active:bg-[#08080890] 
                                
                                active:border-[#1f1f1fb3]
                                active:bg-[#08080890] 
                                "
                            >
                                <NavLink
                                    to="./installation"
                                    className="w-full h-full  
                                        border-none
                                        outline-none
                                        flex items-center
                                        gap-4
                                    "
                                >
                                    Instalação
                                </NavLink>
                            </li>
                        </ul>
                    </span>

                    <span className="w-full h-auto flex flex-col gap-2">
                        <input
                            type="checkbox"
                            name="show-introduction-menu"
                            id="show-component-menu"
                            className="peer/ShowIntroduction hidden"
                        />
                        <label
                            htmlFor="show-component-menu"
                            className="w-full h-auto 
                                flex items-center gap-2
                                rounded-md
                                p-3
                                cursor-pointer
                                border-transparent

                                peer-checked/ShowIntroduction:[&+ul]:h-[400px]
                                peer-checked/ShowIntroduction:[&+ul]:py-2
                                peer-checked/ShowIntroduction:[&+ul]:border-dashed
                                peer-checked/ShowIntroduction:[&+ul]:border-l-[1px]
                                peer-checked/ShowIntroduction:[&+ul]:border-[#262626b3]
                                
                                peer-checked/ShowIntroduction:border-[#262626b3]
                                peer-checked/ShowIntroduction:bg-[#14141490] 
                                
                                border-[1px]

                                hover:border-[#262626b3]
                                hover:bg-[#14141490] 
                                
                                hover:active:border-[#1f1f1fb3]
                                hover:active:bg-[#08080890] 
                                
                                active:border-[#1f1f1fb3]
                                active:bg-[#08080890] 

                                select-none
                                
                            "
                        >
                            <LuLayers size={16} />
                            Componentes
                        </label>
                        <ul className="w-full min-h-[0px] 
                                h-0 max-h-[500px] 
                                bg-yellow-500
                                border-transparent
                                px-5 py-0
                                overflow-y-auto
                                [&_li]:text-sm
                                flex flex-col gap-5
                            "
                        >
                            {
                                Components.map((cp, i) => {

                                    return <>
                                        <span key={i} className="text-xs text-gray-200 font-semibold select-none cursor-default">
                                            {cp.name}
                                        </span>
                                        {
                                            cp.sub.map((cps, o) => (
                                                <li
                                                    key={o}
                                                    className="
                                                        w-full
                                                        h-12                               
                                                        rounded-md
                                                        p-2
                                                        cursor-pointer
                                                        border-transparent
                                                        border-[1px]

                                                        hover:border-[#262626b3]
                                                        hover:bg-[#14141490] 
                                                        
                                                        hover:active:border-[#1f1f1fb3]
                                                        hover:active:bg-[#08080890] 
                                                        
                                                        active:border-[#1f1f1fb3]
                                                        active:bg-[#08080890] 
                                                    "
                                                >
                                                    <NavLink
                                                        to={cps.path}
                                                        className="w-full h-full  
                                                            border-none
                                                            outline-none
                                                            flex items-center
                                                            gap-4
                                                        "
                                                    >
                                                        {cps.name}
                                                    </NavLink>
                                                </li>
                                            ))
                                        }
                                    </>

                                })
                            }
                        </ul>
                    </span>
                </nav>
            </aside>
            <section className="md:flex-1 h-full overflow-y-auto bg-blue-400 p-10">
                <Outlet />
            </section>
        </main>
    </>
}
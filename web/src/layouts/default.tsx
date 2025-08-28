import { NavLink, Outlet } from "react-router-dom";

// Icons
import { Components } from "@src/assets/data/components";
import { LuHousePlug, LuLayers } from "react-icons/lu";

export function DefaultLayout() {
    return <>
        <main className="w-full h-full flex flex-col md:flex-row md:flex-nowrap gap-5 max-sm:relative">
            <aside className="max-sm:w-full h-14 md:flex-1 md:max-w-[15%] md:h-full">
                <nav className="w-full h-full 
                        py-5
                        md:py-10 
                        px-4
                        md:overflow-y-auto                         
                        flex flex-row 
                        md:flex-col 
                        flex-nowrap 
                        max-sm:items-center
                        gap-5
                        border-r-[1px]
                        border-[#262626b3] bg-[#14141490] 
                        backdrop-blur-3xl
                        aside-default-layout
                    "
                >
                    <span className="w-full h-auto px-5 md:py-5 flex flex-row items-center gap-5 md:mb-5 border-dashed max-sm:border-r-[1px] md:border-b-[1px] border-[#262626b3] ">
                        <h1 className="hidden md:flex text-2xl font-semibold items-center gap-2 select-none">
                            Kemis Library
                            <span className="text-[0.6rem] !select-auto font-thin">v2.10.31</span>
                        </h1>
                        <h1 className="flex md:hidden text-2xl font-semibold items-center gap-2 select-none">
                            KL
                            <span className="text-[0.6rem] !select-auto font-thin">v2.10.31</span>
                        </h1>
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

                                max-sm:peer-checked/ShowIntroduction:[&+ul]:absolute
                                max-sm:peer-checked/ShowIntroduction:[&+ul]:w-scrren
                                max-sm:peer-checked/ShowIntroduction:[&+ul]:top-14
                                max-sm:peer-checked/ShowIntroduction:[&+ul]:left-0
                                max-sm:peer-checked/ShowIntroduction:[&+ul]:z-[999]
                                max-sm:peer-checked/ShowIntroduction:[&+ul]:bg-[#1a1919f5]
                                max-sm:peer-checked/ShowIntroduction:[&+ul]:h-screen
                                max-sm:peer-checked/ShowIntroduction:[&+ul]:rounded-2xl
                                
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
                                bg-[#81818113]
                                rounded-md
                                border-transparent
                                px-5 py-0
                                overflow-hidden
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
                            className="peer/ShowComponents hidden"
                        />
                        <label
                            htmlFor="show-component-menu"
                            className="w-full h-auto 
                                flex items-center gap-2
                                rounded-md
                                p-3
                                cursor-pointer
                                border-transparent

                                max-sm:peer-checked/ShowComponents:[&+ul]:absolute
                                max-sm:peer-checked/ShowComponents:[&+ul]:w-scrren
                                max-sm:peer-checked/ShowComponents:[&+ul]:top-14
                                max-sm:peer-checked/ShowComponents:[&+ul]:left-0
                                max-sm:peer-checked/ShowComponents:[&+ul]:z-[999]
                                max-sm:peer-checked/ShowComponents:[&+ul]:bg-[#1a1919f5]
                                max-sm:peer-checked/ShowComponents:[&+ul]:h-full
                                max-sm:peer-checked/ShowComponents:[&+ul]:rounded-2xl

                                peer-checked/ShowComponents:[&+ul]:h-[90%]
                                peer-checked/ShowComponents:[&+ul]:py-2
                                peer-checked/ShowComponents:[&+ul]:border-dashed
                                peer-checked/ShowComponents:[&+ul]:border-l-[1px]
                                peer-checked/ShowComponents:[&+ul]:border-[#262626b3]
                                
                                peer-checked/ShowComponents:border-[#262626b3]
                                peer-checked/ShowComponents:bg-[#14141490] 
                                
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
                                h-0
                                rounded-md
                                bg-[#81818113]
                                border-transparent
                                px-5 py-0
                                overflow-y-auto
                                [&_li]:text-sm
                                flex flex-col gap-5
                            "
                            style={{
                                maxHeight: 'calc(100% - 200px)'
                            }}
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
                                                        min-h-12
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
            <section className="md:flex-1 h-full overflow-y-auto  p-10">
                <Outlet />
            </section>
        </main>
    </>
}
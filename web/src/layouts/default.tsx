import { Outlet } from "react-router-dom";

export function DefaultLayout() {
    return <>
        <main className="w-full h-full flex flex-col md:flex-row md:flex-nowrap gap-5 bg-green-500">
            <aside className="max-sm:w-full h-14 md:flex-1 md:max-w-[30%] md:h-full bg-red-500">
                <nav></nav>
            </aside>
            <section>
                <Outlet />
            </section>
        </main>
    </>
}
import NutAppBar from "./NutAppBar";

export default function Layout({children}: {children: JSX.Element}) {
    return (
        <>
            <NutAppBar/>
            <main>{children}</main>
        </>
    )
}
import NutAppBar from "./NutAppBar";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { AccountType } from "../account";
import { useAccountStore } from "../state/store";
import { Description, Title } from "../styles";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { safeAlert } from "../utils";

const theme = createTheme({
    palette : {
        secondary : {
            main : '#ffffff'
        }
    }
})

interface LayoutProps {
    restrictUserAccess?: (AccountType | 'any') | (AccountType | 'any')[]
}

export default function Layout({children, restrictUserAccess}: {children: JSX.Element} & LayoutProps) {
    const accountStore = useAccountStore()
    const router = useRouter()
    const [isAllowAccess, setAllowAccess] = useState(false);

    useEffect(() => {
        if (restrictUserAccess == undefined) {
            setAllowAccess(true)
            restrictUserAccess = "any"
        } else if (restrictUserAccess instanceof Array) {
            if (!restrictUserAccess.includes("any")) {
                for (const t of restrictUserAccess) {
                    if (accountStore.accountType == t) {
                        setAllowAccess(true)
                        console.log(`2. ${isAllowAccess}`)
                        break;
                    }
                }
            } else {
                setAllowAccess(true)
                console.log(`3. ${isAllowAccess}`)
            }
        } else if (accountStore.accountType == restrictUserAccess) {
            setAllowAccess(true)
            console.log(`4. ${isAllowAccess}, ${accountStore.accountType}, ${restrictUserAccess}`)
        } else {
            setAllowAccess(false)
        }
    }, [accountStore.accountType])


    useEffect(() => {
        console.log(`접근이 ${isAllowAccess}됨`)
        if (router.pathname == "/") {
            return
        }
        if (!isAllowAccess) {
            const interval = setInterval(() => {
                if (!isAllowAccess) {
                    safeAlert("이 페이지에 접속할 수 없습니다.")
                    router.push('/', undefined, {shallow: true});
                    setAllowAccess(true);
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isAllowAccess])


    if (!isAllowAccess && restrictUserAccess != undefined) {
        return <ThemeProvider theme={theme}>
            <Title>권한 없음</Title>
            <Description>이 페이지에 접속하려면 {restrictUserAccess ?? "null"} 권한이 있어야합니다.</Description>
            <Description>잠시후 메인 페이지로 이동됩니다.</Description>
        </ThemeProvider>
    }
    return (
        <ThemeProvider theme={theme}>
            <NutAppBar/>
            <Box sx={{height : "67px"}}></Box>
            <main>{children}</main>
        </ThemeProvider>
    )
}
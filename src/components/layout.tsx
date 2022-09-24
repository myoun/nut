import NutAppBar from "./NutAppBar";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
    palette : {
        secondary : {
            main : '#ffffff'
        }
    }
})

export default function Layout({children}: {children: JSX.Element}) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <NutAppBar/>
                <Box sx={{height : "67px"}}></Box>
                <main>{children}</main>
            </ThemeProvider>

        </>
    )
}
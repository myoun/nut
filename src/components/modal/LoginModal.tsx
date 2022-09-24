import { Button, Dialog, TextField } from "@mui/material"
import { Box, Container, Stack } from "@mui/system"
import { useState } from "react"
import { AccountTypeGuard, getAccountInfo, validateAs } from "../../account"
import { useAccountStore } from "../../state/store"
import { BoldText, CenterText, getTranslatedMode, SignContext, SignContextProps } from "./NutSignModal"

const LoginModal = () => {
    const accountStore = useAccountStore()
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [contextValue, setContextValue] = useState<SignContextProps | null>(null);

    const end = () => {
        setId("")
        setPw("")
        contextValue?.handleClose()
    }

    const login = async () => {
        
        // 1. validate
        const isValid = await validateAs(contextValue!!.mode, {
            id : id,
            password : pw
        });

        if (!isValid) {
            // 로그인 실패
            alert("로그인 실패")
            end()
            return
        }

        // 2. 정보 가져오기
        const account = await getAccountInfo(id, contextValue!!.mode)
        
        if (account == null) {
            // 로그인 실패
            alert("로그인 실패")
            end()
            contextValue?.handleClose()
            return
        } 
        
        // 로그인
        accountStore.login(account)
        
        end()
        return
    };

    return <>
        <SignContext.Consumer>
            {value => {
                setContextValue(value);
                return <>
                    <Dialog open={value.open} onClose={value.handleClose} maxWidth="xl">
                        <Container fixed sx={{ height : '75vh', width : '1000px'}} disableGutters>
                                <Stack sx={{margin : "50px"}} spacing={5}>
                                <h1>{getTranslatedMode(value.mode)}로 로그인</h1>
                                    <TextField label="ID" variant="standard" onChange={event => setId(event.target.value)}></TextField>
                                    <TextField label="PASSWORD" type="password" variant="standard" onChange={event => setPw(event.target.value)}></TextField>
                                    <Button variant="outlined" size="large" onClick={login}>로그인</Button>
                                </Stack>
                                <Box sx={{position : "absolute", bottom : "0", width : "100%"}}>
                                    <Stack sx={{marginBottom : "20px"}}>
                                        <CenterText>
                                            <BoldText>{getTranslatedMode(value.getNextMode(value.mode))}로 로그인하고 싶으신가요?</BoldText>
                                            <Button onClick={value.toNextMode}>{`여기를 클릭하세요.`}</Button>
                                        </CenterText>
                                        <CenterText>
                                            <BoldText>계정이 없으신가요?</BoldText>
                                            <Button onClick={value.togglePage}>계정 만들기</Button>
                                        </CenterText>
                                    </Stack>
                                </Box>
                        </Container>
                    </Dialog>
                </>
                }
            }
        </SignContext.Consumer>

</>
}

export default LoginModal
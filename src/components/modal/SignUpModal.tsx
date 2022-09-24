import { Button, Container, Dialog, Stack, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { signUpAs } from "../../account"
import { sendPostRequest } from "../../utils"
import { BoldText, CenterText, getTranslatedMode, SignContext, SignContextProps } from "./NutSignModal"

export default function SignUpModal() {
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [name, setName] = useState("")
    const [contextValue, setContextValue] = useState<SignContextProps | null>(null);

    const signup = () => {
        signUpAs(contextValue!!.mode, {
            id : id,
            name : name,
            password : pw
        }).catch((reason) => {
            console.log(reason)
        }).then(() => {
            // 계정 가입 성공
            alert("가입 성공")

            // 모달 닫기
            contextValue?.handleClose()
        })
    }


    return <>
        <SignContext.Consumer>
            {value => {
                setContextValue(value)
                return <>
                    <Dialog open={value.open} onClose={value.handleClose} maxWidth="xl">
                        <Container fixed sx={{ height : '85vh', width : '1000px'}} disableGutters>
                                <Stack sx={{margin : "50px"}} spacing={5}>
                                <h1>{getTranslatedMode(value.mode)} 가입</h1>
                                    <TextField label="ID" variant="standard" onChange={event => setId(event.target.value)}></TextField>
                                    <TextField label="NAME" variant="standard" onChange={event => setName(event.target.value)}></TextField>
                                    <TextField label="PASSWORD" variant="standard" onChange={event => setPw(event.target.value)} type="password"></TextField>
                                    <Button variant="outlined" size="large" onClick={signup}>가입</Button>
                                </Stack>
                                <Box sx={{position : "absolute", bottom : "0", width : "100%"}}>
                                    <Stack sx={{marginBottom : "20px"}}>
                                        <CenterText>
                                            <BoldText>{getTranslatedMode(value.getNextMode(value.mode))}로 가입하고 싶으신가요?</BoldText>
                                            <Button onClick={value.toNextMode}>{`여기를 클릭하세요.`}</Button>
                                        </CenterText>
                                        <CenterText>
                                            <BoldText>계정이 이미 있으신가요?</BoldText>
                                            <Button onClick={value.togglePage}>로그인하기</Button>
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
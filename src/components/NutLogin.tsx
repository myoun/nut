import { createContext, useState } from "react"
import emotionStyled from "@emotion/styled";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import { AccountType } from "../account";

// Styles
export const BoldText = emotionStyled.span`
    font-weight : 700;
`

export const CenterText = emotionStyled.span`
    text-align : center;
    display : block;
`

/**
 * Page for Sign Modal
 */
export type SignPage = "login" | "signup"

/**
 * Property for children of Sign Modal
 */
export interface SignContextProps extends ModalProps {
    mode: AccountType
    getNextMode: (mode: AccountType) => AccountType
    toNextMode: () => void

    page: SignPage
    togglePage: () => void
}



/**
 * Context for Sign Modal and its children
 */
export const SignContext = createContext<SignContextProps>(({
    open : false,
    handleClose: () => {},
    mode: "user",
    getNextMode : (mode: AccountType) => mode,
    toNextMode : () => {},
    page : "login",
    togglePage : () => {}
}))

/**
 * Get Translated Text for AccountType (en => ko)
 * @param modeName AccountType
 * @returns Translated Text (en => ko)
 */
export const getTranslatedMode: (mode: AccountType) => string = (modeName: AccountType) => {
    switch (modeName) {
        case "user":
            return "유저"
        case "seller":
            return "판매자"
        case "admin":
            return "관리자" 
        default:
            return "게스트"           
    }
}
  
/**
 * NutSignModal Props
 */
 interface ModalProps {
    open: boolean,
    handleClose: () => void
}

/**
 * Sign Modal (For Login/Signup)
 */
const NutSignModal = (props: ModalProps) => {

    const [mode, setMode] = useState<AccountType>("user")
    
    // is page login mode or sign up mode
    const [page, setPage] = useState<SignPage>("login")

    const getNextMode = (modeName: AccountType) => {
        if (modeName == "user") return "seller"
        else if (modeName == "seller") return "admin"
        else return "user"
    }

    const togglePage = () => {
        page == "login" ? setPage("signup") : setPage("login")
    }
    const toNextMode = () => {
        setMode(getNextMode(mode))
    }

    const contextValue: SignContextProps = {
        open : props.open,
        handleClose : props.handleClose,
        mode : mode,
        getNextMode : getNextMode,
        toNextMode : toNextMode,
        page: page,
        togglePage : togglePage
    }

    return <>
        <SignContext.Provider value={contextValue}>
            {
                page == "login" ?
                <LoginModal></LoginModal>
                : <SignUpModal></SignUpModal>

            }
        </SignContext.Provider>
    </>

}

export default NutSignModal
import { ReactElement, useState } from "react";
import Layout from "../src/components/layout";
import { NextPageWithLayout } from "./_app";
import emotionStyled from "@emotion/styled"
import { useAccountStore } from "../src/state/store";
import { Box } from "@mui/system";
import { useRouter } from "next/router";

const Title = emotionStyled.h1`
    
`

const MyPage: NextPageWithLayout = () => {
    const accountStore = useAccountStore()


    return (
        <>  
            <CheckLogin></CheckLogin>
            <Box sx={{height : "67px"}}></Box>
            {accountStore.accountType} 마이페이지
        </>
    )
}

const CheckLogin = () => {
    const accountStore = useAccountStore()
    const router = useRouter()

    if (accountStore.accountType == "guest") {
        alert("로그인이 필요합니다.")
        router.push("/", undefined, { shallow : true })
    }

    return <></>
}

MyPage.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>
        {page}
      </Layout>
    );
  }

export default MyPage
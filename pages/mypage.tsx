import { Fragment, ReactElement, useEffect, useState } from "react";
import Layout from "../src/components/layout";
import { NextPageWithLayout } from "./_app";
import emotionStyled from "@emotion/styled"
import { useAccountStore } from "../src/state/store";
import { Box } from "@mui/system";
import { useRouter } from "next/router";

const MyPage: NextPageWithLayout = () => {
    const accountStore = useAccountStore()

    return (
        <>  
            <CheckLogin></CheckLogin>
            {accountStore.accountType} 마이페이지
        </>
    )
}

const CheckLogin: () => JSX.Element = () => {
    const accountStore = useAccountStore()
    const router = useRouter()

    useEffect(() => {
        if (accountStore.accountType == "guest") {
            // alert("로그인이 필요합니다.")
            router.push("/", undefined, { shallow : true})
        }
    }, []);


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
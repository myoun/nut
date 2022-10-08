import { Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import useSWR from "swr";
import { User } from "../../src/account";
import Layout from "../../src/components/layout";
import { PurchaseHistoryProduct } from "../../src/components/ShopProduct";
import { useAccountStore } from "../../src/state/store";
import { Title, Description, ProductContainer } from "../../src/styles";
import { axiosFetcher, BACKEND_BASE_URL, formatUrl, safeAlert } from "../../src/utils";
import { Product } from "../shop";
import { NextPageWithLayout } from "../_app";

export interface PurchaseHistory {
    id: number;
    user: User;
    product: Product;
    purchaseAt: string;
    isDelivered: boolean;
}

const PurchaseListPage: NextPageWithLayout = () => {
    
    const accountStore = useAccountStore()
    const router = useRouter()

    const [showDelivered, setShowDelivered] = useState(false)

    useEffect(() => {
        if (accountStore.accountType != "user") {
            safeAlert("유저만 확인할 수 있습니다 : "+accountStore.accountType)
            router.back()
        }
    }, [])



    const { data } = useSWR<PurchaseHistory[]>(accountStore.account?.id ? formatUrl(BACKEND_BASE_URL!!, `/users/${accountStore.account!.id}/history`) : null, axiosFetcher);

    console.log(data)
    return <>
        <style jsx global>{`
            body {
                background-color : whitesmoke; 
            }
        `}</style>
        <Title>구매 내역</Title>
        <Description>자신이 구매한 상품을 조회할 수 있습니다.</Description>
        <Box>배송 완료된 상품 보기   <Checkbox onClick={() => setShowDelivered(!showDelivered)}></Checkbox></Box>
        <ProductContainer>
            { data &&
                (() => {
                    let vdata = data
                    if (!showDelivered) {
                        vdata = vdata.filter((v) => !v.isDelivered)
                    }
                    return vdata.map((v) => <PurchaseHistoryProduct history={v}></PurchaseHistoryProduct>)
                })()
            }
        </ProductContainer>
    </>
}

PurchaseListPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    );
}

export default PurchaseListPage
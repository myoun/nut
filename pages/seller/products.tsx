import { Button } from "@mui/material";
import Link from "next/link";
import { ReactElement, useState } from "react";
import useSWR from "swr";
import { Seller } from "../../src/account";
import Layout from "../../src/components/layout";
import { SellerProduct } from "../../src/components/ShopProduct";
import { useAccountStore } from "../../src/state/store";
import { ProductContainer, Title } from "../../src/styles";
import { axiosFetcher, BACKEND_BASE_URL, formatUrl } from "../../src/utils";
import { Product } from "../shop";
import { NextPageWithLayout } from "../_app";

const ProductsPage: NextPageWithLayout = () => {
    const accountStore = useAccountStore()
    const { data } = useSWR<Product[]>(accountStore.account?.id ? formatUrl(BACKEND_BASE_URL!!, `/sellers/${accountStore.account!.id}/products`) : null, axiosFetcher);

    return (
        <>  
            <style jsx global>{`
                body {
                    background-color : whitesmoke; 
                }
            `}</style>
            <Title>내 상품</Title>
            <Link href={"/seller/newproduct"}><Button color="primary" variant="contained" sx={{marginLeft : "50px"}}>상품 추가하기</Button></Link>
            <ProductContainer>
                { data?.map((prod, i) => <SellerProduct product={prod} seller={accountStore.account as Seller} key={i}></SellerProduct>) }
            </ProductContainer>
        </>
    )
}

ProductsPage.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout restrictUserAccess={"seller"}>
        {page}
      </Layout>
    );
  }

export default ProductsPage
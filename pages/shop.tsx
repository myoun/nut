import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import Layout from "../src/components/layout";
import { ShopProduct } from "../src/components/ShopProduct";
import { useAccountStore } from "../src/state/store";
import { Title, Description, ProductContainer } from "../src/styles";
import { axiosFetcher, BACKEND_BASE_URL, formatUrl, mapOf, sendGetRequest } from "../src/utils";
import { NextPageWithLayout } from "./_app";
import useSwr from 'swr'

export interface ProductSchema extends Product {
    seller : SellerInfo;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    thumbnail_url: string | null;
    description: string;
    content: string;
}

export interface SellerInfo {
    name: string,
    id: string
}

const ShopPage: NextPageWithLayout = () => {
    const accountStore = useAccountStore()
    const { query } = useRouter()
    const { data } = useSwr<ProductSchema[]>(formatUrl(BACKEND_BASE_URL!!, "/sellers/products", mapOf({ page : query.page ?? 0 , size : 20})), axiosFetcher)

    
    return (
        <>  
            <style jsx global>{`
                body {
                    background-color : whitesmoke; 
                }
            `}</style>
            <Title>상점</Title>
            <Description>포인트로 제품을 구매할 수 있는 페이지입니다.</Description>
            <ProductContainer>
                {
                    data?.map((p) => <ShopProduct name={p.name} price={p.price} id={p.id} seller={p.seller} thumbnailUrl={p.thumbnail_url ?? undefined} key={p.id}/>)
                }
            </ProductContainer>
        </>
    )
}

ShopPage.getLayout = function getLayout(page: ReactElement) {
    return (

        <Layout>
        {page}
        </Layout>
    );
}

export default ShopPage
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import Layout from "../src/components/layout";
import ShopProduct from "../src/components/ShopProduct";
import { useAccountStore } from "../src/state/store";
import { Title, Description } from "../src/styles";
import { axiosFetcher, BACKEND_BASE_URL, formatUrl, mapOf, sendGetRequest } from "../src/utils";
import { NextPageWithLayout } from "./_app";
import useSwr from 'swr'

const ProductContainer = styled.div`
    display : grid;
    padding : 50px;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(autofill, minmax(200px, auto));
    column-gap : 25px;
    row-gap : 20px;
    text-align: center;
`

interface ProductSchema {
    id: number;
    name: string;
    price: number;
    thumbnail_url: string | null;
    seller_id: string;
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
                    data?.map((p) => <ShopProduct name={p.name} price={p.price} id={p.id} seller={p.seller_id} thumbnailUrl={p.thumbnail_url ?? undefined} key={p.id}/>)
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
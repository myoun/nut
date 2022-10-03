import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Markdown from "markdown-to-jsx";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import useSWR from "swr";
import { User } from "../../src/account";
import Layout from "../../src/components/layout";
import { useAccountStore } from "../../src/state/store";
import { Description, Title } from "../../src/styles";
import { axiosFetcher, BACKEND_BASE_URL, formatUrl, safeAlert, sendPostRequest } from "../../src/utils";
import { ProductSchema } from "../shop";
import { NextPageWithLayout } from "../_app";

const ProductContainer = styled.div`
    display : grid;
    
    grid-template-rows : 1fr 1fr;
    grid-template-columns : 1fr;

    margin-left : 15%;
    margin-right : 15%;

    row-gap : 10px;

    @media (max-width: 1200px) {
        margin-right : 5%;
        margin-left : 5%;
    }

`

const ProductContentContainer = styled.div`
    /* padding : 40px; */
`

const ProductInfoContainer = styled.div`
    display : grid;
    grid-template-columns : 1fr 1fr;
    margin-top : 100px;
    column-gap : 40px;
`

const ProductImage = styled.img`
    width : 80%;
`

const ImageContainer = styled.div`
    text-align : center;
    width : 100%;
    border-radius : 2px;
    border : 2px solid lightgray;
`

const DescriptionContainer = styled.div`
    display : grid;
    grid-template-columns : 1fr;
    grid-template-rows : 2fr 1fr 1fr 6fr;
    row-gap : 20px;
    padding-left : 20px;
    padding-right : 20px;
`

const PriceP = styled.p`
    text-align : right;
    font-size : 25px;
    font-weight : 600;
    color : crimson;
    margin-top : 0;
    margin-bottom : 0;
`

const DescriptionTextArea = styled.textarea`
    resize : none;
`

interface PurchaseRequestInfo {
    user_id: string;
    product_id: number;
}

interface PurchaseResponse {
    user: User;
    product: ProductSchema;
}

const ProductPage: NextPageWithLayout = () => {

    const router = useRouter();
    const { id } = router.query
    
    const productId = id as string;

    const accountStore = useAccountStore()


    const { data } = useSWR<ProductSchema>(typeof id !== "undefined" ? formatUrl(BACKEND_BASE_URL!!, "/sellers/products/"+productId) : null, axiosFetcher, {
        revalidateOnFocus : false,
        refreshWhenHidden : false,
        refreshWhenOffline : false
    })

    const buy = async () => {
        // 비회원 검증
        if (accountStore.accountType != "user") {
            // 게스트나 기타 아이디
            safeAlert("유저 아아디로 로그인해주세요.")
            return
        }

        if ((accountStore.account!! as User).point < data!!.price) {
            safeAlert("포인트가 부족합니다.")
            return
        }

        const requestInfo: PurchaseRequestInfo = {
            user_id : accountStore.account!!.id,
            product_id : parseInt(productId)
        }

        const response = await sendPostRequest<PurchaseResponse>("/users/purchase", requestInfo)

        if (response) {
            safeAlert("성공적으로 상품을 구매했습니다.")
        }
    }

    return <>
        {
            data && 
            <ProductContainer>
                <ProductInfoContainer>
                    <ImageContainer>
                        <ProductImage src={data?.thumbnail_url!!} alt="제품 사진"></ProductImage>
                    </ImageContainer>
                    <DescriptionContainer>
                        <h1>{data!!.name}</h1>
                        <PriceP>{data!!.price}포인트</PriceP>
                        <Button color="primary" variant="outlined" onClick={buy}>구매하기</Button>
                        <DescriptionTextArea disabled value={data!!.description}></DescriptionTextArea>
                    </DescriptionContainer>
                </ProductInfoContainer>
                <ProductContentContainer>
                    <h1>상품 설명</h1>
                    <Box sx={{border : '2px solid lightgray', minHeight : '500px', borderRadius : '2px'}}>
                        <Markdown>{data!!.content}</Markdown>
                    </Box>
                </ProductContentContainer>
            </ProductContainer>
        }
        {
            !data &&
            <>
                <Title>404</Title>
                <Description>상품을 불러오지 못했습니다.</Description>
            </>
        }
    </>
}

ProductPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    );
}

export default ProductPage
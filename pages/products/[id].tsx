import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import useSWR from "swr";
import { User } from "../../src/account";
import Layout from "../../src/components/layout";
import { useAccountStore } from "../../src/state/store";
import { Description, Title } from "../../src/styles";
import { axiosFetcher, BACKEND_BASE_URL, formatUrl, safeAlert, sendPostRequest } from "../../src/utils";
import { EditerMarkdown } from "../seller/newproduct";
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
        // ????????? ??????
        if (accountStore.accountType != "user") {
            // ???????????? ?????? ?????????
            safeAlert("?????? ???????????? ?????????????????????.")
            return
        }

        if ((accountStore.account!! as User).point < data!!.price) {
            safeAlert("???????????? ???????????????.")
            return
        }

        const requestInfo: PurchaseRequestInfo = {
            user_id : accountStore.account!!.id,
            product_id : parseInt(productId)
        }

        const response = await sendPostRequest<PurchaseResponse>("/users/purchase", requestInfo)

        if (response) {
            safeAlert("??????????????? ????????? ??????????????????.")
        }
    }

    return <>
        {
            data && 
            <ProductContainer>
                <ProductInfoContainer>
                    <ImageContainer>
                        <ProductImage src={data?.thumbnail_url!!} alt="?????? ??????"></ProductImage>
                    </ImageContainer>
                    <DescriptionContainer>
                        <h1>{data!!.name}</h1>
                        <PriceP>{data!!.price}?????????</PriceP>
                        <Button color="primary" variant="outlined" onClick={buy}>????????????</Button>
                        <DescriptionTextArea disabled value={data!!.description}></DescriptionTextArea>
                    </DescriptionContainer>
                </ProductInfoContainer>
                <ProductContentContainer>
                    <h1>?????? ??????</h1>
                    <Box sx={{border : '2px solid lightgray', minHeight : '500px', borderRadius : '2px'}}>
                        <EditerMarkdown source={data!!.content}></EditerMarkdown>
                    </Box>
                </ProductContentContainer>
            </ProductContainer>
        }
        {
            !data &&
            <>
                <Title>404</Title>
                <Description>????????? ???????????? ???????????????.</Description>
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
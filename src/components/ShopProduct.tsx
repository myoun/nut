import styled from "@emotion/styled";
import Link from "next/link";
import { SellerInfo } from "../../pages/shop";
import { PurchaseHistory } from "../../pages/user/purchase";

interface ShopProductProps {
    id: number;
    name: string;
    price: number;
    seller: SellerInfo;
    thumbnailUrl: string | undefined;
}

const ProductContainer = styled.div`
    height : 400px;
    border-radius : 10px;
    background-color : white;
    /* border : 3px solid black; */
    display : grid;
    grid-template-columns : 1fr;
    grid-template-rows : 5fr 1fr 3fr 1fr;
    row-gap : 5px;
`

const ProductThumbnail = styled.img`
    width : 100%;
    height : 200px;
    border-top-left-radius : 10px;
    border-top-right-radius : 10px;
`

const DescriptionSpan = styled.span`
    font-size : 1.2rem;
    font-weight : 600; 
    text-align : left;
    margin : 0;
    margin-left : 1rem;
`

const ProductDescriptionContainer = styled.div`
    display : flex;
`

const ProductName = styled.h1`
    font-size : 1.5rem;
`

export const ShopProduct = ({id, name, price, seller, thumbnailUrl}: ShopProductProps) => {
    return <ProductContainer className="product">
        <Link href={`/products/${id.toFixed(0)}`}>
          <ProductThumbnail alt="제품 사진" src={thumbnailUrl}></ProductThumbnail>
        </Link>
        <DescriptionSpan>{price.toFixed(0)} 포인트</DescriptionSpan>
        <ProductName>{name}</ProductName>
        <DescriptionSpan>{seller.name}</DescriptionSpan>
    </ProductContainer>
}

export const PurchaseHistoryProduct = ({ history }: { history: PurchaseHistory}) => {
    return <ProductContainer className="product">
        <Link href={`/products/${history.product.id.toFixed(0)}`}>
          <ProductThumbnail alt="제품 사진" src={history.product.thumbnail_url!}></ProductThumbnail>
        </Link>
        <DescriptionSpan>{history.product.price.toFixed(0)} 포인트</DescriptionSpan>
        <ProductName>{history.product.name}</ProductName>
        <DescriptionSpan>{history.purchaseAt} 구매</DescriptionSpan>
        <DescriptionSpan style={{color: history.isDelivered ? "greenyellow" : "tomato"}}>{history.isDelivered ? "배송 완료" : "배송중"} (ID : {history.id})</DescriptionSpan>
    </ProductContainer>
}
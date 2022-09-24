import styled from "@emotion/styled";
import Link from "next/link";

interface ShopProductProps {
    id: number;
    name: string;
    price: number;
    seller: string;
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

const ShopProduct = ({id, name, price, seller, thumbnailUrl}: ShopProductProps) => {
    return <ProductContainer className="product">
        <Link href={`/products/${id.toFixed(0)}`}>
          <ProductThumbnail alt="제품 사진" src={thumbnailUrl}></ProductThumbnail>
        </Link>
        <DescriptionSpan>{price.toFixed(0)} 포인트</DescriptionSpan>
        <ProductName>{name}</ProductName>
        <DescriptionSpan>{seller}</DescriptionSpan>
    </ProductContainer>
}

export default ShopProduct
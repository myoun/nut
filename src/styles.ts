import styled from "@emotion/styled";

export const Title = styled.h1`
    text-align : center;
    font-size : 3rem;
`

export const Description = styled.p`
    text-align : center;
`

export const ProductContainer = styled.div`
    display : grid;
    padding : 50px;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(autofill, minmax(200px, auto));
    column-gap : 25px;
    row-gap : 20px;
    text-align: center;
`
import { ReactElement, useEffect, useState } from "react";
import Layout from "../../src/components/layout";
import { useAccountStore } from "../../src/state/store";
import { NextPageWithLayout } from "../_app";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { Product } from "../shop";

export const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
  );
export const EditerMarkdown = dynamic(
    () =>
        import("@uiw/react-md-editor").then((mod) => {
        return mod.default.Markdown;
        }),
    { ssr: false }
);

interface ProductDto {
    name: string,
    price: number,
    description: string,
    content: string,
    thumbnail_url: string
}

const NewProductPage: NextPageWithLayout = () => {
    const accountStore = useAccountStore()
    const [content, setContent] = useState("# 제품 상세 정보")

    
    useEffect(() => {
        window.onbeforeunload = (event) => {
            return "변경사항이 저장되지 않습니다."
        }
    }, [])

    return (
        <>  
            <style jsx global>{`
                body {
                    background-color : whitesmoke; 
                }
            `}</style>
            <Stack gap={1}>
                <TextField label="제목" variant="outlined" color="info" sx={{backgroundColor : "white"}} fullWidth={true}></TextField>
                <TextField label="설명" variant="outlined" color="info" sx={{backgroundColor : "white"}} fullWidth={true}></TextField>
                <MDEditor height={"80vh"} value={content} onChange={(value) => setContent(value!)}></MDEditor>
                <TextField label="가격" variant="outlined" color="info" sx={{backgroundColor : "white"}} fullWidth={true}></TextField>
                <Button variant="contained" color="success">상품 등록</Button>
            </Stack>
        </>

    )
}

NewProductPage.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout restrictUserAccess={"seller"}>
        {page}
      </Layout>
    );
}

export default NewProductPage

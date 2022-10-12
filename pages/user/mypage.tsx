import { ReactElement } from "react";
import Layout from "../../src/components/layout";
import { NextPageWithLayout } from "../_app";

const MyPage: NextPageWithLayout = () => {
    return (
        <>  
            마이페이지
        </>
    )
}

MyPage.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout restrictUserAccess={"user"}>
        {page}
      </Layout>
    );
  }

export default MyPage
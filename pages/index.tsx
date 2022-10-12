import type { NextPage } from 'next'
import emotionStyled from "@emotion/styled"
import React, { ReactElement, useEffect } from "react"
import NutAppBar from '../src/components/NutAppBar';
import NutLoginModal from '../src/components/modal/NutSignModal';
import { Button } from '@mui/material';
import { useAccountStore, useLoginModal } from '../src/state/store';
import { NextPageWithLayout } from './_app';
import Layout from '../src/components/layout';
import createScrollSnap from 'scroll-snap';

const Big = emotionStyled.p`
  font-size : 6.5rem;
  font-weight : 700;
  font-family : Roboto, "Gothic A1";
  margin-bottom : 0px;
`

const Description = emotionStyled.p`
  font-family : "Gothic A1";
  font-weight : 400;
  font-size : 2.5rem;
  margin-bottom : 1rem;
`

const ElementContainer = emotionStyled.div`
  margin-top : 15%;
  padding-left : 50px;
`

const Home: NextPageWithLayout = () => {
  const accountStore = useAccountStore()
  const loginModal = useLoginModal()
  
  useEffect(() => {
    const __next = document.getElementById("__next") ?? document.createElement('div')

    const { bind, unbind } = createScrollSnap(__next, {
      snapDestinationX: '0%',
      snapDestinationY: '90%',
      timeout: 100,
      duration: 300,
      threshold: 0.2,
      snapStop: false,
    }, () => console.log('element snapped'))
  
    bind()
  }, [])


  const startNow = () => {
    if (accountStore.accountType == "guest") {
      loginModal.open()
    } else {
      // 각자 대시보드로
    }
  }

  return (
    <>
      <ElementContainer>
        <Big>CUT</Big>
        <Description>쓰레기를 돈으로</Description>
        <Button variant='contained'  onClick={startNow} sx={{width : "20rem", height : "3rem", fontSize : "1.2rem", fontFamily : `"Gothic A1", Roboto`}}>지금 시작하기</Button>
      </ElementContainer>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default Home

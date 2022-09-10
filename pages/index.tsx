import type { NextPage } from 'next'
import emotionStyled from "@emotion/styled"
import React from "react"
import NutAppBar from '../src/components/NutAppBar';
import NutLoginModal from '../src/components/NutLogin';
import { Button } from '@mui/material';
import { useAccountStore } from '../src/state/store';

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



const Home: NextPage = () => {
  const accountStore = useAccountStore()

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const startNow = () => {
    if (accountStore.accountType == "guest") {
      handleOpen()
    } else {
      // 각자 대시보드로
    }
  }

  return (
    <>
      <NutAppBar handleOpenLoginModal={handleOpen}></NutAppBar>
      <NutLoginModal open={open} handleClose={handleClose}></NutLoginModal>
      <ElementContainer>
        <Big>CUT</Big>
        <Description>쓰레기를 돈으로</Description>
        <Button variant='contained'  onClick={startNow} sx={{width : "20rem", height : "3rem", fontSize : "1.2rem", fontFamily : `"Gothic A1", Roboto`}}>지금 시작하기</Button>
      </ElementContainer>
    </>
  )
}





export default Home

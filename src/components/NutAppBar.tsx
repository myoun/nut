import { AppBar, IconButton, Menu, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import emotionStyled from "@emotion/styled";
import { Login, AccountCircle } from "@mui/icons-material";
import React from "react";
import { useAccountStore, useLoginModal } from "../state/store";
import NutSignModal from "./modal/NutSignModal";
import UserMenuItem from "./menu/UserMenuItem";
import AdminMenuItem from "./menu/AdminMenuItem";
import SellerMenuItem from "./menu/SellerMenuItem";
import { useRouter } from "next/router";

interface AppBarProps {
    handleModalOpen : () => void
}


export const MenuCenterP = emotionStyled.p`
  text-align : center;
`

export const MenuCenterSpan = emotionStyled.span`
  text-align : center;
  width: 100%;
`

const AppBarTitle = emotionStyled.p`
  font-weight : 1000;
  font-size : 20px;
  flex-grow : 1;
` 

const NutAppBar = () => {
  const loginModal = useLoginModal()
  return <>
    <NutAppBarWithoutModal handleModalOpen={loginModal.open}></NutAppBarWithoutModal>
    <NutSignModal open={loginModal.isOpen} handleClose={loginModal.close}></NutSignModal>
  </>
}

const NutAppBarWithoutModal = (props: AppBarProps) => {
    const accountStore = useAccountStore()
    const router = useRouter();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    let menuItem: JSX.Element

    switch (accountStore.accountType) {
      case "user":
        menuItem = <UserMenuItem closeMenu={handleClose}/>
        break;
      case "seller":
        menuItem = <SellerMenuItem closeMenu={handleClose}/>
        break;
      case "admin":
        menuItem = <AdminMenuItem closeMenu={handleClose}/>
        break;
      default:
        menuItem = <MenuCenterP>오류가 발생했습니다.</MenuCenterP>
        break;
    }

    return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="secondary"> 
        <Toolbar>
          <AppBarTitle onClick={() => router.push("/")} draggable={false}>CUT</AppBarTitle>
          { accountStore.accountType != "guest" ? 
            <div>
              <IconButton color="inherit" onClick={handleMenu}>
                <AccountCircle></AccountCircle>
              </IconButton>
              <Menu
                id="menu-appbar-profile"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Box sx={{padding : "20px"}}>
                  {menuItem}
                </Box>
              </Menu>          
               </div>
          :
              <IconButton color="inherit" onClick={() => {
                  props.handleModalOpen()
                }}>
                  <Login></Login>
              </IconButton>
          }
        </Toolbar>
      </AppBar>
    </Box>
    </>
  }

export default NutAppBar
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import emotionStyled from "@emotion/styled";
import { Login, AccountCircle } from "@mui/icons-material";
import React, { useContext } from "react";
import { useAccountStore } from "../state/store";
import { User } from "../account";

interface AppBarProps {
    handleOpenLoginModal : () => void
}

const MenuCenterP = emotionStyled.p`
  text-align : center;
`

const MenuCenterSpan = emotionStyled.span`
  text-align : center;
  width: 100%;
`

const AppBarTitle = emotionStyled.p`
  font-weight : 1000;
  font-size : 20px;
  flex-grow : 1;
` 

const NutAppBar = (props: AppBarProps) => {
    const accountStore = useAccountStore()
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

    const logout = () => {
      accountStore.logout()
      setAnchorEl(null);
    }
    return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="transparent"> 
        <Toolbar>
          <AppBarTitle>CUT</AppBarTitle>
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
                  <MenuCenterP>{accountStore.account?.id}님</MenuCenterP>
                  {accountStore.accountType == "user" && <MenuCenterP>내 포인트 : {(accountStore.account as User).point}p</MenuCenterP>}
                  <MenuItem onClick={handleClose}><MenuCenterSpan>계정 관리</MenuCenterSpan></MenuItem>
                  {accountStore.accountType == "seller" && <MenuItem onClick={handleClose}>상품 관리</MenuItem>}
                  <MenuItem onClick={logout}><MenuCenterSpan>로그아웃</MenuCenterSpan></MenuItem>
                </Box>
              </Menu>          
               </div>
          :
              <IconButton color="inherit" onClick={() => {
                  props.handleOpenLoginModal()
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
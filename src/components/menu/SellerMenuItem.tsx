import { MenuItem } from "@mui/material"
import { useRouter } from "next/router"
import { useAccountStore } from "../../state/store"
import { MenuCenterP, MenuCenterSpan } from "../NutAppBar"

export default function SellerMenuItem({closeMenu}: {closeMenu: () => void}) {
    const accountStore = useAccountStore()
    const router = useRouter()
    return (
        <>
            <MenuCenterP>{accountStore.account?.id}님</MenuCenterP>
            <MenuItem onClick={() => {router.push("/mypage", undefined, { shallow : true }); closeMenu()}}>마이페이지</MenuItem>
            <MenuItem onClick={accountStore.logout}><MenuCenterSpan>로그아웃</MenuCenterSpan></MenuItem>
        </>
    )
}
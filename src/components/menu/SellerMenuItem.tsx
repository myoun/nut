import { MenuItem } from "@mui/material"
import { useRouter } from "next/router"
import { useAccountStore } from "../../state/store"
import { MenuCenterP, MenuCenterSpan, MenuLinkItem } from "../NutAppBar"

export default function SellerMenuItem({closeMenu}: {closeMenu: () => void}) {
    const accountStore = useAccountStore()
    const router = useRouter()
    return (
        <>
            <MenuCenterP>{accountStore.account?.id}님</MenuCenterP>
            <MenuLinkItem closeMenu={closeMenu} href="/seller/products">제품 관리</MenuLinkItem>
            <MenuItem onClick={accountStore.logout}><MenuCenterSpan>로그아웃</MenuCenterSpan></MenuItem>
        </>
    )
}
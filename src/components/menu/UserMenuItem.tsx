import { MenuItem } from "@mui/material"
import { useRouter } from "next/router"
import { User } from "../../account"
import { useAccountStore } from "../../state/store"
import { MenuCenterP, MenuCenterSpan } from "../NutAppBar"

export default function UserMenuItem({closeMenu}: {closeMenu: () => void}) {
    const accountStore = useAccountStore()
    const router = useRouter()
    return (
        <>
            <MenuCenterP>{accountStore.account?.id}님</MenuCenterP>
            <MenuCenterP>내 포인트 : {(accountStore.account as User).point}p</MenuCenterP>
            <MenuItem onClick={() => {router.push("/mypage", undefined, { shallow : true }); closeMenu()}}><MenuCenterSpan>마이페이지</MenuCenterSpan></MenuItem>
            <MenuItem onClick={accountStore.logout}><MenuCenterSpan>로그아웃</MenuCenterSpan></MenuItem>
        </>
    )
}
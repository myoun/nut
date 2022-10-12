import { MenuItem } from "@mui/material"
import { useRouter } from "next/router"
import useSWR from "swr"
import { getAccountInfo, User } from "../../account"
import { useAccountStore } from "../../state/store"
import { axiosFetcher, BACKEND_BASE_URL, formatUrl } from "../../utils"
import { MenuCenterP, MenuCenterSpan, MenuLinkItem } from "../NutAppBar"

function UserMenuItem({closeMenu}: {closeMenu: () => void}) {
    const accountStore = useAccountStore()
    const router = useRouter()

    const { data } = useSWR<User>(formatUrl(BACKEND_BASE_URL!!, `/users/${accountStore.account!!.id}`), axiosFetcher, {
        refreshInterval : 1000,
        onSuccess : (data) => {
            if (data.point != (accountStore.account as User).point) {
                accountStore.modifyPoint(data.point)
            }
        }
    });

    return (
        <>
            <MenuCenterP>{accountStore.account?.id}님</MenuCenterP>
            <MenuCenterP>내 포인트 : {data?.point}p</MenuCenterP>
            <MenuLinkItem closeMenu={closeMenu} href="/shop"><MenuCenterSpan>상점</MenuCenterSpan></MenuLinkItem>
            <MenuLinkItem closeMenu={closeMenu} href="/user/mypage"><MenuCenterSpan>마이페이지</MenuCenterSpan></MenuLinkItem>
            <MenuLinkItem closeMenu={closeMenu} href="/user/purchase"><MenuCenterSpan>주문 내역</MenuCenterSpan></MenuLinkItem>
            <MenuItem onClick={accountStore.logout}><MenuCenterSpan>로그아웃</MenuCenterSpan></MenuItem>
        </>
    )
}

export default UserMenuItem
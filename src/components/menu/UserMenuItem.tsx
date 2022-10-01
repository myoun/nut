import { MenuItem } from "@mui/material"
import { useRouter } from "next/router"
import useSWR from "swr"
import { getAccountInfo, User } from "../../account"
import { useAccountStore } from "../../state/store"
import { axiosFetcher, BACKEND_BASE_URL, formatUrl } from "../../utils"
import { MenuCenterP, MenuCenterSpan } from "../NutAppBar"

function UserMenuItem({closeMenu}: {closeMenu: () => void}) {
    const accountStore = useAccountStore()
    const router = useRouter()

    const { data } = useSWR<User>(formatUrl(BACKEND_BASE_URL!!, `/users/${accountStore.account!!.id}`), axiosFetcher, {
        refreshInterval : 1000
    });

    return (
        <>
            <MenuCenterP>{accountStore.account?.id}님</MenuCenterP>
            <MenuCenterP>내 포인트 : {data?.point}p</MenuCenterP>
            <MenuItem onClick={() => {router.push("/shop", undefined, { shallow : true })}}><MenuCenterSpan>상점</MenuCenterSpan></MenuItem>
            <MenuItem onClick={() => {router.push("/mypage", undefined, { shallow : true }); closeMenu()}}><MenuCenterSpan>마이페이지</MenuCenterSpan></MenuItem>
            <MenuItem onClick={accountStore.logout}><MenuCenterSpan>로그아웃</MenuCenterSpan></MenuItem>
        </>
    )
}

export default UserMenuItem
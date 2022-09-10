import create from 'zustand'
import { Account, AccountToAccountType, AccountType, AccountTypeGuard } from '../account'

interface AccountStore {
    accountType: AccountType
    account: Account | null,

    /**
     * Logout!
     * accountType to "guest" and account to null
     */
    logout: () => void,
    login(account: Account) : void
}

export const useAccountStore = create<AccountStore>((set) => ({
    accountType : "guest",
    account : null,

    logout() {
        set((state) => ({accountType : "guest", account : null}))
    },

    login(account) {
        let type: AccountType
        if (AccountTypeGuard.isUser(account)) {
            type = "user"
        } else if (AccountTypeGuard.isSeller(account)) {
            type = "seller"
        } else if (AccountTypeGuard.isAdmin(account)) {
            type = "admin"
        } else {
            throw Error("Invalid Account")
        }
         set((state) => ({accountType: type, account: account}))
    },
}))

export interface UserAccount { id: string, name: string, point: number, createAt: string }
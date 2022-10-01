import useSwr from "swr";
import CONSTANT from "./constant";
import { AccountDto, ValidateDto } from "./dto/dtos";
import { axiosFetcher, BACKEND_BASE_URL, formatUrl, sendGetRequest, sendPostRequest } from "./utils";

export type AccountType = "user" | "seller" | "admin" | "guest"

export type Account = {
    id : string,
    name : string,
    // password is private info
    createAt: string
}

export type User = Account & {
    point: number
}

export type Seller = Account & {
    products: Product[]
}

export type Admin = Account & {
    machines: Machine[]
}

export type Guest = null

type Product = {
    // TODO: Not Yet Implemented
}

type Machine = {
    // TODO: Not Yet Implemented
}

export type AccountToAccountType<AC extends Account | null> = AC extends null ? "guest" : (AC extends User ? "user" : (AC extends Seller ? "seller" : (AC extends Admin ? "admin" : never)))
export type AccountTypeToAccount<Type extends AccountType> = Type extends "user" ? User : (Type extends "seller" ? Seller : (Type extends "admin" ? Admin : Guest))

export async function signUpAs(mode: AccountType, account: AccountDto) {
    const endpoint = `/${mode}s/${mode}`
    await sendPostRequest(endpoint, account)
}

export async function validateAs(mode: AccountType, data: ValidateDto): Promise<boolean> {
    const endpoint = `/${mode}s/validate`
    const validateResponse = await sendPostRequest<{isValid : boolean}>(endpoint, data)
    const isValid = validateResponse.isValid
    
    return isValid
}

export async function getAccountInfo<AC extends AccountType>(id: string, mode: AC): Promise<AccountTypeToAccount<AC>> {
    const endpoint = `/${mode}s/${id}`
    const accountResponse = await sendGetRequest<AccountTypeToAccount<AC>>(endpoint)
    return accountResponse
}
export class AccountTypeGuard {

    private constructor() {}

    static isUser(a: Account): a is User {
        if ((a as User).point) {
            return true
        } return false
    }

    static isSeller(a: Account): a is Seller {
        if ((a as Seller).products != undefined) {
            return true
        } else return false
    }

    static isAdmin(a: Account): a is Admin {
        if ((a as Admin).machines != undefined) {
            return true
        } else return false
    }
}
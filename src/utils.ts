import axios from "axios"

export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function sendGetRequest<T>(endpoint: string, params?: Map<string, any> | undefined): Promise<T> {
    const res = await axios.get<T>(formatUrl(BACKEND_BASE_URL!!, endpoint, params))
    return res.data
}

export async function sendPostRequest<T>(endpoint: string, body: any): Promise<T> {
    const res = await axios.post<T>(BACKEND_BASE_URL+endpoint, body)
    return res.data

}

export function formatUrl(baseUrl: string, endpoint: string, params?: Map<string, any> | undefined): string {
    const sp = new URLSearchParams()
    if (params) {
        params.forEach((value, key) => sp.append(key, value))
    }
    return baseUrl+endpoint+"?"+sp.toString()
}

export function mapOf<V>(obj: { [key : string] : V }): Map<string, V> {
    const map = new Map<string,V>()
    Object.entries(obj).forEach((entries) => map.set(entries[0], entries[1])) 
    return map
}

export const axiosFetcher = (url: string) => axios.get(url).then(res => res.data)
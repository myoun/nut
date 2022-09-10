import axios from "axios"

const BACKEND_BASE_URL = "http://localhost:8080"

export async function sendGetRequest<T>(endpoint: string): Promise<T> {
    const res = await axios.get<T>(BACKEND_BASE_URL+endpoint)
    return res.data
}

export async function sendPostRequest<T>(endpoint: string, body: any): Promise<T> {
    const res = await axios.post<T>(BACKEND_BASE_URL+endpoint, body)
    return res.data
}
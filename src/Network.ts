import axios from "axios";
import { requestResponse } from "./Interfaces";

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

export async function get<T>(path: string, params: Record<string, unknown>): Promise<requestResponse<T>> {
    try {
        const response = await apiClient.get(path, { params })
        if (response.status !== 200 && response.status !== 201) {
            return {
                success: false,
                data: response.data
            }
        }
        return {
            success: true,
            data: response.data
        }
    } catch (err: unknown) {
        if (err && typeof err === 'object' && 'response' in err) {
            const errorResponse = (err as { response: { data: { detail: string } } }).response;
            return {
                success: false,
                data: errorResponse.data.detail || "An unknown error occurred."
            };
        }
        return {
          success: false,
          data: "An unknown error occurred because both try and catch didn't run."
        };
    }
}

export async function post<T>(path: string, params?: Record<string, unknown>, body?: Record<string, unknown>): Promise<requestResponse<T>> {
    try {
        const response = await apiClient.post(path, body, { params: params })
        if (response.status !== 200 && response.status !== 201) {
            return {
                success: false,
                data: response.data
            }
        }
        return {
            success: true,
            data: response.data
        }
    } catch (err: unknown) {
        if (err && typeof err === 'object' && 'response' in err) {
            const errorResponse = (err as { response: { data: { detail: string } } }).response;
            return {
                success: false,
                data: errorResponse.data.detail || "An unknown error occurred."
            };
        }
        return {
            success: false,
            data: "An unknown error occurred because both try and catch didn't run."
        };
    }
}
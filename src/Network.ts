import axios from "axios";
import { useContext } from "react";
import { ApiUrlContext } from "./Context";

const apiUrl = 'http://localhost:3001/';

export async function request() {
    try {
        const response = await axios.get(apiUrl + "auth/get-updates", {
            params: {
                token: tempUser?.token
            }
        })
        if (response.status !== 200) {
            return {
                success: false,
                message: response.data
            }
        }
        console.log(response.data.projects)
        setUser({
            ...tempUser,
            projects: response.data.projects,
            logs: response.data.logs
        });
        return {
            success: true,
            message: ""
        }
    } catch (err: unknown) {
        if (err && typeof err === 'object' && 'response' in err) {
            const errorResponse = (err as { response: { data: { detail: string } } }).response;
            return {
                success: false,
                message: errorResponse.data.detail || "An unknown error occurred."
            };
        }
        // return {
        //   success: false,
        //   message: "An unknown error occurred."
        // };
    }
}
import { Dispatch, SetStateAction } from "react";

export interface Log {
    _id: string,
    project: string
    date: Date;
    goal: string;
    notes: string;
}

export interface Project {
    _id: string;
    coverUrl: string;
    name: string;
    goal: string;
    dateStarted: Date;
    duration: number;
    logs: Log[];
}

export type UserData = {
    username: string;
    email: string;
    date_joined: Date;
    token: string;
    projects: Project[];
    logs: Log[];
} | null | undefined;



export type User = [UserData, Dispatch<SetStateAction<UserData>>]

export interface requestResponse {
    success: boolean;
    message: string;
}
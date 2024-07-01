import React, { useContext, useState } from "react";
import { UserContext } from "../Context";
import { get } from "../Network";

import { User, UserData, requestResponse } from "../Interfaces";
import { Link, useNavigate } from "react-router-dom";

function inputArea(label: string, img: string, placeholder: string, password: boolean=false, value: string, updateValue: React.Dispatch<React.SetStateAction<string>>): React.ReactElement {
    return <>
        <p className="text-gray-600 text-sm self-start pt-5">{label}</p>
        <div className="group w-full relative flex flex-row gap-2 items-center justify-center px-1 py-2">
            <div className="flex flex-row gap-2 items-center w-full">
                <img className={`w-5 h-5 opacity-35 ${password && "-rotate-45"}`} src={img} />
                <input className="outline-none w-full" value={value} onChange={e => updateValue(e.target.value)} type={password ? "password" : ""} placeholder={placeholder} />
            </div>
            <div className="h-[2px] w-full bg-gray-200 absolute bottom-0"></div>
            <div className="transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[2px] w-0 group-focus-within:w-full absolute bottom-0"></div>
        </div>
    </>
}


export default function Login(): React.ReactElement {
    const [user, setUser] = useContext<User>(UserContext)

    const navigate = useNavigate()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    return <div
        className="w-full h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="bg-white w-96 h-[60%] rounded-lg shadow-lg flex flex-col px-12">
            <h1 className="text-3xl font-bold mt-10 self-center">Log in</h1>

            { inputArea("Username", "./media/user.png", "Type your username", false, username, setUsername)}
            { inputArea("Password", "./media/key.svg", "•••••••••", true, password, setPassword)}

            <p className="text-gray-500 text-sm text-right mb-5 mt-1 hover:cursor-pointer">Forgot password?</p>

            <button className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full w-full self-center text-2xl text-white flex justify-center items-center p-1 mt-10" onClick={async () => (await requestLogin())}>Log in</button>

            <Link to="/sign-up" className="self-center mt-6"><p className="text-blue-950">Sign up</p></Link>

        </div>

    </div>




    async function requestLogin(): Promise<requestResponse> {
        // encrypt the password before sending it
        // from https://stackoverflow.com/questions/18338890
        async function saltify(data: string): Promise<string> {
            // encode as UTF-8
            const msgBuffer = new TextEncoder().encode(data);

            // hash the data
            const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

            // convert ArrayBuffer to Array
            const hashArray = Array.from(new Uint8Array(hashBuffer));

            // convert bytes to hex string
            const hashHex = hashArray
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("");
            return hashHex;
        }

        if (username === "" || password === "") {
            return {
                success: false,
                data: "Please fill in the username and password."
            }
        }
        if (username.includes("@")) {
            return {
                success: false,
                data: "username is invalid."
            }
        }

        const salt = await saltify(username + password)
        const response = await get<UserData>("auth/sign-in", {
                username: username,
                hash: salt
        })
        if (response.success) {
            console.log(response)
            setUser({
                username: response.data.user.username,
                email: response.data.user.email,
                date_joined: new Date(response.data.user.date_joined),
                token: response.data.token.value,
                projects: response.data.projects,
                logs: response.data.logs
            });
            navigate('/');
        }
        console.log(response)
    }
}

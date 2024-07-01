import React, { useContext } from "react";
import { UserContext } from "../Context";
import { useNavigate } from "react-router-dom";
import Input from "./Input";


export default function Profile(): React.ReactElement {
    const [user, setUser] = useContext(UserContext)

    const navigate = useNavigate()

    return <div className="max-w-screen-lg mx-auto pt-40 flex flex-col items-start gap-5">
        <h1 className="text-4xl mb-10">Profile</h1>
        <div className="flex flex-row gap-5">
            <img className="w-40 h-40" src="./media/japanese.png" alt="japanese" />
            <div className="relative">
                <p className="text-2xl">{user?.username}</p>
                <p className="text-xl">Streak: <span className="animate-colour font-bold">4</span></p>
                <p className="text-lg text-gray-700">{user?.projects.length} projects</p>
            </div>
        </div>

        <h3 className="text-3xl mt-16">Personal information</h3>
        <div className="w-full border-[1px] border-gray-300"></div>
        <h5>Username: {user?.username}</h5>
        <h5>Email: {user?.email}</h5>
        {/* <h5>Profile photo</h5> */}

        <h3 className="text-3xl mt-16">Security</h3>
        <div className="w-full border-[1px] border-gray-300"></div>
        <div className="flex flex-row gap-2">
            <h5>Current password</h5>
            <input className="border-2 border-gray-500 rounded-md" />
        </div>
        <div className="flex flex-row gap-2">
            <h5>New password</h5>
            <Input placeholder="••••••••••" />
        </div>
        <div className="flex flex-row gap-2">
            <h5>Confirm new password</h5>
            <Input placeholder="••••••••••" />
        </div>
        <button>Change password</button>
        <button className="rounded-md border-2 border-black px-3 py-1 hover:cursor-pointer" onClick={() => {
            setUser(null)
            navigate("/")
        }}>Sign out</button>



        <h3 className="text-3xl mt-16">Danger</h3>
        <div className="w-full border-[1px] border-gray-300"></div>
        <button className="rounded-md border-2 border-red-500 p-3 text-red-500 hover:cursor-pointer">Delete account</button>
    </div>
}
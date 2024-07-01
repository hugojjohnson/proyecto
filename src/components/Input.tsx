import { useState } from "react"


export default function Input({ placeholder="", password=false }) {
    const [value, setValue] = useState("")
    return <>
        <div className="group relative flex flex-row gap-2 items-center justify-center">
            <div className="flex flex-row gap-2 items-center w-full">
                <input className="outline-none w-full" type={password ? "password" : ""} placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} />
            </div>
            <div className="h-[2px] w-full bg-gray-200 absolute bottom-0"></div>
            <div className="transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[2px] w-0 group-focus-within:w-full absolute bottom-0"></div>
        </div>
        </>
}
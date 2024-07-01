import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context";
import { Project } from "../Interfaces";
import { get } from "../Network";


function projectCard(proj: Project): React.ReactElement {
    return <Link to={"/project/" + proj["_id"]} key={proj._id}><div className="w-48 h-48 relative group flex flex-col items-center text-center justify-end">
                <img className="w-32 h-32 absolute group-hover:translate-x-28 group-hover:-translate-y-36 transition-all translate-x-10 translate-y-20 duration-500 opacity-0 group-hover:opacity-100" src={proj.coverUrl} alt={proj.name} />
                <img className="w-40 h-40 absolute group-hover:translate-x-14 group-hover:-translate-y-20 transition-all duration-500 opacity-0 group-hover:opacity-100" src={proj.coverUrl} alt={proj.name} />
                <img className="absolute" src={proj.coverUrl} alt={proj.name} />
                <p className="absolute bottom-0 group-hover:translate-y-10 text-center transition-all duration-200 opacity-0 group-hover:opacity-100">{proj.name}</p>
            </div></Link>
}

export default function Dashboard(): React.ReactElement {
    const [user] = useContext(UserContext)
    // const [quote, setQuote] = useState("")

    useEffect(() => {
        const response = get("main/get-quote", { token: user?.token})
        console.log("response")
        console.log(response)
    }, [user?.token])

    return <div className="max-w-screen-lg mx-auto pt-40 flex flex-col">
        <h1 className="text-4xl mb-40">Projects</h1>
        <div className="flex flex-row justify-center items-center gap-10">
            {
                user?.projects.map(idk => {
                    return projectCard(idk)
                })
            }

        </div>

        <Link to="/add-project" className="self-center"><button className="p-2 border-2 border-black rounded-md mt-20 hover:animate-wiggle">Add project</button></Link>
    </div>
}
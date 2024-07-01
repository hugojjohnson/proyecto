import React, { MouseEvent, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Context";
import { Log, Project, User, requestResponse } from "../Interfaces";
import { get, post } from "../Network";


export default function ProjectPage(): React.ReactElement {
    const [activeLog, setActiveLog] = useState(5)
    const [goal, setGoal] = useState("")
    const [note, setNote] = useState("")

    const [user, setUser] = useContext<User>(UserContext)

    const location = useLocation()
    const navigate = useNavigate()

    const project: Project | undefined = user?.projects.filter(idk => idk["_id"] == location.pathname.substring(9))[0]

    if (project === undefined) {
        return <p className="pt-40">Project not found.</p>
    }

    const logs: Log[] = user?.logs.filter(idk => idk.project === project["_id"]).sort((a, b) => a.date > b.date ? 1 : -1) || []

    const handleClickLog = (event: MouseEvent, index: number) => {
        event.stopPropagation()
        setActiveLog(index)
        setGoal(logs[index].goal)
        setNote(logs[index].notes)
    }

    function isSameDate(date: Date) {
        const today = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000)
        console.log("=")
        console.log(date.getFullYear())
        console.log(date.getMonth())
        console.log(date.getDate())
        console.log("-")
        console.log(today.getFullYear())
        console.log(today.getMonth())
        console.log(today.getDate())
        console.log("-")
        console.log(date)
        console.log(today)
        console.log("=")


        return date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();
    }

    return <div className="max-w-screen-lg mx-auto pt-40" onClick={() => setActiveLog(-1)}>
        <h1 className="text-4xl mb-10">{project?.name || "undefined"}</h1>
        <div className="flex flex-row gap-5">
            <img className="w-40 h-40" src={project.coverUrl} alt={project.name} />
            <div className="relative">
                <p className="text-xl">Goal: {project.goal}</p>

                
                <div className="w-[350px] h-6 my-3 rounded-full border-2 border-gray-700">
                    <div className={`relative overflow-hidden  rounded-full`} style={{"width": ((Math.min((logs?.length || 0), project.duration)) / project.duration * 100) + "%"}}>
                        <p className="h-[20px] w-full flex flex-row items-center justify-center absolute z-10 text-white">{Math.floor(Math.min((logs.length || 0), project.duration)/project.duration * 100)}%</p>
                        <div className="w-[12730000px] h-[20px] object-contain animate-slide" style={{"background": "url('/media/gradient.jpg')"}}></div>
                    </div>
                </div>
                <p className="text-lg text-gray-700">30 mins/day</p>
                <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta expedita, debitis officia eaque blanditiis optio aliquid tenetur quidem id ad.</p>
                {
                    logs.length > 0 && isSameDate(new Date(logs[0].date)) ? <button className="absolute top-0 right-0 rounded-md p-[6px] px-[10px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white w-28">Completed</button>
                        : <button className="absolute top-0 right-0 border-2 border-black rounded-md p-1 px-2 w-28" onClick={requestAddLog}>Complete</button>
                }
            </div>
        </div>

        <p>{activeLog}</p>

        <h3 className="text-3xl mt-32">Log</h3>
        <div className="w-full border-[1px] border-gray-300 my-3"></div>

        <div className="flex flex-col-reverse gap-5 mb-20 order-2">
        {
            (logs !== undefined) && logs.map((log, index) => logCard(log, index))
        }
        </div>
        <button className="rounded-md border-2 border-red-500 p-3 text-red-500 hover:cursor-pointer mb-48" onClick={() => deleteProject(project._id)}>Delete project</button>
    </div>
    
    async function deleteProject(id:string) {
        const response = await get("main/delete-project", { token: user?.token, id: id })
        if (response.success) {
            navigate("/")
            window.location.reload()
        }
        console.log(response)
        return response
    }

    function logCard(log: Log, index: number): React.ReactElement {
        log.date = new Date(log.date)
        return <div className="border-[2px] border-gray-300 rounded-md flex flex-col justify-between w-[60%] relative p-3" key={index} onClick={(event) => handleClickLog(event, index)}>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-5 mb-2">
                    <h4 className="text-xl underline">{log.date.toLocaleDateString()}</h4>
                    <p className="text-gray-700 text-lg no-underline"> | {log.date.getHours()%12 + ":" + log.date.getMinutes() + " " + (log.date.getHours() > 12 ? "PM" : "AM")}</p>
                </div>
            </div>
            {
                index !== activeLog ? <><p className="text-lg border-2 border-transparent">Log: {logs[index].goal || "undefined"}</p><p className="text-gray-700 border-2 border-transparent">Notes: {logs[index].notes || "undefined"}</p></>
                : <>
                        <div className="flex flex-row items-start"><p className="text-lg">Log: </p><input className="text-lg text-gray-500 border-blue-100 border-2 ml-1" value={goal} onChange={(e) => setGoal(e.target.value)} onBlur={() => changeLog(log["_id"])} /></div>
                        <div className="flex flex-row"><p className="text-gray-700">Notes: </p><input className="text-gray-500 border-blue-100 border-2 ml-2" value={note} onChange={(e) => setNote(e.target.value)} onBlur={() => changeLog(log["_id"])} /></div>
                        <img src="/media/trash.png" alt="trash" className="absolute bottom-4 right-5 w-6 h-6 hover:cursor-pointer" onClick={() => deleteLog(log["_id"])} />
                </>
            }
            <div className="h-10 w-10 rounded-full font-extrabold text-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center absolute top-3 right-3">{index + 1}</div>
            <div className="bg-white/25 w-10 h-10 absolute top-3 right-3"></div>
        </div>
    }

    async function deleteLog(id: string) {
        const response = await get("main/delete-log", { token: user?.token, id: id })
        if (response.success && user) {
            setUser({ ...user, logs: user?.logs.filter(idk => idk._id !== id) })
        }
        console.log(response)
    }

    async function changeLog(id: string) {
        const logs_copy = user?.logs || []
        const j = logs_copy?.filter(idk => idk["_id"] === id)[0]
        const i = logs_copy?.indexOf(j)
        logs_copy[i].goal = goal
        logs_copy[i].notes = note
        if (user !== null && user !== undefined) {
            setUser({
                ...user,
                logs: logs_copy
            })
        }

        const response = await get("main/edit-log", { token: user?.token, id: id, goal: goal, notes: note })
        console.log(response)
    }

    interface responseType {
        _id: string
    }
    async function requestAddLog(): Promise<requestResponse<responseType>> {
        const response = await post<responseType>("main/create-log", { token: user?.token }, {
            user: "hi",
            project: location.pathname.substring(9),
            date: new Date(),
            goal: "",
            notes: ""
        })
        if (response.success) {
            if (user && typeof response.data !== "string") {
                // eslint-disable-next-line prefer-const
                let newLogs = user.logs
                newLogs.push({
                    /* tslint:disable-next-line */
                    _id: response.data["_id"],
                    project: location.pathname.substring(9),
                    date: new Date(),
                    goal: "idk",
                    notes: "str"
                })
                setUser({
                    ...user,
                    logs: newLogs
                })
            }
        }
        console.log(response)
        return response
    }
}
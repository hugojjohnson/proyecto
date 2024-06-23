import React, { useContext, useState } from "react";
import { requestResponse } from "../Interfaces";
import axios from "axios";
import { ApiUrlContext, UserContext } from "../Context";
import { useNavigate } from "react-router-dom";


export default function AddProject(): React.ReactElement {
    const [name, setName] = useState<string>("")
    const [goal, setGoal] = useState<string>("")
    const [duration, setDuration] = useState<string>("")
    const [cover, setCover] = useState<File>()

    const apiUrl = useContext(ApiUrlContext)
    const [user, setUser] = useContext(UserContext)
    
    const navigate = useNavigate()

    const [step, setStep] = useState<number>(0)

    const questions: { title: string, description: string, value: string, setValue: React.Dispatch<React.SetStateAction<string>>, number_input?: boolean }[] = [
        {
            title: "Name",
            description: "A good project needs a name.",
            value: name,
            setValue: setName
        }, {
            title: "Goal",
            description: "Pick a goal for your project.",
            value: goal,
            setValue: setGoal
        }, {
            title: "Duration",
            description: "Pick a duration (in days) for your project.",
            value: duration,
            setValue: setDuration,
            number_input: true
        }
    ]

    return <div className="max-w-screen-lg mx-auto pt-40">
        <h1 className="text-4xl mb-10">Add project</h1>
        <div className="max-w-screen-lg flex flex-col gap-5 items-center justify-center">
            { cover !== undefined && (
                <div>
                    {/* Display the selected image */}
                    <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(cover)}
                    />
                    <br /> <br />
                    {/* Button to remove the selected image */}
                    <button onClick={() => setCover(undefined)}>Remove</button>
                </div>
            )}

            {
                step == questions.length ? <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        if (event.target.files) {
                            setCover(event.target.files[0])
                        }
                    }}
                />
                    : <>
                        <h3 className="text-4xl">{questions[step].title}</h3>
                        <p>{questions[step].description}</p>
                        <div className="group w-full flex flex-col items-center relative">
                            <input className="w-[60%] outline-none text-center" type={questions[step].number_input ? "number" : "text"} placeholder={`Enter a ${questions[step].title.toLowerCase()}`} value={questions[step].value} onChange={e => questions[step].setValue(e.target.value)} />
                            <div className="h-[2px] w-[60%] bg-gray-300 absolute bottom-0"></div>
                            <div className="transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[2px] w-0 group-focus-within:w-[60%] absolute bottom-0"></div>
                        </div>
                    </>
            }

            <div className="w-[60%] flex flex-row justify-end gap-5 mt-20">
                {
                    step > 0 ? <div className="hover:cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-[2px] flex items-center justify-center" onClick={() => setStep(step - 1)}>
                        <img className="h-[44px] w-[44px] my-auto rounded-full bg-white scale-x-[-1]" src="./media/arrow-r-rainbow.png" alt="back" />
                    </div>
                        : <img className="hover:cursor-pointer scale-x-[-1] w-12 h-12 border-2 border-black rounded-full" src="./media/arrow-r.png" alt="next" />
                }

                {
                    step == questions.length ? 
                        cover !== undefined ? <div className="hover:cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-[2px] flex items-center justify-center" onClick={async () => await requestAddProject()}>
                                <div className="bg-white rounded-full flex items-center justify-center text-center">
                                <p className="hover:cursor-pointer w-[44px] h-[44px] rounded-full flex items-center justify-center text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">✓</p>
                                </div>
                            </div>
                : <p className="hover:cursor-pointer w-12 h-12 border-2 border-black rounded-full flex items-center justify-center text-3xl">✓</p>
                    : (questions[step].value !== "") ? <div className="hover:cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-[2px]" onClick={() => setStep(step + 1)}><img className="h-[44px] w-[44px] rounded-full bg-white" src="./media/arrow-r-rainbow.png" alt="next" /></div>
                        : <img className="hover:cursor-pointer w-12 h-12 border-2 border-black rounded-full" src="./media/arrow-r.png" alt="next" />
                }
            </div>
        </div>
    </div>

    function getBase64 (file: File | undefined): Promise<string> {
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (file !== undefined) {
            reader.readAsDataURL(file)
        } else {
            reject
        }
        reader.onload = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result);
            } else {
                reject(new Error("File reading failed."))
            }
        }
        reader.onerror = reject;
    })}

    async function requestAddProject(): Promise<requestResponse> {
        const base64Img: string = await getBase64(cover)
        try {
            const response = await axios.post(apiUrl + "main/create-project", {
                user: "hi",
                coverUrl: base64Img,
                name: name,
                goal: goal,
                dateStarted: new Date().toISOString(),
                duration: parseInt(duration)
            }, {
                params: {
                    token: user?.token
                }
            })
            if (response.status !== 201) {
                return {
                    success: false,
                    message: response.data
                }
            }
            if (user) {
                // eslint-disable-next-line prefer-const
                let newProjects = user.projects
                newProjects.push({
                    _id: response.data["_id"],
                    coverUrl: base64Img,
                    name: name,
                    goal: goal,
                    dateStarted: new Date(),
                    duration: parseInt(duration),
                    logs: []
                })
                setUser({
                    ...user,
                    projects: newProjects
                })
            }
            navigate('/');
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
            return {
                success: false,
                message: "An unknown error occurred."
            };
        }
    }
}
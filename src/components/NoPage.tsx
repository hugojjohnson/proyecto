import React, { useContext } from "react";
import { UserContext } from "../Context";
import { useNavigate } from "react-router-dom";

export function NoPage(): React.ReactElement {
    const [user] = useContext(UserContext)
    const navigate = useNavigate()

    if (user === null) {
        navigate("/")
    }
    return <p>404 Not found.</p>
}
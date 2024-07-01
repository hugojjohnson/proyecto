import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./Context";
import { get } from "./Network";

// Components
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Signup from "./components/Signup";
import Login from "./components/Login";

// Interfaces
import { UserData, requestResponse } from "./Interfaces";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import AddProject from "./components/AddProject";
import { NoPage } from "./components/NoPage";
import Project from "./components/ProjectPage";

function App(): React.ReactElement {
  // Context
  const [user, setUser] = useState<UserData>(undefined);

  useEffect(() => {
    const tempUser = JSON.parse(localStorage.getItem("proyectoUser") || "{}")
    console.log(tempUser)
    if (!tempUser.token) {
      setUser(null)
      return
    }

    setUser(tempUser)
    updateUser(tempUser)

    // Update user
    async function updateUser(tempUser: UserData): Promise<void> {
      const response: requestResponse<unknown> = await get("auth/get-updates", { token: tempUser?.token })
      setUser({
        ...tempUser,
        logs: response.data.logs,
        projects: response.data.projects
      })
      // console.log(response)
    }
  }, [])

  useEffect(() => {
    if (user === undefined) {
      return
    }
    if (user?.token) {
      localStorage.setItem("proyectoUser", JSON.stringify(user))
      console.log("User changed.")
    } else {
      localStorage.removeItem("proyectoUser")
      console.log("Signed out.")
    }
  }, [user])


  // Component
  if (user == null) {
    return (
      <UserContext.Provider value={[user, setUser]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Welcome />} />
              <Route path="sign-up" element={<Signup />} />
              <Route path="log-in" element={<Login />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    )

  }
  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-project" element={<AddProject />} />
            <Route path="project/:project" element={<Project />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
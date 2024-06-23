import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext, ApiUrlContext } from "./Context";

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
import axios from "axios";

function App(): React.ReactElement {
  // Context
  const [user, setUser] = useState<UserData>(null);

  useEffect(() => {

  }, [])

  useEffect(() => {
    const tempUser = JSON.parse(localStorage.getItem("proyectoUser") || "{}")
    if (!tempUser.token) {
      return
    }

    setUser(tempUser)
    console.log("hi")
    if (user === undefined) {
      updateUser(tempUser)
      .then(res => console.log(res))
    }

    // Update user
    async function updateUser(tempUser: UserData): Promise<requestResponse> {

    }
  }, [user?.token])

  useEffect(() => {
    if (user) {
      localStorage.setItem("proyectoUser", JSON.stringify(user))
    }
    console.log("User changed.")
  }, [user])


  // Component
  if (user == null) {
    return (
      <UserContext.Provider value={[user, setUser]}>
        <ApiUrlContext.Provider value={apiUrl}>
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
        </ApiUrlContext.Provider>
      </UserContext.Provider>
    )

  }
  return (
    <UserContext.Provider value={[user, setUser]}>
      <ApiUrlContext.Provider value={apiUrl}>
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
      </ApiUrlContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
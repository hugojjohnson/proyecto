import React, { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { UserContext } from "../Context";

// TODO: Make the logo white for sign up and log in pages.

export default function Header(): React.ReactElement {
    const location = useLocation()
    const [user] = useContext(UserContext)
    
    return <>
    <div className="flex flex-row justify-between items-center w-full h-20 px-5 absolute">
        <div className="w-12 h-12 opacity-0"></div>
        {
                user === null && (location.pathname === "/login" || location.pathname === "/sign-up") ? <Link to="/"><p className="p-2 font-extrabold text-2xl text-white hover:cursor-pointer" style={{ "fontFamily": "'Playwrite PL'" }}>Proyecto</p></Link>
                    : <Link to="/dashboard"><p className="p-2 font-extrabold text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text hover:cursor-pointer" style={{ "fontFamily": "'Playwrite PL'" }}>Proyecto</p></Link>
        }
        {
                user !== null ? <Link to="/profile"><img className="w-12 h-12 rounded-full" src="./media/profile.png" alt="profile" /></Link>
            : (location.pathname === "/") ? <Link to="/log-in"><p className="text-white text-xl mr-20 p-2 border-2 border-white rounded-md">Sign in</p></Link>
            : <div className="w-12 h-12 opacity-0"></div>
        }
    </div>


    {/* <div className="header">
        <Link to="/">Home</Link>
        <Link to="/recipes">My Recipes</Link>
        <Link to="/finder" className="rightmost">Recipe Finder</Link>
        <Link to="/profile" style={{"display": "flex", "alignItems": "center"}}>
            <img className="profile-pic" src="/public/media/profile.png" alt="profile pic" />
            <p>Profile</p>
        </Link>
    </div> */}
    <Outlet /> { /** This is where the body of your application will be rendered. **/ }
    </>
}
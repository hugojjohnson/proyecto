import React from "react";
import { Link } from "react-router-dom";


export default function Welcome(): React.ReactElement {
    return <>
    <div className="h-screen fixed w-full -z-10" style={{"backgroundImage": "url('./media/cover.webp')", "backgroundSize": "cover"}}></div>
    <div className="w-full h-screen bg-black/50 fixed -z-10"></div>
        <div className="flex flex-col items-center w-full h-screen">
            <h1 className="text-white text-8xl animate-fadeIn mt-[40vh]">Be mindful with your time.</h1>
            <Link to={"/sign-up"}><button className="mt-5 p-3 border-2 border-white rounded-md text-white text-xl animate-fadeInSlow">Get started</button></Link>
        </div>
      <div>
        <h1 className="animate-on-visible text-2xl text-white mt-64">Something</h1>
        <p className="animate-on-visible text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            provident autem sit eos excepturi nobis assumenda fuga illum praesentium commodi!</p>
        <h1 className="animate-on-visible text-2xl text-white mt-64">Something</h1>
        <p className="animate-on-visible text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            provident autem sit eos excepturi
            nobis assumenda fuga illum praesentium commodi!</p>
        <h1 className="animate-on-visible text-2xl text-white mt-64">Something</h1>
        <p className="animate-on-visible text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            provident autem sit eos excepturi
            nobis assumenda fuga illum praesentium commodi!</p>
        <h1 className="animate-on-visible text-2xl text-white mt-64">Something</h1>
        <p className="animate-on-visible text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            provident autem sit eos excepturi
            nobis assumenda fuga illum praesentium commodi!</p>

      </div>



      {/* <!-- Footer --> */}
       <div>

       </div>    
    </>
}
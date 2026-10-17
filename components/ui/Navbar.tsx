"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react";

import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { MdClose } from "react-icons/md";


interface Menu {
    name:string,
    href:string,

}
const menu:Menu[] = [
    {name:"", href:""}
]

export default function Navbar(){
    const [isOpen, setOpen]=useState(false)

    return(
        <header className="w-full fixed">
            <nav className="relative overflow-hidden z-10 flex justify-between items-center px-3 py-2.5">
                
                    <Link
                    href={"/"}>
                        <Image 
                        src={"/logo.png"}
                        width={450}
                        height={20}
                        alt="logo"
                        className="w-36 h-auto ">

                        </Image>
                    </Link>

                    <button
                    onClick={()=>setOpen(!isOpen)}
                    aria-label={isOpen ? "cerrar menu" : "abrir menu"}
                    className="">
                        {isOpen ? <MdClose className="size-8"/>  :  <HiOutlineMenuAlt4 className="size-8" /> }
                    </button>
          

               <div className={`fixed top-14 right-0 w-full bg-black/20 backdrop-blur-md p-5 transition-transform ease-in-out duration-300 ${isOpen ? "translate-x-0": "translate-x-full"}`}>

               </div>
            </nav>
        </header>
    )
}
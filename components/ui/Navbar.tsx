"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { RiLoginCircleFill } from "react-icons/ri";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { GrContact } from "react-icons/gr";

interface NavLink {
    name: string
    href: string
}

interface NavGroup {
    name: string
    children: NavLink[]
}

type MenuItem = NavLink | NavGroup

const logo= {
  logoUrl:"/logo.png",
  href:"/",
  alt:"Logo Aurum Logistics SAC",
}

const menu: MenuItem[] = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  {
    name: "Servicios", href:"/servicios",
    children: [
      { name: "Transporte aéreo", href: "/servicios/transporte-aereo" },
      { name: "Transporte terrestre", href: "/servicios/transporte-terrestre" },
      { name: "Transporte marítimo", href: "/servicios/transporte-maritimo" },
      { name: "Valorado", href: "/servicios/valorado" },
    ],
  },
  { name: "Responsabilidad", href: "/responsabilidad" },
  { name: "Tarifa", href: "/tarifa" },
];

const menuEspacial = {

  tracking:{
    name:"Tracking",
    href:"/Tracking",
  },

  contacto: {
    name:"Contacto",
    href:"/contacto",
  }

}
const itemClass = (active: boolean) =>
    `block w-full px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ease-in-out ${
        active ? "bg-primary text-white" : "text-black hover:bg-black/10"
    }`

    const itemClasSubmenu = (active: boolean) =>
    `block w-full px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ease-in-out ${
        active ? "bg-primary text-white" : "text-muted hover:bg-black/10"
    }`

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setOpen(false)

  return (
<<<<<<< HEAD
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-3 py-2.5">
        <Link href="/" onClick={closeMenu}>
          <Image
            src="/logo.png"
            width={450}
            height={20}
            alt="logo"
            priority
            className="h-auto w-48"
          />
        </Link>

        <ul className="hidden lg:flex justify-between items-center gap-4">
          {
            
          }
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          className="lg:hidden"
        >
          {isOpen ? (
            <MdClose className="size-8" />
          ) : (
            <HiOutlineMenuAlt4 className="size-8" />
          )}
        </button>
      </nav>
=======

   <header className="fixed w-full bg-white">
      <nav className="max-w-7xl mx-auto px-3 py-2.5 flex flex-row items-center justify-between relative">
        <Link href={logo.href} >
          <Image 
          src={logo.logoUrl}
          aria-label={logo.alt}
          alt={logo.alt}
          width={150}
          height={48}
          fetchPriority="high"
          className="w-36 md:w-44 h-auto"/>
        </Link>

        <div className="hidden lg:flex flex-row justify-between items-center">
          <ul className="flex flex-row gap-5">
            {menu.map((item) => {
              const isGroup = "children" in item
              const isActive = isGroup
                ? item.children.some((child) => child.href === pathname)
                : item.href === pathname
>>>>>>> 2295864 (se agrega section de hero y nosotros)

              const triggerClass = `flex items-center gap-2.5 border-b-4 py-2 font-body text-sm font-semibold uppercase tracking-wide text-black transition-colors duration-300 hover:border-primary ${
                isActive ? "border-primary" : "border-transparent"
              }`

              return (
                <li key={item.name} className="group relative">
                  {isGroup ? (
                    <>
                      <button type="button" aria-haspopup="menu" className={triggerClass}>
                        {item.name}
                        <FaChevronDown className="size-3 text-primary transition-transform duration-300 group-hover:rotate-180 group-has-focus-visible:rotate-180" />
                      </button>

                      <ul className="invisible absolute left-0 top-full z-50 flex min-w-64 translate-y-2 flex-col bg-white p-5 opacity-0 shadow transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-has-focus-visible:visible group-has-focus-visible:translate-y-0 group-has-focus-visible:opacity-100">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block p-3 font-body text-sm  font-semibold uppercase tracking-wide hover:bg-primary hover:text-white ${
                                child.href === pathname ? "text-primary" : "text-black"
                              }`}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link href={item.href} className={triggerClass}>
                      {item.name}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="hidden lg:flex flex-row justify-between items-center">
          <ul className="flex flex-row gap-5">
            <li className="bg-black/20 px-4 py-3 hover:bg-black group transition-colors duration-300 ease-in-out">
              <Link href={menuEspacial.tracking.href}
              className="flex flex-row items-center gap-3 font-body font-semibold uppercase text-sm tracking-wide group-hover:text-white transition-colors duration-300 ease-in-out">
                <RiLoginCircleFill  className="size-4 group-hover:text-secondary group-hover:scale-150 transition-transform duration-300 ease-in-out"/>
                {menuEspacial.tracking.name}
              </Link>
            </li>

            <li className="bg-secondary hover:bg-black px-4 group py-3">
              <Link href={menuEspacial.contacto.href}
              className="flex items-center gap-3 font-body font-semibold uppercase text-sm tracking-wide group-hover:text-white transition-colors duration-300 ease-in-out">
                <GrContact   className="size-4 group-hover:text-secondary group-hover:scale-150 transition-transform duration-300 ease-in-out"/>
                {menuEspacial.contacto.name}
              </Link>
            </li>
          </ul>
        </div>

        <button
        aria-label="Botón menú"
        onClick={()=>setOpen(!isOpen)}
        className="block lg:hidden">
          {isOpen ? <MdClose className="size-8" /> : <HiOutlineMenuAlt4 className="size-8" />}
        </button>

        <div className={`absolute right-0 top-full max-h-[calc(100dvh-100%)] w-4/6 overflow-y-auto bg-white px-3 py-5 shadow transition-all duration-300 ease-in-out lg:hidden ${
        isOpen ? "translate-x-0" : "invisible translate-x-full"}`}>
            <div>
                <ul className="flex flex-col gap-2">
                          {menu.map((item) => (
                              <li key={item.name}>
                                  {"children" in item ? (
                                      <>
                                          <button
                                              type="button"
                                              onClick={() => setSubmenuOpen(!isSubmenuOpen)}
                                              aria-expanded={isSubmenuOpen}
                                              className={`flex items-center justify-between ${itemClass(
                                                  item.children.some((child) => child.href === pathname)
                                              )}`}>
                                              {item.name}
                                              <FaChevronDown
                                                  className={`size-3 shrink-0 transition-transform duration-300 ease-in-out ${
                                                      isSubmenuOpen ? "rotate-180" : ""
                                                  }`}
                                              />
                                          </button>

                                          {isSubmenuOpen && (
                                              <ul className="flex flex-col gap-1 pl-3">
                                                  {item.children.map((child) => (
                                                      <li key={child.href}>
                                                          <Link
                                                              href={child.href}
                                                              onClick={closeMenu}
                                                              className={itemClasSubmenu(pathname === child.href)}>
                                                              {child.name}
                                                          </Link>
                                                      </li>
                                                  ))}
                                              </ul>
                                          )}
                                      </>
                                  ) : (
                                      <Link href={item.href} onClick={closeMenu} className={itemClass(pathname === item.href)}>
                                          {item.name}
                                      </Link>
                                  )}
                              </li>
                          ))}

                          <li className="mt-5 group bg-black/20 px-4 py-3 transition-colors duration-300 ease-in-out hover:bg-black">
                              <Link
                                  href={menuEspacial.tracking.href}
                                  onClick={closeMenu}
                                  className="flex flex-row items-center gap-3 font-body text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ease-in-out group-hover:text-white"> 
                                  <RiLoginCircleFill className="size-4 transition-transform duration-300 ease-in-out group-hover:scale-150 group-hover:text-secondary" />
                                  {menuEspacial.tracking.name}
                              </Link>
                          </li>

                          <li className="group bg-secondary px-4 py-3 transition-colors duration-300 ease-in-out hover:bg-black">
                              <Link
                                  href={menuEspacial.contacto.href}
                                  onClick={closeMenu}
                                  className="flex flex-row items-center gap-3 font-body text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ease-in-out group-hover:text-white">
                                   <GrContact   className="size-4 group-hover:text-secondary group-hover:scale-150 transition-transform duration-300 ease-in-out"/>
                                  {menuEspacial.contacto.name}
                              </Link>
                          </li>
                      </ul>
               
            </div>
        </div>
      </nav>
   </header>
  );
}





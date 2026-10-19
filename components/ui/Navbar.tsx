"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

interface NavLink {
  name: string;
  href: string;
}

interface NavGroup {
  name: string;
  children: NavLink[];
}

type MenuItem = NavLink | NavGroup;

const menu: MenuItem[] = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  {
    name: "Servicios",
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

const itemClass = (active: boolean) =>
  `block w-full p-2 text-left font-body text-base ${active ? "bg-primary text-white" : "text-black"}`;

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setOpen(false);

  return (
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

      <div
        onClick={(e) => e.target === e.currentTarget && closeMenu()}
        className={`absolute inset-x-0 top-full flex h-[calc(100dvh-100%)] justify-end transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <ul className="flex h-full w-9/12 flex-col gap-4 overflow-y-auto bg-white p-5 shadow">
          {menu.map((item) => (
            <li key={item.name}>
              {"children" in item ? (
                <>
                  <button
                    type="button"
                    onClick={() => setSubmenuOpen(!isSubmenuOpen)}
                    aria-expanded={isSubmenuOpen}
                    className="flex w-full items-center justify-between"
                  >
                    <span
                      className={itemClass(
                        item.children.some((c) => c.href === pathname),
                      )}
                    >
                      {item.name}
                    </span>
                    <FaChevronDown
                      className={`size-4 shrink-0 transition-transform duration-300 ${
                        isSubmenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isSubmenuOpen && (
                    <ul className="flex flex-col gap-3 p-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeMenu}
                            className={itemClass(pathname === child.href)}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={itemClass(pathname === item.href)}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

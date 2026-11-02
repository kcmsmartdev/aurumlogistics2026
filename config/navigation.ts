
import {
  FiSearch,
  FiFolder,
  FiDollarSign,
  FiFileText,
  FiPackage,
  FiPlusCircle,
  FiClipboard,
} from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
export const clientNavigation = [
  {
    title: "OPERACIONES",
    items: [
      {
        label: "Búsqueda",
        href: "/dashboard/busqueda",
        icon: FiSearch,
      },
      {
        label: "Tus documentos",
        href: "/dashboard/documentos",
        icon: FiFolder,
      },
    ],
  },
  {
    title: "SERVICIOS",
    items: [
      {
        label: "Tarifas",
        href: "/tarifas/",
        icon: FiDollarSign,
        external: true,
      },
      {
        label: "Consultar DAM",
        href: "https://ww3.sunat.gob.pe/cl-ad-itorientacionconsmovil/entrada.htm",
        icon: FiFileText,
        external: true,
      },
    ],
  },
  {
    title: "ATENCIÓN AL CLIENTE",
    items: [
      {
        label: "Generar reclamo",
        href: "/generar-reclamo",
        icon: FiPlusCircle,
        external: true,
      },
      {
        label: "Consultar reclamo",
        href: "consultar-reclamo",
        icon: FiClipboard,
      },
    ],
  },
  {
  title: "ADMINISTRACIÓN",
  items: [
    {
      label: "Registrar clientes",
      href: "/dashboard/clientes",
      icon: FiUsers,
    },
    {
      label: "Listado de clientes",
      href: "/dashboard/clientes/listado",
      icon: FiUsers,
    },
    {
      label: "Registrar operación",
      href: "/dashboard/operaciones/nueva",
      icon: FiPackage,
    },
  ],
},
];

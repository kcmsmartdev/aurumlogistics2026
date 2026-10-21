import Image from "next/image"
import Link from "next/link";

const AurumImages={
    AurumCustoms:{alt:"Aurum Customs", href:"https://aurumcustomsperu.com/", src:"/images/logo-aurumcustoms.svg"},
    AureumMetals:{alt:"Aurum Metals", href:"https://aurummetals.com.pe/", src:"/images/logo-aurummetals-color.webp"},
    AureumLogistics:{alt:"Aurum Logistics", href:"https://aurummetals.com.pe/", src:"/images/logo-aurumcustoms.png"},
}
export default function AurumGrupo(){
    return(
        <div className="flex-flex-col  py-10 mt-16 bg-gray p-8 rounded-2xl">
            <h3 className="font-heading font-bold text-base text-primary mb-12">
                AURUM GROUP
            </h3>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-between">
                <Link href={AurumImages.AurumCustoms.href} target="_blank">
                    <Image
                    src={AurumImages.AurumCustoms.src}
                    width={250}
                    height={100}
                    alt={AurumImages.AurumCustoms.alt}
                    className="w-48 h-auto hover:scale-105 transition-transform duration-300 ease-in-out" />
                </Link>

                <Link href={AurumImages.AureumLogistics.href} target="_blank">
                    <Image
                    src={AurumImages.AureumLogistics.src}
                    width={250}
                    height={100}
                    alt={AurumImages.AureumLogistics.alt}
                    className="w-48 h-auto hover:scale-105 transition-transform duration-300 ease-in-out" />
                </Link>

                <Link href={AurumImages.AureumMetals.href} target="_blank">
                    <Image
                    src={AurumImages.AureumMetals.src}
                    width={250}
                    height={100}
                    alt={AurumImages.AureumMetals.alt}
                    className="w-16 h-auto hover:scale-105 transition-transform duration-300 ease-in-out" />
                </Link>
            </div>
        </div>
    )
}
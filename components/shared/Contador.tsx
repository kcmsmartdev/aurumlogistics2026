"use client";

import { useEffect, useRef, useState } from "react";

type ContadorProps = {
  fin: number;
  sufijo?: string;
  duracion?: number; // en milisegundos
};

export default function Contador({ fin, sufijo = "", duracion = 2000 }: ContadorProps) {
  const [valor, setValor] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const yaAnimo = useRef(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting && !yaAnimo.current) {
          yaAnimo.current = true;
          const inicio = performance.now();

          const animar = (ahora: number) => {
            const progreso = Math.min((ahora - inicio) / duracion, 1);
            // easeOutCubic: empieza rápido y desacelera al final
            const suavizado = 1 - Math.pow(1 - progreso, 3);
            setValor(Math.round(suavizado * fin));

            if (progreso < 1) requestAnimationFrame(animar);
          };

          requestAnimationFrame(animar);
          observer.disconnect();
        }
      },
      { threshold: 0.5 } // se activa cuando el 50% es visible
    );

    observer.observe(elemento);
    return () => observer.disconnect();
  }, [fin, duracion]);

  return (
    <span ref={ref}>
      {valor}
      {sufijo}
    </span>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  IoPersonOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reiniciar el formulario al entrar o volver a esta página.
  useEffect(() => {
    function resetForm() {
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setLoading(false);
      setError("");
    }

    resetForm();

    window.addEventListener("pageshow", resetForm);

    return () => {
      window.removeEventListener("pageshow", resetForm);
    };
  }, []);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      // 1. Iniciar sesión
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError || !data.user) {
        setError("Correo electrónico o contraseña incorrectos.");
        setPassword("");
        return;
      }

      // 2. Consultar el perfil y el rol
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", data.user.id)
        .single();

      if (profileError || !profile) {
        await supabase.auth.signOut();
        setError("No se encontró un perfil asociado a esta cuenta.");
        setPassword("");
        return;
      }

      // 3. Validar los roles permitidos
      if (!["admin", "cliente"].includes(profile.role)) {
        await supabase.auth.signOut();
        setError("Tu cuenta no tiene permisos para acceder al portal.");
        setPassword("");
        return;
      }

      // 4. Limpiar los campos antes de redirigir
      setEmail("");
      setPassword("");
      setShowPassword(false);

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Ocurrió un error al iniciar sesión. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-full bg-primary">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-3 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <div className="mb-12">
            <span className="font-body text-xs font-bold uppercase text-secondary">
              AURUM LOGISTICS · TRACKING
            </span>

            <h1 className="mb-4 mt-2 font-heading text-4xl font-bold text-white lg:text-5xl">
              Bienvenido a tu portal de seguimiento
            </h1>

            <p className="font-body text-base text-muted-reverse">
              Accede a tu cuenta para consultar el estado de tus operaciones
              y mantenerte informado sobre el desarrollo de tus envíos.
            </p>
          </div>

          <div className="border border-white/10 bg-gray px-6 py-8 shadow-2xl md:px-8 md:py-10">
            <h2 className="mb-6 font-body text-lg font-bold text-accent">
              Iniciar sesión
            </h2>

            <form onSubmit={handleLogin}>
              <div className="mb-5 flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-body text-sm text-muted"
                >
                  Correo electrónico*
                </label>

                <div className="flex border border-border focus-within:border-secondary">
                  <div className="flex items-center border-r border-border bg-white px-3 text-muted">
                    <IoPersonOutline size={17} />
                  </div>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="username"
                    required
                    disabled={loading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full min-w-0 bg-gray p-3 font-body text-base outline-none"
                  />
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="font-body text-sm text-muted"
                >
                  Contraseña*
                </label>

                <div className="flex border border-border focus-within:border-secondary">
                  <div className="flex items-center border-r border-border bg-white px-3 text-muted">
                    <MdOutlinePassword size={19} />
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    className="w-full min-w-0 bg-gray p-3 font-body text-base outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                    className="border-l border-border px-3 text-muted hover:text-primary"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline size={19} />
                    ) : (
                      <IoEyeOutline size={19} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="mb-5 border border-error/30 bg-white p-3 font-body text-sm text-error"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary py-4 font-body text-base font-bold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Verificando..." : "Iniciar sesión"}
              </button>
            </form>
          </div>
        </div>

        <div className="hidden w-full flex-col items-center justify-center lg:flex">
          <Image
            src="/images/img-tracking.webp"
            alt="Seguimiento de operaciones logísticas"
            width={550}
            height={550}
            priority
            className="h-auto w-full max-w-140"
          />
        </div>
      </section>
    </main>
  );
}

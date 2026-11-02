
"use client";

import { useActionState } from "react";
import { FiSave } from "react-icons/fi";
import {
  updateCompany,
  type UpdateCompanyState,
} from "@/app/(dashbaord)/dashboard/clientes/[id]/actions";

interface EditCompanyFormProps {
  id: string;
  razonSocial: string;
  ruc: string;
  telefono: string | null;
}

const initialState: UpdateCompanyState = {
  success: false,
  message: "",
};

export function EditCompanyForm({
  id,
  razonSocial,
  ruc,
  telefono,
}: EditCompanyFormProps) {
  const updateCompanyWithId = updateCompany.bind(null, id);

  const [state, formAction, pending] = useActionState(
    updateCompanyWithId,
    initialState
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="razon_social"
          className="mb-2 block text-sm font-medium text-accent"
        >
          Razón social
        </label>

        <input
          id="razon_social"
          name="razon_social"
          type="text"
          defaultValue={razonSocial}
          required
          maxLength={200}
          className="h-12 w-full border border-border bg-white px-4 text-sm text-accent outline-none focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="ruc"
          className="mb-2 block text-sm font-medium text-accent"
        >
          RUC
        </label>

        <input
          id="ruc"
          name="ruc"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{11}"
          maxLength={11}
          minLength={11}
          defaultValue={ruc}
          required
          className="h-12 w-full border border-border bg-white px-4 text-sm text-accent outline-none focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="telefono"
          className="mb-2 block text-sm font-medium text-accent"
        >
          Teléfono
        </label>

        <input
          id="telefono"
          name="telefono"
          type="tel"
          defaultValue={telefono ?? ""}
          maxLength={30}
          className="h-12 w-full border border-border bg-white px-4 text-sm text-accent outline-none focus:border-primary"
        />
      </div>

      {state.message && (
        <p
          role="status"
          className={`border px-4 py-3 text-sm ${
            state.success
              ? "border-positive/30 bg-positive/5 text-positive"
              : "border-error/30 bg-error/5 text-error"
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FiSave size={17} />
        {pending ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}

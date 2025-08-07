"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({ password: z.string().min(6) });

type FormValues = z.infer<typeof schema>;

export default function ResetPage() {
  const search = useSearchParams();
  const router = useRouter();
  const token = search.get('token');
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    const res = await fetch('/api/auth/reset', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, password: values.password }) });
    if (res.ok) {
      reset();
      alert('Contraseña actualizada');
      router.push('/login');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[20px] shadow-[40px_40px_60px_0_rgba(228,230,234,0.74)] p-12">
        <h1 className="text-xl font-semibold mb-6">Restablecer contraseña</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="space-y-2">
            <label className="block text-base text-[#344054]">Nueva contraseña</label>
            <input type="password" aria-invalid={!!errors.password} {...register('password')} className="w-full h-12 px-4 py-3 text-sm text-[#344054] bg-white border-[3px] border-[#D1E9FF] rounded-lg focus:outline-none focus:border-[#1570EF]"/>
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>
          <button disabled={isSubmitting} className="w-full h-12 bg-[#1570EF] text-white rounded-lg">{isSubmitting? 'Actualizando...' : 'Actualizar'}</button>
        </form>
      </div>
    </div>
  );
}

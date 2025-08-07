"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({ email: z.string().email() });

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    await fetch('/api/auth/request-reset', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
    reset();
    alert('If the email exists, a reset link has been generated (check server logs).');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[20px] shadow-[40px_40px_60px_0_rgba(228,230,234,0.74)] p-12">
          <div className="mb-8 flex flex-col">
            <h1 className="font-bold text-[28px] leading-[28px] text-[#101828] mx-auto">Recuperar contraseña</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div className="space-y-3">
              <label className="block text-base text-[#344054]">Email</label>
              <input type="email" aria-invalid={!!errors.email} {...register('email')} className="w-full h-12 px-4 py-3 text-sm text-[#344054] bg-white border-[3px] border-[#D1E9FF] rounded-lg focus:outline-none focus:border-[#1570EF]"/>
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <button disabled={isSubmitting} className="w-full h-12 bg-[#1570EF] hover:bg-blue-600 text-white font-bold text-base rounded-lg">{isSubmitting? 'Enviando...' : 'Enviar enlace'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

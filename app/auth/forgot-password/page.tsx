"use client";
import { AuthForm, FieldError } from "@/src/components/auth/AuthForm";
import { forgotSchema, type ForgotValues } from "@/src/lib/validations";

export default function ForgotPasswordPage() {
  async function onSubmit(values: ForgotValues) {
    await fetch('/api/auth/forgot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
    alert('If the email exists, a reset link has been generated (check server logs).');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[20px] shadow-[40px_40px_60px_0_rgba(228,230,234,0.74)] p-12">
          <div className="mb-8 flex flex-col">
            <h1 className="font-bold text-[28px] leading-[28px] text-[#101828] mx-auto">Recuperar contraseña</h1>
          </div>
          <AuthForm type="forgot" schema={forgotSchema} onSubmit={onSubmit} submitLabel="Enviar enlace">
            {({ register, errors, isSubmitting }) => (
              <div className="space-y-6">
              <div className="space-y-3">
                  <label htmlFor="email" className="block text-base text-[#344054]">Email</label>
                  <input id="email" name="email" type="email" aria-invalid={!!(errors as any).email} {...register('email' as const)} className="w-full h-12 px-4 py-3 text-sm text-[#344054] bg-white border-[3px] border-[#D1E9FF] rounded-lg focus:outline-none focus:border-[#1570EF]"/>
                  <FieldError message={(errors as any).email?.message as string} />
                </div>
              </div>
            )}
          </AuthForm>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthForm, FieldError } from "@/src/components/auth/AuthForm";
import { resetSchema, type ResetValues } from "@/src/lib/validations";

export default function ResetPage() {
  const search = useSearchParams();
  const router = useRouter();
  const token = search.get('token');

  async function onSubmit(values: ResetValues) {
    const res = await fetch('/api/auth/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, password: values.password }) });
    if (res.ok) {
      alert('Contraseña actualizada');
      router.push('/auth/login');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[20px] shadow-[40px_40px_60px_0_rgba(228,230,234,0.74)] p-12">
        <h1 className="text-xl font-semibold mb-6">Restablecer contraseña</h1>
        <AuthForm type="reset" schema={resetSchema} onSubmit={onSubmit} submitLabel="Actualizar">
          {({ register, errors, isSubmitting }) => (
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-base text-[#344054]">Nueva contraseña</label>
                <input id="password" name="password" type="password" aria-invalid={!!(errors as any).password} {...register('password' as const)} className="w-full h-12 px-4 py-3 text-sm text-[#344054] bg-white border-[3px] border-[#D1E9FF] rounded-lg focus:outline-none focus:border-[#1570EF]"/>
                <FieldError message={(errors as any).password?.message as string} />
              </div>
            </div>
          )}
        </AuthForm>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { AuthForm, FieldError } from "@/src/components/auth/AuthForm";
import { registerSchema, type RegisterValues } from "@/src/lib/validations";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: RegisterValues) {
    const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    if (res.ok) {
      await signIn("credentials", { email: values.email, password: values.password, callbackUrl: "/store" });
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[#050A24]">
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 720 900" fill="none">
            <defs>
              <filter id="f0" x="-550" y="215" width="1479" height="1479" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="275" result="effect1_foregroundBlur"/>
              </filter>
              <filter id="f1" x="35" y="-686" width="1479" height="1479" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="275" result="effect1_foregroundBlur"/>
              </filter>
              <clipPath id="clip0"><rect width="720" height="900" fill="white"/></clipPath>
            </defs>
            <g clipPath="url(#clip0)">
              <g filter="url(#f0)"><circle cx="189.5" cy="954.5" r="189.5" fill="#2D55FB"/></g>
              <g filter="url(#f1)"><circle cx="774.5" cy="53.5" r="189.5" fill="#2D55FB"/></g>
            </g>
          </svg>
        </div>
        <div className="relative z-10 flex flex-col justify-center px-20 py-16">
          <div className="mb-20"><h1 className="text-white text-6xl font-bold tracking-wider">GRIFFE</h1></div>
          <div className="max-w-lg">
            <h2 className="text-white text-4xl italic leading-tight">
              <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Comerciar es mas que vender, es cumplir sueños</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-12">
        <div className="w-full max-w-md bg-white md:bg-transparent rounded-[20px] md:rounded-none shadow-[40px_40px_60px_0_rgba(228,230,234,0.74)] md:shadow-none p-8 md:p-0">
          <div className="md:hidden mb-8 text-center">
            <h1 className="text-[#050A24] text-4xl font-bold tracking-wider">GRIFFE</h1>
          </div>
          <AuthForm type="register" schema={registerSchema} onSubmit={onSubmit} submitLabel="Create account">
            {({ register, errors }) => (
              <>
                <h2 className="text-[#101828] text-3xl font-semibold">Create an account</h2>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-[#344054] text-base">Name</label>
                    <input {...register('name' as const)} className="w-full h-12 px-4 rounded-lg border-[3px] border-[#D1E9FF] text-[#344054] text-sm focus:outline-none focus:border-[#1570EF]" />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="block text-[#344054] text-base">Email</label>
                    <input id="email" name="email" type="email" aria-invalid={!!(errors as any).email} {...register('email' as const)} className="w-full h-12 px-4 rounded-lg border-[3px] border-[#D1E9FF] text-[#344054] text-sm focus:outline-none focus:border-[#1570EF]" />
                    <FieldError message={(errors as any).email?.message as string} />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="password" className="text-[#344054] text-base">Password</label>
                    <div className="relative">
                      <input id="password" name="password" type={showPassword?"text":"password"} aria-invalid={!!(errors as any).password} {...register('password' as const)} placeholder="Enter your password" className="w-full h-12 px-4 pr-12 rounded-lg border border-[#D0D5DD] text-[#98A2B3] text-sm placeholder-[#98A2B3] focus:outline-none focus:border-[#1570EF]"/>
                      <button type="button" aria-label={showPassword? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3]">{showPassword? <EyeOff className="w-6 h-6"/> : <Eye className="w-6 h-6"/>}</button>
                    </div>
                    <FieldError message={(errors as any).password?.message as string} />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-base">
                  <span className="text-[#98A2B3]">Already have an account ?</span>
                  <Link href="/auth/login" className="text-[#1570EF]">Log in</Link>
                </div>
              </>
            )}
          </AuthForm>
        </div>
      </div>
    </div>
  );
}

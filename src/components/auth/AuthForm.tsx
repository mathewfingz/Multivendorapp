"use client";
import React from 'react';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodSchema } from 'zod';

type AuthType = 'login' | 'register' | 'forgot' | 'reset';

type Props<TFormValues> = {
  type: AuthType;
  schema: ZodSchema<TFormValues>;
  defaultValues?: Partial<TFormValues>;
  onSubmit: (values: TFormValues) => Promise<void>;
  submitLabel: string;
  children: (helpers: {
    register: UseFormRegister<TFormValues>;
    errors: FieldErrors<TFormValues>;
    isSubmitting: boolean;
  }) => React.ReactNode;
};

export function AuthForm<TFormValues extends Record<string, any>>({ type, schema, defaultValues, onSubmit, submitLabel, children }: Props<TFormValues>) {
  const methods = useForm<TFormValues>({ resolver: zodResolver(schema as any), defaultValues });
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = methods;

  return (
    <form onSubmit={handleSubmit(async (values) => { await onSubmit(values); reset(); })} className="space-y-8" noValidate>
      {children({ register, errors, isSubmitting })}
      <div className="space-y-6">
        <button disabled={isSubmitting} className="w-full h-12 bg-[#1570EF] text-white text-base font-semibold rounded-lg hover:bg-[#1570EF]/90">
          {isSubmitting ? 'Loading...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-600">{message}</p>;
}


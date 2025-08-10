"use client";
import { useState } from 'react';

export default function StoreProfilePage() {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/me', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
    setSaving(false);
    alert('Saved');
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <form onSubmit={onSubmit} className="flex gap-2 items-end">
        <div className="flex flex-col">
          <label className="text-sm">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <button disabled={saving} className="px-3 py-2 bg-black text-white rounded">{saving? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  );
}






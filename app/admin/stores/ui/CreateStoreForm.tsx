"use client";
import { useState } from 'react';

export default function CreateStoreForm() {
  const [name, setName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/stores', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, ownerEmail: ownerEmail || undefined }) });
    setLoading(false);
    window.location.reload();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap gap-2 items-end">
      <div className="flex flex-col">
        <label className="text-sm">Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="border rounded px-2 py-1" required />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Owner email (admin)</label>
        <input value={ownerEmail} onChange={e=>setOwnerEmail(e.target.value)} className="border rounded px-2 py-1" placeholder="optional" />
      </div>
      <button disabled={loading} className="px-3 py-2 bg-black text-white rounded">{loading? 'Creating...' : 'Create'}</button>
    </form>
  );
}





"use client";
import { useEffect, useState } from 'react';

type Product = { id: string; name: string };

export default function StoreProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setItems(data.items ?? []);
    setLoading(false);
  }

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
    if (res.ok) {
      setName('');
      await load();
    }
  }

  useEffect(() => { void load(); }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Products</h2>
      <form onSubmit={addProduct} className="flex gap-2 items-end">
        <div className="flex flex-col">
          <label className="text-sm">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <button className="px-3 py-2 bg-black text-white rounded">Add</button>
      </form>
      {loading ? (
        <div className="text-sm text-gray-500">Loading...</div>
      ) : (
        <ul className="space-y-2">
          {items.map(it => (
            <li key={it.id} className="border rounded p-2 flex items-center justify-between">
              <span>{it.name}</span>
            </li>
          ))}
          {items.length === 0 && <li className="text-sm text-gray-500">No products yet</li>}
        </ul>
      )}
    </div>
  );
}






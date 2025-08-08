"use client";
import { useState } from 'react';

export default function StoreProductsPage() {
  const [items, setItems] = useState(['T-shirt', 'Hoodie', 'Mug']);
  function move(i: number, dir: -1 | 1) {
    const j = i + dir; if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  }
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Products (arrange)</h2>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={it} className="border rounded p-2 flex items-center justify-between">
            <span>{it}</span>
            <div className="space-x-2">
              <button className="px-2 py-1 border rounded" onClick={()=>move(i,-1)}>Up</button>
              <button className="px-2 py-1 border rounded" onClick={()=>move(i,1)}>Down</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}





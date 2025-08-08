import { prisma } from '@/src/lib/prisma';
import CreateStoreForm from './ui/CreateStoreForm';

type StoreRow = {
  id: string;
  name: string;
  createdAt: Date;
  owner: { email: string | null; name: string | null } | null;
};

export default async function AdminStoresPage() {
  const stores: StoreRow[] = await prisma.store.findMany({
    include: { owner: { select: { email: true, name: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Stores</h2>
      <CreateStoreForm />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Name</th><th className="text-left p-2">Owner</th><th className="text-left p-2">Created</th></tr></thead>
          <tbody>
            {stores.map((s: StoreRow) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.owner?.email}</td>
                <td className="p-2">{new Date(s.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}





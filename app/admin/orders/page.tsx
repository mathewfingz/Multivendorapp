export default function AdminOrdersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Orders</h2>
      <div className="flex flex-wrap gap-2">
        <input placeholder="Search order" className="border rounded px-2 py-1" />
        <select className="border rounded px-2 py-1"><option>Status</option><option>Pending</option><option>Paid</option></select>
        <input type="date" className="border rounded px-2 py-1" />
      </div>
      <div className="border rounded p-4 text-sm text-gray-500">No orders yet</div>
    </div>
  );
}






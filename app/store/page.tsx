export default function StoreHome() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border rounded p-3">
          <div className="text-xs text-gray-500">Total users</div>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="border rounded p-3">
          <div className="text-xs text-gray-500">Orders</div>
          <div className="text-2xl font-bold">0</div>
        </div>
      </div>
    </div>
  );
}

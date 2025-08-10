export default function StoreHome() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Store overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border rounded p-3">
          <div className="text-xs text-gray-500">Products</div>
          <div className="text-2xl font-bold">3</div>
        </div>
        <div className="border rounded p-3">
          <div className="text-xs text-gray-500">Orders (demo)</div>
          <div className="text-2xl font-bold">0</div>
        </div>
      </div>
    </div>
  );
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[hsl(0,0%,97.6%)]">
      <div className="max-w-5xl mx-auto p-2">
        <div className="bg-white rounded-2xl lg:rounded-3xl border-2 border-gray-300 shadow-lg overflow-hidden">
          <header className="flex items-center justify-between px-4 py-3 border-b">
            <h1 className="text-sm text-[hsl(213,11%,14%)]">User management</h1>
            <div className="text-xs text-gray-500">Demo</div>
          </header>
          <div className="flex flex-col lg:flex-row gap-2 p-3">
            <aside className="lg:w-auto">
              <nav className="space-y-2 text-xs">
                <div className="px-2 py-1 rounded bg-gray-100">Home</div>
                <div className="px-2 py-1 rounded">Products</div>
                <div className="px-2 py-1 rounded">Orders</div>
                <div className="px-2 py-1 rounded">Profile</div>
              </nav>
            </aside>
            <main className="flex-1 bg-white rounded">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}

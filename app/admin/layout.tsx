import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const nav = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Orders', href: '/admin/orders' },
    { name: 'Products', href: '/admin/products' },
    { name: 'Customers', href: '/admin/customers' },
    { name: 'Analytics', href: '/admin/analytics' },
    { name: 'Marketing', href: '/admin/marketing' },
    { name: 'Discounts', href: '/admin/discounts' },
  ];
  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-60 max-h-screen bg-[#EBEBEB] p-2.5 hidden lg:flex flex-col">
        <div className="flex-1 space-y-1">
          {nav.map(item => (
            <Link key={item.name} href={item.href} className="flex items-center gap-2 h-7 px-2.5 rounded-lg text-sm font-bold text-black hover:bg-[#FAFAFA]/50">
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <Link href="/admin/settings" className="flex items-center gap-2 h-8 px-2.5 rounded-lg text-sm font-bold text-black bg-[#EBEBEB] hover:bg-[#FAFAFA]/50">Settings</Link>
      </aside>
      <div className="flex-1 px-4 lg:px-10">
        <header className="flex items-center h-[88px]"><h1 className="text-2xl font-extrabold text-[#303030]">Analytics</h1></header>
        <main>{children}</main>
      </div>
    </div>
  );
}

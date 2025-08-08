export default function StoreOrdersPage() {
  const items = [
    { id: '1', title: 'Order #1 created', at: new Date().toLocaleString() },
    { id: '2', title: 'Payment received', at: new Date().toLocaleString() },
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Orders timeline</h2>
      <ol className="relative border-l">
        {items.map(e => (
          <li key={e.id} className="ml-4 mb-4">
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 mt-1" />
            <time className="text-xs text-gray-500">{e.at}</time>
            <p className="text-sm">{e.title}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}





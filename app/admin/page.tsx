export default function AdminHome() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row justify-center gap-5">
        <div className="w-full max-w-[545px] bg-white rounded-[20px] border border-[#E8E8ED] shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-1 h-[43px] px-5"><div className="flex-1 text-sm font-bold underline">Average units ordered</div></div>
          <div className="flex items-center h-[53px] px-5"><div className="text-[30px] font-bold"><span>0 </span><span className="text-[#70707B]">-</span></div></div>
          <div className="w-full h-[310px]" />
        </div>
        <div className="w-full max-w-[545px] bg-white rounded-[20px] border border-[#E8E8ED] shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-1 h-[43px] px-5"><div className="flex-1 text-sm font-bold underline">Total sales</div></div>
          <div className="flex items-center h-[53px] px-5"><div className="text-[30px] font-bold"><span>$0.00 </span><span className="text-[#70707B]">-</span></div></div>
          <div className="w-full h-[310px]" />
        </div>
      </div>
    </div>
  );
}

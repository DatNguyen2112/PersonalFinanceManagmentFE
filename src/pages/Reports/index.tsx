import { BarChart2, TrendingUp, Download, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Reports() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Báo cáo phân tích</h1>
                    <p className="text-slate-500 text-sm">Xem biểu đồ trực quan, phân tích xu hướng thu chi trong tháng.</p>
                </div>
                <button className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer">
                    <Download size={16} /> Xuất báo cáo (PDF)
                </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Tổng chi tiêu', amount: '$1,850.00', pct: 'Giảm 4% so với tháng trước', isGreen: true },
                    { label: 'Tổng thu nhập', amount: '$3,200.00', pct: 'Tăng 8% so với tháng trước', isGreen: true },
                    { label: 'Số dư tích lũy', amount: '$1,350.00', pct: 'Tăng 12% so với tháng trước', isGreen: true },
                ].map((m, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                        <span className="text-slate-400 text-sm font-medium">{m.label}</span>
                        <h3 className="text-2xl font-bold text-slate-800">{m.amount}</h3>
                        <span className={`flex items-center text-xs font-semibold ${m.isGreen ? 'text-emerald-500' : 'text-rose-500'}`}>
                            <ArrowUpRight size={14} className="mr-0.5" /> {m.pct}
                        </span>
                    </div>
                ))}
            </div>

            {/* Analytics Visual Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Spending by Category Mock Chart */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-800">Cơ cấu chi tiêu</h3>
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar size={12} /> Tháng này</span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Ăn uống', amount: '$540.00', pct: '35%', color: 'w-[35%] bg-blue-600' },
                            { name: 'Nhà ở & Tiện ích', amount: '$450.00', pct: '25%', color: 'w-[25%] bg-indigo-500' },
                            { name: 'Mua sắm thiết bị', amount: '$320.00', pct: '18%', color: 'w-[18%] bg-rose-500' },
                            { name: 'Giải trí & Du lịch', amount: '$210.00', pct: '12%', color: 'w-[12%] bg-amber-500' },
                            { name: 'Khác', amount: '$180.00', pct: '10%', color: 'w-[10%] bg-slate-400' },
                        ].map((cat, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600 font-medium">{cat.name} ({cat.pct})</span>
                                    <span className="text-slate-800 font-bold">{cat.amount}</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className={`h-full ${cat.color}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Net Cashflow Trends Mock */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-800">Biến động dòng tiền ròng</h3>
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar size={12} /> 6 tháng qua</span>
                    </div>
                    {/* Visual columns mockup */}
                    <div className="h-64 flex items-end justify-between pt-6 px-4 border-b border-l border-slate-100">
                        {[
                            { month: 'T12', income: 'h-32 bg-blue-500', expense: 'h-24 bg-rose-400' },
                            { month: 'T01', income: 'h-40 bg-blue-500', expense: 'h-28 bg-rose-400' },
                            { month: 'T02', income: 'h-36 bg-blue-500', expense: 'h-32 bg-rose-400' },
                            { month: 'T03', income: 'h-48 bg-blue-500', expense: 'h-30 bg-rose-400' },
                            { month: 'T04', income: 'h-44 bg-blue-500', expense: 'h-36 bg-rose-400' },
                            { month: 'T05', income: 'h-52 bg-blue-500', expense: 'h-34 bg-rose-400' },
                        ].map((col, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 w-10">
                                <div className="flex items-end gap-1 h-44 w-full justify-center">
                                    <div className={`w-3.5 rounded-t-sm ${col.income}`} />
                                    <div className={`w-3.5 rounded-t-sm ${col.expense}`} />
                                </div>
                                <span className="text-xs text-slate-400">{col.month}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-6 text-xs">
                        <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-500 rounded-full" /> Thu nhập</div>
                        <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-rose-400 rounded-full" /> Chi tiêu</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { PieChart, Plus, AlertCircle, TrendingUp, TrendingDown, Clock } from 'lucide-react';

export default function Budget() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Quản lý ngân sách</h1>
                    <p className="text-slate-500 text-sm">Thiết lập giới hạn chi tiêu để bảo đảm kế hoạch tài chính luôn đúng hướng.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/25 flex items-center gap-2 transition-all cursor-pointer">
                    <Plus size={16} /> Tạo ngân sách
                </button>
            </div>

            {/* Budget Progress Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { name: 'Ăn uống & Tiệc tùng', spent: '$350.00', limit: '$500.00', pct: 70, color: 'bg-blue-600', colorLight: 'bg-blue-50 text-blue-600', status: 'Còn lại $150.00', statusColor: 'text-blue-500' },
                    { name: 'Mua sắm thiết bị', spent: '$420.00', limit: '$400.00', pct: 105, color: 'bg-rose-500', colorLight: 'bg-rose-50 text-rose-500', status: 'Vượt hạn mức $20.00', statusColor: 'text-rose-500 font-semibold' },
                    { name: 'Di chuyển & Xăng xe', spent: '$80.00', limit: '$150.00', pct: 53, color: 'bg-emerald-500', colorLight: 'bg-emerald-50 text-emerald-500', status: 'Còn lại $70.00', statusColor: 'text-emerald-500' },
                ].map((b, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-slate-800 text-base">{b.name}</h3>
                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${b.colorLight}`}>
                                {b.pct}%
                            </span>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Đã chi: <strong>{b.spent}</strong></span>
                                <span className="text-slate-400">Hạn mức: {b.limit}</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className={`h-full ${b.color}`} style={{ width: `${Math.min(b.pct, 100)}%` }} />
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                            <AlertCircle size={14} className={b.statusColor} />
                            <span className={b.statusColor}>{b.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Smart Advice and Savings Goal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Advice Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl space-y-4 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10 translate-x-6 translate-y-6">
                        <PieChart size={200} />
                    </div>
                    <h3 className="text-lg font-bold">Gợi ý tiết kiệm thông minh</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                        Bạn đang chi tiêu nhiều hơn thường lệ ở danh mục <strong>Ăn uống & Tiệc tùng</strong>. Hãy thử cắt bớt các bữa ăn ngoài vào cuối tuần để giữ ngân sách của bạn an toàn cho đến cuối tháng này.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <div className="flex items-center gap-1.5 text-xs text-blue-200">
                            <TrendingUp size={14} /> Tiết kiệm dự kiến: +$50.00
                        </div>
                    </div>
                </div>

                {/* Savings goal progress */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-slate-800">Mục tiêu mua xe ô tô</h3>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Tiến độ tiết kiệm</span>
                        <span className="font-bold text-slate-800">$12,000 / $20,000</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600" style={{ width: '60%' }} />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock size={14} /> Dự kiến hoàn thành trong 8 tháng tới
                    </div>
                </div>
            </div>
        </div>
    );
}

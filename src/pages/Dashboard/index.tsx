import { Activity, ArrowUpRight, ArrowDownRight, DollarSign, Wallet as WalletIcon, CreditCard, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Tổng quan tài chính</h1>
                <p className="text-slate-500 text-sm">Chào mừng bạn quay trở lại. Đây là báo cáo tài chính tổng quan của bạn.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Balance */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                        <p className="text-slate-400 text-sm font-medium">Tổng số dư</p>
                        <h3 className="text-2xl font-bold text-slate-800">$12,480.00</h3>
                        <span className="flex items-center text-emerald-500 text-xs font-semibold">
                            <ArrowUpRight size={14} className="mr-1" /> +2.5% tháng này
                        </span>
                    </div>
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                        <DollarSign size={24} />
                    </div>
                </div>

                {/* Monthly Income */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                        <p className="text-slate-400 text-sm font-medium">Thu nhập</p>
                        <h3 className="text-2xl font-bold text-slate-800">$3,200.00</h3>
                        <span className="flex items-center text-emerald-500 text-xs font-semibold">
                            <ArrowUpRight size={14} className="mr-1" /> +12.4% tuần này
                        </span>
                    </div>
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
                        <ArrowUpRight size={24} />
                    </div>
                </div>

                {/* Monthly Expense */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                        <p className="text-slate-400 text-sm font-medium">Chi tiêu</p>
                        <h3 className="text-2xl font-bold text-slate-800">$1,850.00</h3>
                        <span className="flex items-center text-rose-500 text-xs font-semibold">
                            <ArrowDownRight size={14} className="mr-1" /> -4.2% hôm nay
                        </span>
                    </div>
                    <div className="p-4 bg-rose-50 text-rose-600 rounded-xl">
                        <ArrowDownRight size={24} />
                    </div>
                </div>

                {/* Monthly Savings */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                        <p className="text-slate-400 text-sm font-medium">Tiết kiệm</p>
                        <h3 className="text-2xl font-bold text-slate-800">$1,350.00</h3>
                        <span className="flex items-center text-emerald-500 text-xs font-semibold">
                            <ArrowUpRight size={14} className="mr-1" /> Đạt 90% mục tiêu
                        </span>
                    </div>
                    <div className="p-4 bg-violet-50 text-violet-600 rounded-xl">
                        <TrendingUp size={24} />
                    </div>
                </div>
            </div>

            {/* Detail Charts and Activities mockups */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activities */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-slate-800">Hoạt động gần đây</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Mua sắm siêu thị', category: 'Ăn uống', amount: '-$120.00', date: 'Hôm nay, 14:32', icon: <CreditCard size={18} />, color: 'bg-rose-50 text-rose-500' },
                            { name: 'Lương tháng 5', category: 'Thu nhập', amount: '+$3,200.00', date: '15 Th05, 08:00', icon: <DollarSign size={18} />, color: 'bg-emerald-50 text-emerald-500' },
                            { name: 'Thanh toán tiền điện', category: 'Dịch vụ', amount: '-$85.00', date: '12 Th05, 19:15', icon: <Activity size={18} />, color: 'bg-amber-50 text-amber-500' },
                        ].map((act, i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 ${act.color} rounded-xl`}>{act.icon}</div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 text-sm">{act.name}</h4>
                                        <p className="text-slate-400 text-xs">{act.category} • {act.date}</p>
                                    </div>
                                </div>
                                <span className={`font-bold text-sm ${act.amount.startsWith('+') ? 'text-emerald-500' : 'text-slate-800'}`}>
                                    {act.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* My Wallets List */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-slate-800">Ví của tôi</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Ví chính (Momo)', balance: '$8,450.00', color: 'from-pink-500 to-rose-500' },
                            { name: 'Thẻ tín dụng (VCB)', balance: '$4,030.00', color: 'from-blue-600 to-indigo-600' },
                        ].map((w, i) => (
                            <div key={i} className={`p-5 rounded-2xl bg-gradient-to-br ${w.color} text-white shadow-sm space-y-3 relative overflow-hidden`}>
                                <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
                                    <WalletIcon size={120} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs opacity-80">{w.name}</span>
                                    <CreditCard size={16} />
                                </div>
                                <h4 className="text-xl font-bold tracking-tight">{w.balance}</h4>
                                <div className="text-[10px] opacity-60">**** **** **** 8892</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { ArrowLeftRight, Search, Plus, Filter, ArrowUpRight, ArrowDownRight, CreditCard, DollarSign } from 'lucide-react';

export default function Transactions() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Danh sách giao dịch</h1>
                    <p className="text-slate-500 text-sm">Theo dõi và quản lý toàn bộ các giao dịch tài chính của bạn.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/25 flex items-center gap-2 transition-all cursor-pointer">
                    <Plus size={16} /> Thêm giao dịch
                </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-80">
                    <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm giao dịch..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 text-sm outline-none focus:border-blue-300 focus:bg-white transition-all"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors">
                        <Filter size={16} /> Bộ lọc
                    </button>
                    <select className="flex-1 md:flex-none px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium bg-white hover:bg-slate-50 outline-none transition-colors">
                        <option>Tất cả danh mục</option>
                        <option>Ăn uống</option>
                        <option>Thu nhập</option>
                        <option>Dịch vụ</option>
                        <option>Mua sắm</option>
                    </select>
                </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Giao dịch</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Danh mục</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Phương thức</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Ngày tạo</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Số tiền</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { name: 'Thanh toán tiền điện', category: 'Hóa đơn & Dịch vụ', method: 'Thẻ tín dụng', date: '18/05/2026, 15:30', amount: '-$85.00', isIncome: false, icon: <ArrowDownRight size={16} />, color: 'bg-rose-50 text-rose-500' },
                                { name: 'Mua sắm VinMart', category: 'Ăn uống', method: 'Ví Momo', date: '18/05/2026, 12:15', amount: '-$120.00', isIncome: false, icon: <ArrowDownRight size={16} />, color: 'bg-rose-50 text-rose-500' },
                                { name: 'Nhận lương tháng 5', category: 'Thu nhập', method: 'Chuyển khoản VCB', date: '15/05/2026, 08:00', amount: '+$3,200.00', isIncome: true, icon: <ArrowUpRight size={16} />, color: 'bg-emerald-50 text-emerald-500' },
                                { name: 'Hoàn tiền mua sắm', category: 'Thu nhập khác', method: 'Thẻ tín dụng', date: '14/05/2026, 10:45', amount: '+$15.00', isIncome: true, icon: <ArrowUpRight size={16} />, color: 'bg-emerald-50 text-emerald-500' },
                                { name: 'Thuê nhà tháng 5', category: 'Nhà ở & Tiện ích', method: 'Chuyển khoản VCB', date: '01/05/2026, 09:00', amount: '-$600.00', isIncome: false, icon: <ArrowDownRight size={16} />, color: 'bg-rose-50 text-rose-500' },
                            ].map((tx, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className={`p-2 rounded-xl ${tx.color}`}>{tx.icon}</div>
                                        <span className="font-semibold text-slate-800 text-sm">{tx.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{tx.category}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500 flex items-center gap-1.5">
                                        <CreditCard size={14} className="text-slate-400" /> {tx.method}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">{tx.date}</td>
                                    <td className={`px-6 py-4 text-sm font-bold text-right ${tx.isIncome ? 'text-emerald-500' : 'text-slate-800'}`}>
                                        {tx.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

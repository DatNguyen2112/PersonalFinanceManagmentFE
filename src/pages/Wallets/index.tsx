import { Plus, CreditCard, Wallet as WalletIcon, ArrowUpRight, CheckCircle, RefreshCw } from 'lucide-react';

export default function Wallets() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Danh sách ví & tài khoản</h1>
                    <p className="text-slate-500 text-sm">Quản lý các nguồn tiền mặt, thẻ ngân hàng và ví điện tử của bạn.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/25 flex items-center gap-2 transition-all cursor-pointer">
                    <Plus size={16} /> Thêm tài khoản mới
                </button>
            </div>

            {/* List of Wallets/Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Wallet 1 */}
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-6 rounded-3xl text-white shadow-lg space-y-6 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10 translate-x-6 translate-y-6">
                        <WalletIcon size={160} />
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold tracking-wider uppercase opacity-85">Ví điện tử Momo</span>
                        <CheckCircle size={18} className="text-pink-100" />
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest opacity-60">Số dư hiện tại</span>
                        <h3 className="text-2xl font-bold tracking-tight">$8,450.00</h3>
                    </div>
                    <div className="flex justify-between items-center text-xs opacity-75 pt-2">
                        <span>Liên kết: 098****211</span>
                        <span>Momo Pay</span>
                    </div>
                </div>

                {/* Wallet 2 */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-lg space-y-6 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10 translate-x-6 translate-y-6">
                        <CreditCard size={160} />
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold tracking-wider uppercase opacity-85">Thẻ Vietcombank</span>
                        <CheckCircle size={18} className="text-blue-100" />
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest opacity-60">Số dư hiện tại</span>
                        <h3 className="text-2xl font-bold tracking-tight">$4,030.00</h3>
                    </div>
                    <div className="flex justify-between items-center text-xs opacity-75 pt-2">
                        <span>Số thẻ: **** 8892</span>
                        <span>VCB Visa</span>
                    </div>
                </div>

                {/* Wallet 3 - Cash */}
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-6 rounded-3xl text-white shadow-lg space-y-6 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10 translate-x-6 translate-y-6">
                        <WalletIcon size={160} />
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold tracking-wider uppercase opacity-85">Tiền mặt</span>
                        <CheckCircle size={18} className="text-slate-200" />
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest opacity-60">Số dư hiện tại</span>
                        <h3 className="text-2xl font-bold tracking-tight">$350.00</h3>
                    </div>
                    <div className="flex justify-between items-center text-xs opacity-75 pt-2">
                        <span>Ví tay</span>
                        <span>Cash</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions / Linked accounts summary */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-800">Đồng bộ tài khoản</h3>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
                        Các tài khoản ngân hàng và ví điện tử của bạn được kết nối an toàn để tự động cập nhật số dư và lịch sử giao dịch mỗi 15 phút.
                    </p>
                    <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap">
                        <RefreshCw size={14} /> Đồng bộ ngay
                    </button>
                </div>
            </div>
        </div>
    );
}

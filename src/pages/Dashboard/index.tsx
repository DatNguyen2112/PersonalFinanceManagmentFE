import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  TrendingDown,
} from "lucide-react";
import { useTransactionsFacade } from "../../store/transactions/facade";
import { useEffect } from "react";
import { formatDate, formatShortVND } from "../../utils/format";
import { BarChart } from "../../components/BarChart";
import { DonutChart } from "../../components/DonutChart";

export default function Dashboard() {
  const transactionFacade = useTransactionsFacade();

  useEffect(() => {
    transactionFacade.getTransactionDashboard();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total balance */}
        <div className="lg:col-span-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white shadow-lg shadow-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <p className="text-blue-100 text-sm font-medium">Tổng số dư</p>
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Wallet size={18} />
            </div>
          </div>
          <p className="text-2xl font-bold leading-tight">
            {formatShortVND(
              transactionFacade.transactionDashboard?.monthly.netBalance || 0,
            )}
          </p>
        </div>

        {/* Month income */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500 text-sm font-medium">Thu nhập tháng</p>
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
              <TrendingUp size={18} className="text-emerald-500" />
            </div>
          </div>
          <p className="text-slate-800 text-xl font-bold">
            {formatShortVND(
              transactionFacade.transactionDashboard?.monthly.totalIn || 0,
            )}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} className="text-emerald-500" />
            <p className="text-emerald-600 text-xs font-medium">
              Tháng {transactionFacade.transactionDashboard?.monthly.month}/
              {transactionFacade.transactionDashboard?.monthly.year}
            </p>
          </div>
        </div>

        {/* Month expense */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500 text-sm font-medium">Chi tiêu tháng</p>
            <div className="w-9 h-9 bg-rose-50 rounded-xl flex items-center justify-center">
              <TrendingDown size={18} className="text-rose-500" />
            </div>
          </div>
          <p className="text-slate-800 text-xl font-bold">
            {formatShortVND(
              transactionFacade.transactionDashboard?.monthly.totalOut || 0,
            )}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowDownRight size={12} className="text-rose-500" />
            <p className="text-rose-500 text-xs font-medium">
              Tháng {transactionFacade.transactionDashboard?.monthly.month}/
              {transactionFacade.transactionDashboard?.monthly.year}
            </p>
          </div>
        </div>

        {/* Net */}
        <div
          className={`bg-white rounded-2xl p-5 shadow-sm border ${transactionFacade.transactionDashboard?.monthly.netBalance >= 0 ? "border-emerald-100" : "border-rose-100"}`}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500 text-sm font-medium">Tiết kiệm</p>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${transactionFacade.transactionDashboard?.monthly.netBalance >= 0 ? "bg-emerald-50" : "bg-rose-50"}`}
            >
              {transactionFacade.transactionDashboard?.monthly.netBalance >=
              0 ? (
                <TrendingUp size={18} className="text-emerald-500" />
              ) : (
                <TrendingDown size={18} className="text-rose-500" />
              )}
            </div>
          </div>
          <p
            className={`text-xl font-bold ${transactionFacade.transactionDashboard?.monthly.netBalance >= 0 ? "text-emerald-600" : "text-rose-500"}`}
          >
            {transactionFacade.transactionDashboard?.monthly.netBalance >= 0
              ? "+"
              : ""}
            {formatShortVND(
              transactionFacade.transactionDashboard?.monthly.netBalance || 0,
            )}
          </p>
          <p className="text-slate-400 text-xs mt-1">Thu - Chi tháng này</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-slate-800 font-semibold">
                Dòng tiền 6 tháng
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Thu nhập và chi tiêu theo tháng
              </p>
            </div>
          </div>
          <BarChart
            data={transactionFacade.transactionDashboard?.cashFlow}
            height={200}
          />
        </div>

        {/* Donut chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-slate-800 font-semibold mb-1">
            Chi tiêu theo danh mục
          </h3>
          <p className="text-slate-400 text-xs mb-4">
            Tháng {transactionFacade.transactionDashboard?.category?.month}/
            {transactionFacade.transactionDashboard?.category?.year}
          </p>
          <div className="flex flex-col items-center gap-4">
            <DonutChart
              segments={transactionFacade.transactionDashboard?.category?.items?.map(
                (cat) => ({
                  label: cat.categoryName,
                  value: cat.amount,
                  color: cat.color,
                  percent: cat.percentage,
                }),
              )}
              size={148}
              strokeWidth={22}
              centerLabel={formatShortVND(
                transactionFacade.transactionDashboard?.category
                  ?.totalExpense || 0,
              )}
              centerSubLabel="tổng chi"
            />
            <div className="w-full space-y-2">
              {transactionFacade.transactionDashboard?.category?.items
                ?.slice(0, 5)
                .map((seg, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: seg.color }}
                    />
                    <span className="text-slate-600 text-xs flex-1 truncate">
                      {seg.categoryName}
                    </span>
                    <span className="text-slate-500 text-xs font-medium">
                      {formatShortVND(seg.amount)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
            <h3 className="text-slate-800 font-semibold">Giao dịch gần đây</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {transactionFacade.transactionDashboard?.recentTx?.length === 0 ? (
              <div className="px-6 py-8 text-center text-slate-400 text-sm">
                Chưa có giao dịch nào
              </div>
            ) : (
              transactionFacade.transactionDashboard?.recentTx?.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center gap-3 px-6 py-3.5 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 text-sm font-medium truncate">
                      {txn.transactionContent ||
                        txn.categoryName ||
                        "Không có ghi chú"}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {txn.categoryName} · {formatDate(txn.transactionDate)}
                    </p>
                  </div>
                  <div
                    className={`text-sm font-semibold ${txn.direction === "IN" ? "text-emerald-600" : "text-rose-500"}`}
                  >
                    {txn.direction === "IN" ? "+" : "-"}
                    {formatShortVND(txn.amountIn)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Budget progress + Wallets */}
        <div className="space-y-6">
          {/* Budget */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-slate-800 font-semibold mb-4">
              Ngân sách tháng
            </h3>
            <div className="space-y-4">
              {transactionFacade.transactionDashboard?.budgets?.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-2">
                  Chưa thiết lập ngân sách
                </p>
              ) : (
                transactionFacade.transactionDashboard?.budgets?.map((b) => (
                  <div key={b.budgetId}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "#94A3B8" }}
                        />
                        <span className="text-slate-600 text-xs font-medium">
                          {b.categoryName}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-medium ${b.usagePercent >= 90 ? "text-rose-500" : b.usagePercent >= 70 ? "text-amber-500" : "text-slate-400"}`}
                      >
                        {b.usagePercent.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${b.usagePercent >= 90 ? "bg-rose-400" : b.usagePercent >= 70 ? "bg-amber-400" : "bg-emerald-400"}`}
                        style={{ width: `${b.usagePercent}%` }}
                      />
                    </div>
                    <p className="text-slate-400 text-xs mt-1">
                      {formatShortVND(b.spentAmount)} /{" "}
                      {formatShortVND(b.limitAmount)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

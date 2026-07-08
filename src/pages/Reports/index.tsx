import { useEffect, useState } from "react";
import { formatShortVND } from "../../utils/format";
import { useTransactionsFacade } from "../../store/transactions/facade";
import { TrendingDown, TrendingUp } from "lucide-react";
import { BarChart } from "../../components/BarChart";
import { DonutChart } from "../../components/DonutChart";

export default function Reports() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [activeTab, setActiveTab] = useState<string>("overview");

  const transactionsFacade = useTransactionsFacade();

  useEffect(() => {
    if (activeTab == "overview") {
      transactionsFacade.getIncomeAndExpenseSummary({
        year: year,
        month: new Date().getMonth() + 1,
      });
    } else {
      transactionsFacade.getIncomeAndExpenseCategorySummary({
        year: year,
        month: new Date().getMonth() + 1,
      });
    }
  }, [activeTab, year]);

  console.log(activeTab);

  console.log(transactionsFacade.incomeAndExpenseSummary);
  console.log(transactionsFacade.incomeAndExpenseCategorySummary);
  console.log(transactionsFacade.incomeAndExpenseSummary?.savingsRate);

  return (
    <div className="space-y-6">
      {/* Year selector */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {[2024, 2025, 2026].map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${year === y ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              {y}
            </button>
          ))}
        </div>

        <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          {(
            [
              ["overview", "Tổng quan"],
              ["category", "Danh mục"],
            ] as const
          ).map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === tab ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs mb-2">Tổng thu nhập</p>
          <p className="text-emerald-600 font-bold text-xl">
            {formatShortVND(
              transactionsFacade.incomeAndExpenseSummary?.totalIncome ?? 0,
            )}
          </p>
          <p className="text-slate-400 text-xs mt-1">
            TB:{" "}
            {formatShortVND(
              transactionsFacade.incomeAndExpenseSummary?.avgMonthlyIncome ?? 0,
            )}
            /tháng
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs mb-2">Tổng chi tiêu</p>
          <p className="text-rose-500 font-bold text-xl">
            {formatShortVND(
              transactionsFacade.incomeAndExpenseSummary?.totalExpense ?? 0,
            )}
          </p>
          <p className="text-slate-400 text-xs mt-1">
            TB:{" "}
            {formatShortVND(
              transactionsFacade.incomeAndExpenseSummary?.avgMonthlyExpense ??
              0,
            )}
            /tháng
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs mb-2">Tiết kiệm ròng</p>
          <p
            className={`font-bold text-xl ${transactionsFacade.incomeAndExpenseSummary?.netSavings >= 0
              ? "text-emerald-600"
              : "text-rose-500"
              }`}
          >
            {transactionsFacade.incomeAndExpenseSummary?.netSavings >= 0
              ? "+"
              : ""}
            {formatShortVND(
              transactionsFacade.incomeAndExpenseSummary?.netSavings ?? 0,
            )}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {transactionsFacade.incomeAndExpenseSummary?.netSavings >= 0 ? (
              <TrendingUp size={12} className="text-emerald-500" />
            ) : (
              <TrendingDown size={12} className="text-rose-500" />
            )}
            <p className="text-slate-400 text-xs">Năm {year}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs mb-2">Tỷ lệ tiết kiệm</p>
          <p
            className={`font-bold text-xl ${transactionsFacade.incomeAndExpenseSummary?.savingsRate >= 20
              ? "text-emerald-600"
              : transactionsFacade.incomeAndExpenseSummary?.savingsRate >= 0
                ? "text-amber-500"
                : "text-rose-500"
              }`}
          >
            {transactionsFacade.incomeAndExpenseSummary?.savingsRate > 0
              ? "+" +
              transactionsFacade.incomeAndExpenseSummary?.savingsRate?.toFixed(
                1,
              )
              : 0}
            %
          </p>
          <div className="h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full ${transactionsFacade.incomeAndExpenseSummary?.savingsRate >= 20 ? "bg-emerald-400" : "bg-amber-400"}`}
              style={{
                width: `${Math.max(0, Math.min(transactionsFacade.incomeAndExpenseSummary?.savingsRate, 100))}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-slate-800 font-semibold mb-1">
            Dòng tiền theo tháng - {year}
          </h3>
          <p className="text-slate-400 text-xs mb-5">
            So sánh thu nhập và chi tiêu hàng tháng
          </p>
          <BarChart
            data={transactionsFacade.incomeAndExpenseSummary?.monthlyBars?.map(
              (item: any) => ({
                label: item.label,
                month: `${item.month}`,
                income: item.income,
                expense: item.expense,
              }),
            )}
            height={240}
          />
        </div>
      )}

      {activeTab === "category" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-slate-800 font-semibold mb-1">
              Chi tiêu theo danh mục
            </h3>
            <p className="text-slate-400 text-xs mb-4">Năm {year}</p>
            <div className="flex flex-col items-center gap-5">
              <DonutChart
                segments={transactionsFacade?.incomeAndExpenseCategorySummary?.expenseItems
                  ?.slice(0, 7)
                  ?.map((e: any) => ({
                    value: e.amount,
                    color: e.color ?? "#94A3B8",
                    label: e.categoryName,
                  }))}
                size={160}
                strokeWidth={26}
                centerLabel={formatShortVND(
                  transactionsFacade?.incomeAndExpenseCategorySummary
                    ?.totalExpense,
                )}
                centerSubLabel="tổng chi"
              />
              <div className="w-full space-y-2.5">
                {transactionsFacade.incomeAndExpenseCategorySummary?.expenseItems
                  ?.slice(0, 7)
                  ?.map((item: any, i: any) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-600 text-xs font-medium">
                            {item.categoryName}
                          </span>
                          <span className="text-slate-500 text-xs">
                            {item.percentage.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${item.percentage}%`,
                              background: item.color ?? "#94A3B8",
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-slate-700 text-xs font-semibold w-16 text-right">
                        {formatShortVND(item.amount)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Income breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-slate-800 font-semibold mb-1">
              Thu nhập theo danh mục
            </h3>
            <p className="text-slate-400 text-xs mb-4">Năm {year}</p>
            <div className="flex flex-col items-center gap-5">
              <DonutChart
                segments={transactionsFacade.incomeAndExpenseCategorySummary?.incomeItems
                  ?.slice(0, 7)
                  ?.map((e: any) => ({
                    value: e.amount,
                    color: e.color ?? "#10B981",
                    label: e.categoryName,
                  }))}
                size={160}
                strokeWidth={26}
                centerLabel={formatShortVND(
                  transactionsFacade.incomeAndExpenseCategorySummary
                    ?.totalIncome,
                )}
                centerSubLabel="tổng thu"
              />
              <div className="w-full space-y-2.5">
                {transactionsFacade.incomeAndExpenseCategorySummary?.incomeItems
                  ?.slice(0, 7)
                  ?.map((item: any, i: any) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-600 text-xs font-medium">
                            {item.categoryName}
                          </span>
                          <span className="text-slate-500 text-xs">
                            {item.percentage.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-slate-700 text-xs font-semibold w-16 text-right">
                        {formatShortVND(item.amount)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "trend" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* {monthlyData
            .map((m, i) => {
              const net = m.income - m.expense;
              const hasData = m.income > 0 || m.expense > 0;
              return hasData ? (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-slate-700 font-semibold text-sm">
                      {m.label} {year}
                    </h4>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${net >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"}`}
                    >
                      {net >= 0 ? "+" : ""}
                      {formatShortVND(net)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 w-12">Thu</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full"
                          style={{
                            width: `${m.income > 0 ? Math.min((m.income / Math.max(m.income, m.expense)) * 100, 100) : 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-emerald-600 w-16 text-right">
                        {formatShortVND(m.income)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 w-12">Chi</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-400 rounded-full"
                          style={{
                            width: `${m.expense > 0 ? Math.min((m.expense / Math.max(m.income, m.expense)) * 100, 100) : 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-rose-500 w-16 text-right">
                        {formatShortVND(m.expense)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null;
            })
            .filter(Boolean)} */}
        </div>
      )}
    </div>
  );
}

import { Plus } from "lucide-react";

export default function Budget() {
  return (
    <div className="space-y-6">
      {/* Month selector + stats */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <select
            // value={month}
            // onChange={(e) => setMonth(+e.target.value)}
            className="text-sm bg-transparent border-0 px-3 py-2.5 text-slate-700 outline-none cursor-pointer"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                Tháng {m}
              </option>
            ))}
          </select>
          <select
            // value={year}
            // onChange={(e) => setYear(+e.target.value)}
            className="text-sm bg-transparent border-0 pr-3 py-2.5 text-slate-700 outline-none cursor-pointer"
          >
            {[2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <button
          //   onClick={openAdd}
          //   disabled={availableCategories.length === 0}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-500/20 ml-auto"
        >
          <Plus size={16} />
          Thêm ngân sách
        </button>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs mb-1">Tổng ngân sách</p>
          <p className="text-slate-800 font-bold text-lg">
            {/* {formatShortVND(totalBudget)} */}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs mb-1">Đã chi tiêu</p>
          <p className="text-rose-500 font-bold text-lg">
            {/* {formatShortVND(totalSpent)} */}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs mb-1">Còn lại</p>
          {/* <p
            className={`font-bold text-lg ${totalBudget - totalSpent >= 0 ? "text-emerald-600" : "text-rose-500"}`}
          >
            {formatShortVND(Math.abs(totalBudget - totalSpent))}
          </p> */}
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs mb-1">Vượt ngân sách</p>
          {/* <p
            className={`font-bold text-lg ${overBudget > 0 ? "text-rose-500" : "text-emerald-600"}`}
          >
            {overBudget} / {enriched.length}
          </p> */}
        </div>
      </div>

      {/* Overall progress bar */}
      {/* {totalBudget > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600 text-sm font-medium">
              Tổng quan tháng {month}/{year}
            </span>
            <span
              className={`text-sm font-semibold ${totalSpent / totalBudget >= 1 ? "text-rose-500" : "text-slate-600"}`}
            >
              {((totalSpent / totalBudget) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                totalSpent / totalBudget >= 1
                  ? "bg-rose-500"
                  : totalSpent / totalBudget >= 0.8
                    ? "bg-amber-400"
                    : "bg-blue-500"
              }`}
              style={{
                width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-slate-400 text-xs">
              {formatVND(totalSpent)} đã chi
            </span>
            <span className="text-slate-400 text-xs">
              {formatVND(totalBudget)} ngân sách
            </span>
          </div>
        </div>
      )} */}

      {/* Budget cards */}
      {/* {enriched.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-100 text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plus size={24} className="text-slate-400" />
          </div>
          <p className="text-slate-500 font-medium">
            Chưa có ngân sách cho tháng này
          </p>
          <p className="text-slate-400 text-sm mt-1">
            Thiết lập ngân sách để theo dõi chi tiêu
          </p>
          <button
            onClick={openAdd}
            className="mt-4 text-blue-600 text-sm font-medium hover:underline"
          >
            Thêm ngân sách
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enriched.map((b) => (
            <div
              key={b.id}
              className={`bg-white rounded-2xl p-5 shadow-sm border transition-all ${
                b.pct >= 100
                  ? "border-rose-200"
                  : b.pct >= 70
                    ? "border-amber-200"
                    : "border-slate-100"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: (b.cat?.color ?? "#94A3B8") + "20" }}
                  >
                    <CategoryIcon
                      name={b.cat?.icon ?? "circle"}
                      size={18}
                      style={{ color: b.cat?.color ?? "#94A3B8" }}
                    />
                  </div>
                  <div>
                    <p className="text-slate-800 text-sm font-semibold">
                      {b.cat?.name ?? "Danh mục"}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {formatShortVND(b.amount)} / tháng
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {b.pct >= 100 ? (
                    <AlertTriangle size={14} className="text-rose-500" />
                  ) : b.pct >= 70 ? (
                    <AlertTriangle size={14} className="text-amber-500" />
                  ) : (
                    <CheckCircle size={14} className="text-emerald-500" />
                  )}
                  <button
                    onClick={() => openEdit(b)}
                    className="p-1 text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    <Edit3 size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    disabled={deleting === b.id}
                    className="p-1 text-slate-300 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs text-slate-500">
                    Đã chi: {formatShortVND(b.spent)}
                  </span>
                  <span
                    className={`text-xs font-semibold ${b.pct >= 100 ? "text-rose-500" : b.pct >= 70 ? "text-amber-500" : "text-emerald-600"}`}
                  >
                    {b.pct.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      b.pct >= 100
                        ? "bg-rose-400"
                        : b.pct >= 70
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                    }`}
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-xs text-slate-400">
                  {b.remaining >= 0
                    ? `Còn lại: ${formatShortVND(b.remaining)}`
                    : `Vượt: ${formatShortVND(-b.remaining)}`}
                </span>
                <span className="text-xs text-slate-400">
                  {formatVND(b.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )} */}

      {/* Add/Edit Modal */}
      {/* {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-slate-800 font-semibold">
                {editBudget ? "Sửa ngân sách" : "Thêm ngân sách"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-slate-500 text-xs font-medium block mb-1.5">
                  Danh mục chi tiêu
                </label>
                <select
                  value={form.category_id}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category_id: e.target.value }))
                  }
                  required
                  disabled={!!editBudget}
                  className="w-full bg-slate-50 rounded-xl px-3 py-2.5 text-sm text-slate-700 outline-none border border-transparent focus:border-blue-300 transition-colors disabled:opacity-60"
                >
                  <option value="">-- Chọn danh mục --</option>
                  {availableCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-slate-500 text-xs font-medium block mb-1.5">
                  Ngân sách (VND)
                </label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, amount: e.target.value }))
                  }
                  placeholder="0"
                  min="0"
                  required
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-800 font-semibold text-lg outline-none border border-transparent focus:border-blue-300 transition-colors"
                />
              </div>
              <p className="text-slate-400 text-xs">
                Ngân sách cho: {getMonthLabel(month, year)}
              </p>
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-500/20 disabled:opacity-50"
              >
                {saving
                  ? "Đang lưu..."
                  : editBudget
                    ? "Cập nhật"
                    : "Thêm ngân sách"}
              </button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
}

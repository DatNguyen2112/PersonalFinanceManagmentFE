import { AlertTriangle, CheckCircle, Plus } from "lucide-react";
import { useTransactionsFacade } from "../../store/transactions/facade";
import { useEffect, useState } from "react";
import { formatShortVND, formatVND } from "../../utils/format";
import { Form, InputNumber, Modal, Select, Spin } from "antd";
import { EStatusTransactions, type BudgetCategoryModel } from "../../store/transactions/slice";

export default function Budget() {
  const transactionFacade = useTransactionsFacade();

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    transactionFacade.getListCategories();
  }, []);

  useEffect(() => {
    transactionFacade.getBudgetSummary({
      year: year,
      month: month,
    });
  }, [year, month]);

  useEffect(() => {
    switch (transactionFacade.status) {
      case EStatusTransactions.addBudgetCategoryFulfilled:

        transactionFacade.getBudgetSummary({
          year: year,
          month: month,
        });

        setOpen(false)

        form.resetFields()
        break;
      default:
        break;
    }
  }, [transactionFacade.status])

  const onAdd = (values: BudgetCategoryModel) => {
    transactionFacade.addBudgetCategory({
      ...values,
      year: year,
      month: month,
    })
  };

  const categoryOptions = transactionFacade?.listCategories?.map((category: any) => ({
    value: category.id,
    label: category.name,
  })) ?? [];

  // const onEdit = (values: BudgetCategoryModel) => {
  //   transactionFacade.editBudgetCategory(values);
  // };

  // const onDelete = (id: number) => {
  //   transactionFacade.deleteBudgetCategory(id);
  // };

  return (
    <Spin spinning={transactionFacade?.isLoading}>
      <div className="space-y-6">
        {/* Month selector + stats */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <select
              value={month}
              onChange={(e) => setMonth(+e.target.value)}
              className="text-sm bg-transparent border-0 px-3 py-2.5 text-slate-700 outline-none cursor-pointer"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  Tháng {m}
                </option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(+e.target.value)}
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
            onClick={() => setOpen(true)}
            disabled={transactionFacade.budgetSummary?.categories?.length as number === 0}
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
              {formatShortVND(transactionFacade.budgetSummary?.totalLimit as number)}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs mb-1">Đã chi tiêu</p>
            <p className="text-rose-500 font-bold text-lg">
              {formatShortVND(transactionFacade.budgetSummary?.totalSpent as number)}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs mb-1">Còn lại</p>
            <p
              className={`font-bold text-lg ${transactionFacade?.budgetSummary?.totalRemaining >= 0 ? "text-emerald-600" : "text-rose-500"}`}
            >
              {formatShortVND(Math.abs(transactionFacade.budgetSummary?.totalRemaining as number))}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs mb-1">Vượt ngân sách</p>
            <p
              className={`font-bold text-lg ${transactionFacade?.budgetSummary?.overBudgetCount as number > 0 ? "text-rose-500" : "text-emerald-600"}`}
            >
              {transactionFacade?.budgetSummary?.overBudgetCount as number}
            </p>
          </div>
        </div>

        {/* Overall progress bar */}
        {transactionFacade?.budgetSummary?.totalLimit > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 text-sm font-medium">
                Tổng quan tháng {month}/{year}
              </span>
              <span
                className={`text-sm font-semibold ${transactionFacade?.budgetSummary?.overallUsagePercent as number >= 100 ? "text-rose-500" : "text-slate-600"}`}
              >
                {(transactionFacade?.budgetSummary?.overallUsagePercent as number)}%
              </span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${transactionFacade?.budgetSummary?.overallUsagePercent as number >= 1
                  ? "bg-rose-500"
                  : transactionFacade?.budgetSummary?.overallUsagePercent as number >= 0.8
                    ? "bg-amber-400"
                    : "bg-blue-500"
                  }`}
                style={{
                  width: `${Math.min((transactionFacade?.budgetSummary?.overallUsagePercent || 0), 100)}%`,
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-slate-400 text-xs">
                {formatVND(transactionFacade?.budgetSummary?.totalSpent)} đã chi
              </span>
              <span className="text-slate-400 text-xs">
                {formatVND(transactionFacade?.budgetSummary?.totalLimit)} ngân sách
              </span>
            </div>
          </div>
        )}

        {/* Budget cards */}
        {transactionFacade.budgetSummary?.categories?.length === 0 ? (
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
              onClick={() => setOpen(true)}
              className="mt-4 text-blue-600 text-sm font-medium hover:underline"
            >
              Thêm ngân sách
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {transactionFacade.budgetSummary?.categories?.map((b: any) => (
              <div
                key={b.budgetId}
                className={`bg-white rounded-2xl p-5 shadow-sm border transition-all ${b.usagePercent >= 100
                  ? "border-rose-200"
                  : b.usagePercent >= 70
                    ? "border-amber-200"
                    : "border-slate-100"
                  }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-slate-800 text-sm font-semibold">
                        {b.categoryName ?? "Danh mục"}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {formatShortVND(b.limitAmount)} / tháng
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {b.usagePercent >= 100 ? (
                      <AlertTriangle size={14} className="text-rose-500" />
                    ) : b.usagePercent >= 70 ? (
                      <AlertTriangle size={14} className="text-amber-500" />
                    ) : (
                      <CheckCircle size={14} className="text-emerald-500" />
                    )}
                    {/* <button
                    // onClick={() => openEdit(b)}
                    className="p-1 text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    <Edit3 size={13} />
                  </button>
                  <button
                    // onClick={() => handleDelete(b.id)}
                    // disabled={deleting === b.id}
                    className="p-1 text-slate-300 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button> */}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-slate-500">
                      Đã chi: {formatShortVND(b.spentAmount)}
                    </span>
                    <span
                      className={`text-xs font-semibold ${b.usagePercent >= 100 ? "text-rose-500" : b.usagePercent >= 70 ? "text-amber-500" : "text-emerald-600"}`}
                    >
                      {b.usagePercent.toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${b.usagePercent >= 100
                        ? "bg-rose-400"
                        : b.usagePercent >= 70
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                        }`}
                      style={{ width: `${b.usagePercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">
                    {b.remainingAmount >= 0
                      ? `Còn lại: ${formatShortVND(b.remainingAmount)}`
                      : `Vượt: ${formatShortVND(-b.remainingAmount)}`}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatVND(b.limitAmount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {open && (
          <Modal
            title="Thêm ngân sách"
            open={open}
            cancelText="Hủy"
            okText="Thêm"
            onOk={form.submit}
            onCancel={() => setOpen(false)}
          >
            <Form
              form={form}
              onFinish={onAdd}
              layout="vertical"

            >
              <Form.Item rules={[{ required: true, message: "Vui lòng chọn danh mục" }]} label="Danh mục" name="categoryId">
                <Select className="w-full" options={categoryOptions} placeholder='Chọn danh mục' />
              </Form.Item>

              <Form.Item rules={[{ required: true, message: "Vui lòng nhập ngân sách" }]} label="Ngân sách" name="limitAmount">
                <InputNumber style={{ width: '100%' }} controls={false} placeholder='Nhập ngân sách' />
              </Form.Item>

              <Form.Item rules={[{ required: true, message: "Vui lòng nhập ngưỡng cảnh báo" }]} label="Ngưỡng cảnh báo (%)" name="alertThreshold">
                <InputNumber style={{ width: '100%' }} controls={false} placeholder='Nhập ngưỡng cảnh báo' />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    </Spin>
  );
}

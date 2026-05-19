import { formatShortVND } from "../utils/format";

interface Bar {
  label: string;
  income: number;
  expense: number;
}

interface Props {
  data: Bar[];
  height?: number;
}

export function BarChart({ data, height = 200 }: Props) {
  const validData = data ?? [];

  const maxVal = Math.max(
    ...(validData?.flatMap((d) => [d.income, d.expense]) ?? []),
    1,
  );

  return (
    <div className="w-full">
      <div className="flex items-end gap-2 lg:gap-3" style={{ height }}>
        {data?.map((bar, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
          >
            <div
              className="flex items-end gap-0.5 lg:gap-1 w-full justify-center"
              style={{ height: height - 24 }}
            >
              {/* Income bar */}
              <div
                className="flex-1 bg-emerald-400 rounded-t-md transition-all duration-500 hover:bg-emerald-500 cursor-default group relative"
                style={{
                  height: `${(bar.income / maxVal) * 100}%`,
                  minHeight: bar.income > 0 ? 4 : 0,
                }}
                title={`Thu: ${formatShortVND(bar.income)}`}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {formatShortVND(bar.income)}
                </div>
              </div>
              {/* Expense bar */}
              <div
                className="flex-1 bg-rose-400 rounded-t-md transition-all duration-500 hover:bg-rose-500 cursor-default group relative"
                style={{
                  height: `${(bar.expense / maxVal) * 100}%`,
                  minHeight: bar.expense > 0 ? 4 : 0,
                }}
                title={`Chi: ${formatShortVND(bar.expense)}`}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {formatShortVND(bar.expense)}
                </div>
              </div>
            </div>
            <span className="text-slate-400 text-xs truncate w-full text-center">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-3 justify-end">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-emerald-400" />
          <span className="text-xs text-slate-500">Thu nhập</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-rose-400" />
          <span className="text-xs text-slate-500">Chi tiêu</span>
        </div>
      </div>
    </div>
  );
}

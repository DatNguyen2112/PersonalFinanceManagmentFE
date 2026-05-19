import { useEffect } from "react";
import {
  Table,
  Input,
  Select,
  Space,
  Card,
  Tag,
  Typography,
  Row,
  Col,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTransactionsFacade } from "../../store/transactions/facade";
import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";

const { Title, Text } = Typography;

export default function Transactions() {
  const transactionsFacade = useTransactionsFacade();

  useEffect(() => {
    transactionsFacade.getListTransaction({
      page: 1,
      size: 20,
    });
    transactionsFacade.getListCategories();
  }, []);

  const dataSource = transactionsFacade?.listTransactions?.content ?? [];
  const categoryOptions =
    transactionsFacade.listCategories?.map((category: any) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

  const columns = [
    {
      title: "Giao dịch",
      dataIndex: "transactionContent",
      key: "transactionContent",
      width: 250,
      render: (text: string, record: any) => {
        const isIn = record.direction === "IN";
        return (
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl flex items-center justify-center ${isIn ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"}`}
            >
              {isIn ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            </div>
            <Text className="font-semibold text-slate-800 text-sm">
              {text || "Giao dịch không tên"}
            </Text>
          </div>
        );
      },
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
      width: 140,
      render: (text: string) => (
        <Tag color="blue">{text || "Chưa phân loại"}</Tag>
      ),
    },
    {
      title: "Phương thức",
      dataIndex: "bankBrandName",
      key: "bankBrandName",
      width: 150,
      render: (text: string, record: any) => (
        <Space size="small" className="text-slate-500">
          <CreditCard size={14} className="text-slate-400" />
          <span>{text || record.accountNumber || "Ví chính"}</span>
        </Space>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "transactionDate",
      key: "transactionDate",
      width: 160,
      render: (text: string) => {
        if (!text) return "Chưa cập nhật";
        const date = new Date(text);
        return (
          <Text className="text-slate-400 text-sm">
            {date.toLocaleDateString("vi-VN")}{" "}
            {date.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        );
      },
    },
    {
      title: "Số tiền",
      key: "amount",
      align: "right" as const,
      width: 120,
      render: (_: any, record: any) => {
        const isIn = record.direction === "IN";
        const value = record.amountIn;
        return (
          <div
            className={`text-sm font-semibold ${isIn ? "text-emerald-600" : "text-rose-500"}`}
          >
            {isIn ? "+" : "-"}
            {Number(value || 0).toLocaleString("vi-VN")}đ
          </div>
        );
      },
    },
  ];

  return (
    <Space direction="vertical" size="medium" className="w-full">
      {/* Header */}
      <div>
        <Title level={3} className="!mb-1">
          Danh sách giao dịch
        </Title>
        <Text type="secondary">
          Theo dõi và quản lý toàn bộ các giao dịch tài chính của bạn.
        </Text>
      </div>

      {/* Filters Bar */}
      <Card
        className="shadow-sm border-slate-100 rounded-2xl"
        bodyStyle={{ padding: "16px" }}
      >
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col xs={24} md={8}>
            <Input
              placeholder="Tìm kiếm theo số tài khoản"
              prefix={<SearchOutlined className="text-slate-400" />}
              className="w-full py-2 bg-slate-50 hover:bg-white focus:bg-white rounded-xl border-slate-200"
              onChange={(e) => {
                if (e.target.value) {
                  transactionsFacade.getListTransaction({
                    accountNumber: e.target.value,
                    page: 1,
                    size: 20,
                  });
                } else {
                  transactionsFacade.getListTransaction({
                    page: 1,
                    size: 20,
                  });
                }
              }}
            />
          </Col>
          <Col xs={24} md={16} className="flex justify-end gap-3">
            <Select
              showSearch
              allowClear
              className="w-full md:w-48"
              size="medium"
              options={categoryOptions}
              placeholder="Chọn danh mục"
              optionLabelProp="label"
              onChange={(value) => {
                if (value) {
                  transactionsFacade.getListTransaction({
                    categoryId: value,
                    page: 1,
                    size: 20,
                  });
                } else {
                  transactionsFacade.getListTransaction({
                    page: 1,
                    size: 20,
                  });
                }
              }}
            />
          </Col>
        </Row>
      </Card>

      {/* Transactions List - Desktop View */}
      <Card
        className="hidden md:block shadow-sm border-slate-100 rounded-2xl"
        bodyStyle={{ padding: "0px" }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            className: "px-6",
          }}
          loading={transactionsFacade?.isLoading}
          className="custom-antd-table"
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Transactions List - Mobile Card View */}
      <div className="block md:hidden space-y-2">
        {dataSource.map((record: any) => {
          const isIn = record.direction === "IN";
          const value = record.amountIn;
          const date = record.transactionDate
            ? new Date(record.transactionDate)
            : null;
          return (
            <Card
              key={record.id}
              className="shadow-sm border-slate-100 rounded-3xl hover:shadow-md transition-shadow"
              bodyStyle={{ padding: "20px" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-2xl flex items-center justify-center ${isIn ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"}`}
                  >
                    {isIn ? (
                      <ArrowUpRight size={18} />
                    ) : (
                      <ArrowDownRight size={18} />
                    )}
                  </div>
                  <div className="w-full max-w-[200px]">
                    <Text className="font-bold text-slate-800 text-sm block truncate">
                      {record.transactionContent || "Giao dịch không tên"}
                    </Text>
                    <Text type="secondary" className="text-xs">
                      {date
                        ? `${date.toLocaleDateString("vi-VN")} ${date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`
                        : "Chưa cập nhật"}
                    </Text>
                  </div>
                </div>
                <Text
                  className={`font-extrabold text-sm ${isIn ? "text-emerald-500" : "text-slate-800"}`}
                >
                  {isIn ? "+" : "-"}
                  {Number(value || 0).toLocaleString("vi-VN")}đ
                </Text>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                <Tag color="blue" className="rounded-lg m-0">
                  {record.categoryName || "Chưa phân loại"}
                </Tag>
                <Space size={4} className="text-slate-400 text-xs">
                  <CreditCard size={12} />
                  <span>
                    {record.bankBrandName || record.accountNumber || "Ví chính"}
                  </span>
                </Space>
              </div>
            </Card>
          );
        })}
      </div>
    </Space>
  );
}

import { Card, Button, Row, Col, Typography, Space, Tag } from "antd";
import {
  PlusOutlined,
  SyncOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { CreditCard, Wallet as WalletIcon } from "lucide-react";
import { useTransactionsFacade } from "../../store/transactions/facade";
import { useEffect } from "react";

const { Title, Text } = Typography;

export default function Wallets() {
  const transactionFacade = useTransactionsFacade();

  useEffect(() => {
    transactionFacade.getAccounts();
  }, []);

  return (
    <Space direction="vertical" size="large" className="w-full">
      {/* Header */}
      <Row align="middle" justify="space-between" gutter={[16, 16]}>
        <Col>
          <Title level={3} className="!mb-1">
            Danh sách ví & tài khoản
          </Title>
          <Text type="secondary">
            Quản lý các nguồn tiền mặt, thẻ ngân hàng và ví điện tử của bạn.
          </Text>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="bg-blue-600 hover:bg-blue-700 border-none rounded-xl shadow-lg shadow-blue-600/25 font-semibold"
          >
            Thêm tài khoản mới
          </Button>
        </Col>
      </Row>

      {/* List of Wallets/Cards */}
      <Row gutter={[24, 24]}>
        {transactionFacade.accounts?.map((account, index) => (
          <Col xs={24} md={8} key={index}>
            <div
              className={`p-6 rounded-3xl text-white bg-gradient-to-br shadow-lg relative overflow-hidden flex flex-col justify-between h-48 group hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex justify-between items-start">
                <Space direction="vertical" size={2}>
                  <Text className="text-white opacity-85 text-xs font-semibold tracking-wider uppercase">
                    {account.displayName}
                  </Text>
                  <Text className="text-white opacity-60 text-[10px]">
                    {account.bankBrandName}
                  </Text>
                </Space>
                <CheckCircleFilled className="text-white opacity-80 text-lg" />
              </div>

              <div className="flex justify-between items-center text-xs opacity-75 border-t border-white/10 pt-2">
                <span>{account.accountNumber}</span>
                <Tag
                  color="rgba(255, 255, 255, 0.15)"
                  className="border-none text-white rounded-md text-[10px] uppercase tracking-wider font-semibold m-0"
                >
                  {wallet.brand}
                </Tag>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Quick Actions / Linked accounts summary */}
      <Card
        className="shadow-sm border-slate-100 rounded-2xl"
        bodyStyle={{ padding: "24px" }}
      >
        <Row align="middle" justify="space-between" gutter={[24, 16]}>
          <Col xs={24} lg={18}>
            <Space direction="vertical" size={4}>
              <Text className="text-slate-800 font-bold text-base">
                Đồng bộ tài khoản
              </Text>
              <Text type="secondary" className="text-sm">
                Các tài khoản ngân hàng và ví điện tử của bạn được kết nối an
                toàn để tự động cập nhật số dư và lịch sử giao dịch mỗi 15 phút.
              </Text>
            </Space>
          </Col>
          <Col xs={24} lg={6} className="text-right">
            <Button
              icon={<SyncOutlined />}
              size="large"
              className="border-slate-200 text-slate-600 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors w-full sm:w-auto"
            >
              Đồng bộ ngay
            </Button>
          </Col>
        </Row>
      </Card>
    </Space>
  );
}

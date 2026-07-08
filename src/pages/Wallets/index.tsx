import { Button, Row, Col, Typography, Space, Tag } from "antd";
import {
    PlusOutlined,
    CheckCircleFilled,
} from "@ant-design/icons";
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
                        size="medium"
                        className="bg-blue-600 hover:bg-blue-700 border-none rounded-xl shadow-lg shadow-blue-600/25 font-semibold"
                    >
                        Thêm tài khoản mới
                    </Button>
                </Col>
            </Row>

            {/* List of Wallets/Cards */}
            <Row gutter={[24, 24]}>
                {transactionFacade.accounts?.map((account: any, index: number) => (
                    <Col xs={24} md={8} key={index}>
                        <div
                            className={`p-6 rounded-3xl text-white bg-gradient-to-br shadow-lg bg-[#722ED1] relative overflow-hidden flex flex-col justify-between h-48 group hover:shadow-xl transition-all duration-300`}
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
                                    {account.bankBrandName}
                                </Tag>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Space>
    );
}

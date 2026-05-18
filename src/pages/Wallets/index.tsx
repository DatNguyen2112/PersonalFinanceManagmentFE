import { Card, Button, Row, Col, Typography, Space, Tag } from 'antd';
import { PlusOutlined, SyncOutlined, CheckCircleFilled } from '@ant-design/icons';
import { CreditCard, Wallet as WalletIcon } from 'lucide-react';

const { Title, Text } = Typography;

export default function Wallets() {
    const walletList = [
        {
            name: 'Ví chính (Momo)',
            type: 'Ví điện tử',
            balance: '$8,450.00',
            details: 'Liên kết: 098****211',
            brand: 'Momo Pay',
            gradient: 'from-pink-500 to-rose-600',
            icon: <WalletIcon size={48} className="opacity-15" />,
        },
        {
            name: 'Thẻ Vietcombank',
            type: 'Tài khoản ngân hàng',
            balance: '$4,030.00',
            details: 'Số thẻ: **** 8892',
            brand: 'VCB Visa',
            gradient: 'from-blue-600 to-indigo-700',
            icon: <CreditCard size={48} className="opacity-15" />,
        },
        {
            name: 'Tiền mặt',
            type: 'Tiền mặt',
            balance: '$350.00',
            details: 'Ví tay',
            brand: 'Cash',
            gradient: 'from-slate-700 to-slate-800',
            icon: <WalletIcon size={48} className="opacity-15" />,
        },
    ];

    return (
        <Space direction="vertical" size="large" className="w-full">
            {/* Header */}
            <Row align="middle" justify="space-between" gutter={[16, 16]}>
                <Col>
                    <Title level={3} className="!mb-1">Danh sách ví & tài khoản</Title>
                    <Text type="secondary">Quản lý các nguồn tiền mặt, thẻ ngân hàng và ví điện tử của bạn.</Text>
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
                {walletList.map((wallet, index) => (
                    <Col xs={24} md={8} key={index}>
                        <div className={`p-6 rounded-3xl text-white bg-gradient-to-br ${wallet.gradient} shadow-lg relative overflow-hidden flex flex-col justify-between h-48 group hover:shadow-xl transition-all duration-300`}>
                            {/* Background icon decoration */}
                            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-300">
                                {wallet.icon}
                            </div>

                            <div className="flex justify-between items-start">
                                <Space direction="vertical" size={2}>
                                    <Text className="text-white opacity-85 text-xs font-semibold tracking-wider uppercase">
                                        {wallet.name}
                                    </Text>
                                    <Text className="text-white opacity-60 text-[10px]">
                                        {wallet.type}
                                    </Text>
                                </Space>
                                <CheckCircleFilled className="text-white opacity-80 text-lg" />
                            </div>

                            <div className="space-y-1">
                                <span className="text-[10px] uppercase tracking-widest opacity-60">Số dư hiện tại</span>
                                <h3 className="text-3xl font-bold tracking-tight">{wallet.balance}</h3>
                            </div>

                            <div className="flex justify-between items-center text-xs opacity-75 border-t border-white/10 pt-2">
                                <span>{wallet.details}</span>
                                <Tag color="rgba(255, 255, 255, 0.15)" className="border-none text-white rounded-md text-[10px] uppercase tracking-wider font-semibold m-0">
                                    {wallet.brand}
                                </Tag>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Quick Actions / Linked accounts summary */}
            <Card className="shadow-sm border-slate-100 rounded-2xl" bodyStyle={{ padding: '24px' }}>
                <Row align="middle" justify="space-between" gutter={[24, 16]}>
                    <Col xs={24} lg={18}>
                        <Space direction="vertical" size={4}>
                            <Text className="text-slate-800 font-bold text-base">Đồng bộ tài khoản</Text>
                            <Text type="secondary" className="text-sm">
                                Các tài khoản ngân hàng và ví điện tử của bạn được kết nối an toàn để tự động cập nhật số dư và lịch sử giao dịch mỗi 15 phút.
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

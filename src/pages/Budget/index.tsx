import { Card, Row, Col, Typography, Progress, Button, Space, Alert, Tag } from 'antd';
import { PlusOutlined, BulbOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { PieChart, TrendingUp } from 'lucide-react';

const { Title, Text } = Typography;

export default function Budget() {
    const budgetList = [
        {
            name: 'Ăn uống & Tiệc tùng',
            spent: 350.00,
            limit: 500.00,
            pct: 70,
            strokeColor: '#3b82f6',
            statusText: 'Còn lại $150.00',
            statusType: 'info' as const,
        },
        {
            name: 'Mua sắm thiết bị',
            spent: 420.00,
            limit: 400.00,
            pct: 105,
            strokeColor: '#f43f5e',
            statusText: 'Vượt hạn mức $20.00',
            statusType: 'error' as const,
        },
        {
            name: 'Di chuyển & Xăng xe',
            spent: 80.00,
            limit: 150.00,
            pct: 53,
            strokeColor: '#10b981',
            statusText: 'Còn lại $70.00',
            statusType: 'success' as const,
        },
    ];

    return (
        <Space direction="vertical" size="large" className="w-full">
            {/* Header */}
            <Row align="middle" justify="space-between" gutter={[16, 16]}>
                <Col>
                    <Title level={3} className="!mb-1">Quản lý ngân sách</Title>
                    <Text type="secondary">Thiết lập giới hạn chi tiêu để bảo đảm kế hoạch tài chính luôn đúng hướng.</Text>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        className="bg-blue-600 hover:bg-blue-700 border-none rounded-xl shadow-lg shadow-blue-600/25 font-semibold"
                    >
                        Tạo ngân sách
                    </Button>
                </Col>
            </Row>

            {/* Budget Progress Grid */}
            <Row gutter={[24, 24]}>
                {budgetList.map((b, i) => (
                    <Col xs={24} md={8} key={i}>
                        <Card
                            className="shadow-sm border-slate-100 rounded-2xl hover:shadow-md transition-shadow duration-300 h-full"
                            bodyStyle={{ padding: '24px' }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <Text className="font-bold text-slate-800 text-base">{b.name}</Text>
                                <Tag color={b.pct > 100 ? 'error' : 'processing'} className="border-none rounded-lg font-semibold m-0 px-2 py-0.5">
                                    {b.pct}%
                                </Tag>
                            </div>

                            <Space direction="vertical" size="small" className="w-full mb-4">
                                <div className="flex justify-between text-sm text-slate-400">
                                    <span>Đã chi: <strong className="text-slate-700">${b.spent.toFixed(2)}</strong></span>
                                    <span>Hạn mức: ${b.limit.toFixed(2)}</span>
                                </div>
                                <Progress
                                    percent={b.pct}
                                    strokeColor={b.strokeColor}
                                    trailColor="#f1f5f9"
                                    showInfo={false}
                                    strokeWidth={8}
                                    className="m-0"
                                />
                            </Space>

                            <Alert
                                message={b.statusText}
                                type={b.statusType}
                                showIcon
                                className="rounded-xl border-none py-1.5"
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Smart Advice and Savings Goal */}
            <Row gutter={[24, 24]}>
                {/* Advice Card */}
                <Col xs={24} lg={12}>
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl space-y-4 relative overflow-hidden h-full flex flex-col justify-between">
                        <div className="absolute right-0 bottom-0 opacity-10 translate-x-6 translate-y-6">
                            <PieChart size={200} />
                        </div>
                        <div className="space-y-3">
                            <Space align="center" size={8}>
                                <BulbOutlined className="text-xl" />
                                <h3 className="text-lg font-bold text-white m-0">Gợi ý tiết kiệm thông minh</h3>
                            </Space>
                            <p className="text-blue-100 text-sm leading-relaxed m-0">
                                Bạn đang chi tiêu nhiều hơn thường lệ ở danh mục <strong>Ăn uống & Tiệc tùng</strong>. Hãy thử cắt bớt các bữa ăn ngoài vào cuối tuần để giữ ngân sách của bạn an toàn cho đến cuối tháng này.
                            </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-blue-200 border-t border-white/10 pt-4 mt-2">
                            <TrendingUp size={14} />
                            <span>Tiết kiệm dự kiến: +$50.00</span>
                        </div>
                    </div>
                </Col>

                {/* Savings goal progress */}
                <Col xs={24} lg={12}>
                    <Card
                        title={<span className="font-bold text-slate-800 text-base">Mục tiêu mua xe ô tô</span>}
                        className="shadow-sm border-slate-100 rounded-2xl h-full"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <Space direction="vertical" size="middle" className="w-full">
                            <div className="flex justify-between items-center text-sm">
                                <Text type="secondary">Tiến độ tiết kiệm</Text>
                                <Text className="font-bold text-slate-800">$12,000 / $20,000</Text>
                            </div>
                            <Progress
                                percent={60}
                                strokeColor="#3b82f6"
                                trailColor="#f1f5f9"
                                strokeWidth={12}
                                className="m-0"
                            />
                            <Space className="text-xs text-slate-400 mt-2">
                                <ClockCircleOutlined />
                                <span>Dự kiến hoàn thành trong 8 tháng tới</span>
                            </Space>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </Space>
    );
}

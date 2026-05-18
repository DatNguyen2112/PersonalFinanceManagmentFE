import { Card, Row, Col, Typography, Progress, Button, Space, Statistic } from 'antd';
import { DownloadOutlined, ArrowUpOutlined, ArrowDownOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function Reports() {
    const categories = [
        { name: 'Ăn uống', amount: '$540.00', pct: 35, strokeColor: '#3b82f6' },
        { name: 'Nhà ở & Tiện ích', amount: '$450.00', pct: 25, strokeColor: '#6366f1' },
        { name: 'Mua sắm thiết bị', amount: '$320.00', pct: 18, strokeColor: '#f43f5e' },
        { name: 'Giải trí & Du lịch', amount: '$210.00', pct: 12, strokeColor: '#f59e0b' },
        { name: 'Khác', amount: '$180.00', pct: 10, strokeColor: '#94a3b8' },
    ];

    const chartCols = [
        { month: 'T12', income: 64, expense: 48 },
        { month: 'T01', income: 80, expense: 56 },
        { month: 'T02', income: 72, expense: 64 },
        { month: 'T03', income: 96, expense: 60 },
        { month: 'T04', income: 88, expense: 72 },
        { month: 'T05', income: 100, expense: 68 },
    ];

    return (
        <Space direction="vertical" size="large" className="w-full">
            {/* Header */}
            <Row align="middle" justify="space-between" gutter={[16, 16]}>
                <Col>
                    <Title level={3} className="!mb-1">Báo cáo phân tích</Title>
                    <Text type="secondary">Xem biểu đồ trực quan, phân tích xu hướng thu chi trong tháng.</Text>
                </Col>
                <Col>
                    <Button
                        icon={<DownloadOutlined />}
                        size="large"
                        className="border-slate-200 text-slate-600 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors"
                    >
                        Xuất báo cáo (PDF)
                    </Button>
                </Col>
            </Row>

            {/* Quick Metrics */}
            <Row gutter={[24, 24]}>
                {[
                    { label: 'Tổng chi tiêu', amount: 1850, change: -4, prefix: <ArrowDownOutlined className="text-emerald-500" />, suffix: '%', desc: 'Giảm so với tháng trước', color: 'text-emerald-500' },
                    { label: 'Tổng thu nhập', amount: 3200, change: 8, prefix: <ArrowUpOutlined className="text-emerald-500" />, suffix: '%', desc: 'Tăng so với tháng trước', color: 'text-emerald-500' },
                    { label: 'Số dư tích lũy', amount: 1350, change: 12, prefix: <ArrowUpOutlined className="text-emerald-500" />, suffix: '%', desc: 'Tăng so với tháng trước', color: 'text-emerald-500' },
                ].map((metric, i) => (
                    <Col xs={24} md={8} key={i}>
                        <Card className="shadow-sm border-slate-100 rounded-2xl" bodyStyle={{ padding: '24px' }}>
                            <Statistic
                                title={<span className="text-slate-400 font-medium text-sm">{metric.label}</span>}
                                value={metric.amount}
                                precision={2}
                                prefix="$"
                                valueStyle={{ color: '#1e293b', fontWeight: 'bold', fontSize: '24px' }}
                            />
                            <div className="flex items-center gap-1 mt-2">
                                {metric.prefix}
                                <span className={`${metric.color} text-xs font-semibold`}>
                                    {Math.abs(metric.change)}{metric.suffix}
                                </span>
                                <span className="text-slate-400 text-xs">{metric.desc}</span>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Analytics Visual Section */}
            <Row gutter={[24, 24]}>
                {/* Spending by Category */}
                <Col xs={24} lg={12}>
                    <Card
                        title={<span className="font-bold text-slate-800 text-base">Cơ cấu chi tiêu</span>}
                        extra={
                            <Space className="text-xs text-slate-400">
                                <CalendarOutlined />
                                <span>Tháng này</span>
                            </Space>
                        }
                        className="shadow-sm border-slate-100 rounded-2xl h-full"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <div className="space-y-5">
                            {categories.map((cat, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between items-center text-sm">
                                        <Text className="text-slate-600 font-medium">{cat.name}</Text>
                                        <Text className="text-slate-800 font-bold">{cat.amount}</Text>
                                    </div>
                                    <Progress
                                        percent={cat.pct}
                                        strokeColor={cat.strokeColor}
                                        trailColor="#f1f5f9"
                                        showInfo={true}
                                        strokeWidth={8}
                                        className="m-0"
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>

                {/* Net Cashflow Trends */}
                <Col xs={24} lg={12}>
                    <Card
                        title={<span className="font-bold text-slate-800 text-base">Biến động dòng tiền ròng</span>}
                        extra={
                            <Space className="text-xs text-slate-400">
                                <CalendarOutlined />
                                <span>6 tháng qua</span>
                            </Space>
                        }
                        className="shadow-sm border-slate-100 rounded-2xl h-full"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <div className="flex flex-col justify-between h-72">
                            {/* Visual columns mockup using pure CSS flex rows */}
                            <div className="flex-1 flex items-end justify-between px-4 pb-4 border-b border-l border-slate-100">
                                {chartCols.map((col, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 w-10">
                                        <div className="flex items-end gap-1.5 h-44 w-full justify-center">
                                            <div
                                                className="w-3 bg-blue-500 rounded-t-sm transition-all duration-500 hover:opacity-85"
                                                style={{ height: `${col.income * 0.9}%` }}
                                            />
                                            <div
                                                className="w-3 bg-rose-400 rounded-t-sm transition-all duration-500 hover:opacity-85"
                                                style={{ height: `${col.expense * 0.9}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-medium">{col.month}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center gap-6 text-xs pt-4">
                                <Space align="center" size={6}>
                                    <span className="w-3 h-3 bg-blue-500 rounded-full inline-block" />
                                    <span className="text-slate-500 font-medium">Thu nhập</span>
                                </Space>
                                <Space align="center" size={6}>
                                    <span className="w-3 h-3 bg-rose-400 rounded-full inline-block" />
                                    <span className="text-slate-500 font-medium">Chi tiêu</span>
                                </Space>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Space>
    );
}

import { Card, Row, Col, Typography, Space, Statistic, List } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet as WalletIcon, CreditCard, Activity, TrendingUp } from 'lucide-react';

const { Title, Text } = Typography;

export default function Dashboard() {
    const recentActivities = [
        { name: 'Mua sắm siêu thị', category: 'Ăn uống', amount: '-$120.00', date: 'Hôm nay, 14:32', icon: <CreditCard size={18} />, color: 'bg-rose-50 text-rose-500', isIncome: false },
        { name: 'Lương tháng 5', category: 'Thu nhập', amount: '+$3,200.00', date: '15 Th05, 08:00', icon: <DollarSign size={18} />, color: 'bg-emerald-50 text-emerald-500', isIncome: true },
        { name: 'Thanh toán tiền điện', category: 'Dịch vụ', amount: '-$85.00', date: '12 Th05, 19:15', icon: <Activity size={18} />, color: 'bg-amber-50 text-amber-500', isIncome: false },
    ];

    const walletList = [
        { name: 'Ví chính (Momo)', balance: '$8,450.00', color: 'from-pink-500 to-rose-500', brand: 'Momo Pay' },
        { name: 'Thẻ Vietcombank', balance: '$4,030.00', color: 'from-blue-600 to-indigo-600', brand: 'VCB Visa' },
    ];

    return (
        <Space direction="vertical" size="large" className="w-full">
            {/* Page Header */}
            <div>
                <Title level={3} className="!mb-1">Tổng quan tài chính</Title>
                <Text type="secondary">Chào mừng bạn quay trở lại. Đây là báo cáo tài chính tổng quan của bạn.</Text>
            </div>

            {/* Stats Grid */}
            <Row gutter={[24, 24]}>
                {/* Total Balance */}
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm border-slate-100 rounded-2xl h-full hover:shadow-md transition-shadow duration-300" bodyStyle={{ padding: '24px' }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <Statistic
                                    title={<span className="text-slate-400 font-medium text-sm">Tổng số dư</span>}
                                    value={12480.00}
                                    precision={2}
                                    prefix="$"
                                    valueStyle={{ color: '#1e293b', fontWeight: 'bold', fontSize: '22px' }}
                                />
                                <div className="flex items-center gap-1 mt-1 text-emerald-500 text-xs font-semibold">
                                    <ArrowUpOutlined />
                                    <span>+2.5% tháng này</span>
                                </div>
                            </div>
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                <DollarSign size={22} />
                            </div>
                        </div>
                    </Card>
                </Col>

                {/* Monthly Income */}
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm border-slate-100 rounded-2xl h-full hover:shadow-md transition-shadow duration-300" bodyStyle={{ padding: '24px' }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <Statistic
                                    title={<span className="text-slate-400 font-medium text-sm">Thu nhập</span>}
                                    value={3200.00}
                                    precision={2}
                                    prefix="$"
                                    valueStyle={{ color: '#1e293b', fontWeight: 'bold', fontSize: '22px' }}
                                />
                                <div className="flex items-center gap-1 mt-1 text-emerald-500 text-xs font-semibold">
                                    <ArrowUpOutlined />
                                    <span>+12.4% tuần này</span>
                                </div>
                            </div>
                            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                                <ArrowUpRight size={22} />
                            </div>
                        </div>
                    </Card>
                </Col>

                {/* Monthly Expense */}
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm border-slate-100 rounded-2xl h-full hover:shadow-md transition-shadow duration-300" bodyStyle={{ padding: '24px' }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <Statistic
                                    title={<span className="text-slate-400 font-medium text-sm">Chi tiêu</span>}
                                    value={1850.00}
                                    precision={2}
                                    prefix="$"
                                    valueStyle={{ color: '#1e293b', fontWeight: 'bold', fontSize: '22px' }}
                                />
                                <div className="flex items-center gap-1 mt-1 text-rose-500 text-xs font-semibold">
                                    <ArrowDownOutlined />
                                    <span>-4.2% hôm nay</span>
                                </div>
                            </div>
                            <div className="p-4 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
                                <ArrowDownRight size={22} />
                            </div>
                        </div>
                    </Card>
                </Col>

                {/* Monthly Savings */}
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm border-slate-100 rounded-2xl h-full hover:shadow-md transition-shadow duration-300" bodyStyle={{ padding: '24px' }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <Statistic
                                    title={<span className="text-slate-400 font-medium text-sm">Tiết kiệm</span>}
                                    value={1350.00}
                                    precision={2}
                                    prefix="$"
                                    valueStyle={{ color: '#1e293b', fontWeight: 'bold', fontSize: '22px' }}
                                />
                                <div className="flex items-center gap-1 mt-1 text-emerald-500 text-xs font-semibold">
                                    <ArrowUpOutlined />
                                    <span>Đạt 90% mục tiêu</span>
                                </div>
                            </div>
                            <div className="p-4 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
                                <TrendingUp size={22} />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Detail Charts and Activities mockups */}
            <Row gutter={[24, 24]}>
                {/* Recent Activities */}
                <Col xs={24} lg={16}>
                    <Card
                        title={<span className="font-bold text-slate-800 text-base">Hoạt động gần đây</span>}
                        className="shadow-sm border-slate-100 rounded-2xl h-full"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <List
                            dataSource={recentActivities}
                            renderItem={(act) => (
                                <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all duration-150 mb-2 last:mb-0">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 ${act.color} rounded-xl flex items-center justify-center`}>
                                            {act.icon}
                                        </div>
                                        <div>
                                            <Text className="font-semibold text-slate-800 text-sm block">{act.name}</Text>
                                            <Text type="secondary" className="text-xs">{act.category} • {act.date}</Text>
                                        </div>
                                    </div>
                                    <Text className={`font-bold text-sm ${act.isIncome ? 'text-emerald-500' : 'text-slate-800'}`}>
                                        {act.amount}
                                    </Text>
                                </div>
                            )}
                        />
                    </Card>
                </Col>

                {/* My Wallets List */}
                <Col xs={24} lg={8}>
                    <Card
                        title={<span className="font-bold text-slate-800 text-base">Ví của tôi</span>}
                        className="shadow-sm border-slate-100 rounded-2xl h-full"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <div className="space-y-4">
                            {walletList.map((w, i) => (
                                <div key={i} className={`p-5 rounded-2xl bg-gradient-to-br ${w.color} text-white shadow-sm space-y-3 relative overflow-hidden group hover:shadow-md transition-shadow duration-300`}>
                                    <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-300">
                                        <WalletIcon size={120} />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs opacity-80">{w.name}</span>
                                        <CreditCard size={16} />
                                    </div>
                                    <h4 className="text-2xl font-bold tracking-tight text-white m-0">{w.balance}</h4>
                                    <div className="flex justify-between items-center text-[10px] opacity-60 border-t border-white/10 pt-2">
                                        <span>**** **** **** 8892</span>
                                        <span>{w.brand}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </Space>
    );
}

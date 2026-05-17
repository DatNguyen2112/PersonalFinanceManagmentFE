import { Wallet, Mail, Lock, Loader, UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { routerLinks } from '../../router-links';
import { useGlobalFacade } from '../../store/global/facade';
import { useEffect, useState } from 'react';
import { EStatusGlobal } from '../../store/global/slice';
import { customMessage } from '../../main';

export default function RegisterPage() {
    const navigate = useNavigate();
    const globalFacade = useGlobalFacade();
    const { register } = globalFacade;


    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (globalFacade.status === EStatusGlobal.registerFulfilled) {
            navigate(`${routerLinks('Login')}`);
        }
    }, [globalFacade.status])

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            customMessage.error({ content: 'Vui lòng nhập đầy đủ thông tin' });
            return;
        }

        if (password !== confirmPassword) {
            customMessage.error({ content: 'Mật khẩu không khớp' });
            return;
        }

        const body = {
            username,
            email,
            password,
            firstName: '',
            lastName: '',
            phoneNumber: '',
        };
        register(body);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50 flex items-center justify-center p-4">
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    {/* Header */}
                    <div className="px-8 pt-10 pb-6 text-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-600/30">
                            <Wallet size={24} className="text-white" />
                        </div>
                        <h1 className="text-slate-900 text-2xl font-bold">Tạo tài khoản</h1>
                        <p className="text-slate-400 text-sm mt-1">Bắt đầu quản lý tài chính hôm nay</p>
                    </div>

                    {/* Form */}
                    <form className="px-8 py-6 space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wide mb-2">Email</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                                <input
                                    type="text"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Email của bạn"
                                    disabled={globalFacade.isLoading}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 text-sm outline-none focus:border-emerald-300 focus:bg-white transition-all disabled:opacity-50"
                                />
                            </div>
                        </div>

                        {/* User name */}
                        <div>
                            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wide mb-2">Tên tài khoản</label>
                            <div className="relative">
                                <UserIcon size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder="Tên tài khoản của bạn"
                                    disabled={globalFacade.isLoading}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 text-sm outline-none focus:border-emerald-300 focus:bg-white transition-all disabled:opacity-50"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wide mb-2">Mật khẩu</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    disabled={globalFacade.isLoading}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 text-sm outline-none focus:border-emerald-300 focus:bg-white transition-all disabled:opacity-50"
                                />
                            </div>
                            <p className="text-slate-400 text-xs mt-1">Tối thiểu 6 ký tự</p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wide mb-2">Xác nhận mật khẩu</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    disabled={globalFacade.isLoading}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 text-sm outline-none focus:border-emerald-300 focus:bg-white transition-all disabled:opacity-50"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            onClick={handleRegister}
                            disabled={globalFacade.isLoading}
                            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-600/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {globalFacade.isLoading ? (
                                <>
                                    <Loader size={16} className="animate-spin" />
                                    Đang tạo tài khoản...
                                </>
                            ) : (
                                'Đăng ký'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 text-center">
                        <p className="text-slate-500 text-sm">
                            Đã có tài khoản?{' '}
                            <button
                                type="button"
                                onClick={() => {
                                    navigate(`${routerLinks('Login')}`);
                                }}
                                disabled={globalFacade.isLoading}
                                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors disabled:opacity-50"
                            >
                                Đăng nhập
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
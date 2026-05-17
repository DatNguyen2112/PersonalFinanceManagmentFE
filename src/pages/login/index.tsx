import { Wallet, Mail, Lock, Loader, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { routerLinks } from '../../router-links';
import { useGlobalFacade } from '../../store/global/facade';
import { useEffect, useState } from 'react';
import { EStatusGlobal } from '../../store/global/slice';

export default function Login() {
    const [userName, setUserName] = useState<any>('');
    const [passWord, setPassWord] = useState<any>('');

    const navigate = useNavigate();
    const globalFacade = useGlobalFacade();
    const { login } = globalFacade;

    useEffect(() => {
        if (globalFacade.status === EStatusGlobal.loginFulfilled) {
            navigate(`${routerLinks('Login')}`);
        }
    }, [globalFacade.status]);

    const handleLogin = () => {
        login({
            username: userName,
            password: passWord,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center p-4">
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    {/* Header */}
                    <div className="px-8 pt-10 pb-6 text-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-600/30">
                            <Wallet size={24} className="text-white" />
                        </div>
                        <h1 className="text-slate-900 text-2xl font-bold">FinanceApp</h1>
                        <p className="text-slate-400 text-sm mt-1">Quản lý tài chính cá nhân</p>
                    </div>

                    {/* Form */}
                    <form className="px-8 py-6 space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wide mb-2">Username</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                    placeholder="Nhập Username"
                                    disabled={globalFacade.isLoading}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 text-sm outline-none focus:border-blue-300 focus:bg-white transition-all disabled:opacity-50"
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
                                    value={passWord}
                                    onChange={e => setPassWord(e.target.value)}
                                    placeholder="••••••••"
                                    disabled={globalFacade.isLoading}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 text-sm outline-none focus:border-blue-300 focus:bg-white transition-all disabled:opacity-50"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleLogin}
                            type="submit"
                            disabled={globalFacade.isLoading}
                            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {globalFacade.isLoading ? (
                                <>
                                    <Loader size={16} className="animate-spin" />
                                    Đang đăng nhập...
                                </>
                            ) : (
                                <>
                                    <Wallet size={16} />
                                    Đăng nhập
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 text-center">
                        <p className="text-slate-500 text-sm">
                            Chưa có tài khoản?{' '}
                            <button
                                type="button"
                                onClick={() => {
                                    navigate(`${routerLinks('Register')}`);
                                }}
                                disabled={globalFacade.isLoading}
                                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors disabled:opacity-50"
                            >
                                Đăng ký
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
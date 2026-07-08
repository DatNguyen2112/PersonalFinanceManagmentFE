import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  BarChart2,
  Wallet,
  ChevronRight,
  Search,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { routerLinks } from "../../router-links";
import { useGlobalFacade } from "../../store/global/facade";
import NotificationBell from "../../components/NotificationBell";
import { keyToken } from "../../variable";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    path: routerLinks("Dashboard"),
    label: "Tổng quan",
    icon: <LayoutDashboard size={20} />,
  },
  {
    path: routerLinks("Transactions"),
    label: "Giao dịch",
    icon: <ArrowLeftRight size={20} />,
  },
  {
    path: routerLinks("Budget"),
    label: "Ngân sách",
    icon: <PieChart size={20} />,
  },
  {
    path: routerLinks("Reports"),
    label: "Báo cáo",
    icon: <BarChart2 size={20} />,
  },
  {
    path: routerLinks("Wallets"),
    label: "Ví tiền",
    icon: <Wallet size={20} />,
  },
];

interface Props {
  onLogout?: () => Promise<void>;
  userEmail?: string;
  children?: React.ReactNode;
}

export default function Layout({ onLogout, userEmail, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const globalFacade = useGlobalFacade();
  const profile = globalFacade.profileUser;

  const currentUserEmail =
    userEmail ||
    profile?.email ||
    profile?.username ||
    profile?.userName ||
    "user@example.com";
  const displayName =
    profile?.name ||
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    profile?.username ||
    profile?.userName ||
    currentUserEmail.split("@")[0];
  const avatarInitial = (displayName || currentUserEmail)
    .charAt(0)
    .toUpperCase();

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    } else {
      await globalFacade.logout();
      navigate(routerLinks("Login"));
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 flex flex-col
          transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700/50">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Wallet size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm leading-tight">
              FinanceApp
            </h1>
            <p className="text-slate-400 text-xs">Quản lý tài chính</p>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider px-3 mb-3">
            Menu
          </p>
          {navItems.map((item) => {
            const active =
              location.pathname === item.path ||
              (item.path !== "/" &&
                location.pathname.startsWith(item.path + "/"));
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-150 group relative
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <span
                  className={`transition-transform duration-150 ${active ? "scale-110" : "group-hover:scale-105"}`}
                >
                  {item.icon}
                </span>
                {item.label}
                {active && (
                  <ChevronRight size={14} className="ml-auto opacity-60" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="px-3 py-4 border-t border-slate-700/50 relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 cursor-pointer transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
              {avatarInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-sm font-medium truncate">
                {displayName}
              </p>
              <p className="text-slate-500 text-xs truncate">
                {currentUserEmail}
              </p>
            </div>
            <ChevronRight
              size={14}
              className={`text-slate-400 transition-transform ${showProfile ? "rotate-90" : ""}`}
            />
          </button>

          {showProfile && (
            <div className="mt-1.5 px-3 py-2 rounded-lg bg-slate-800/60 space-y-2">
              {profile?.phoneNumber && (
                <p className="text-slate-400 text-xs truncate">
                  <span className="text-slate-500">SĐT:</span>{" "}
                  {profile.phoneNumber}
                </p>
              )}
              {profile?.role && (
                <p className="text-slate-400 text-xs truncate">
                  <span className="text-slate-500">Vai trò:</span>{" "}
                  {profile.role}
                </p>
              )}
              <button
                onClick={async () => {
                  setShowProfile(false);
                  await handleLogout();
                }}
                className="w-full flex items-center gap-2 px-1 py-1 text-slate-300 hover:text-slate-100 text-xs font-medium transition-colors"
              >
                <LogOut size={14} />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-100 px-4 lg:px-8 py-4 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

          <div>
            <h2 className="text-slate-800 font-semibold text-lg leading-tight">
              {navItems.find(
                (n) =>
                  location.pathname === n.path ||
                  (n.path !== "/" &&
                    location.pathname.startsWith(n.path + "/")),
              )?.label || "Tổng quan"}
            </h2>
            <p className="text-slate-400 text-xs">
              {new Intl.DateTimeFormat("vi-VN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date())}
            </p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 w-56">
              <Search size={14} className="text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none w-full"
                readOnly
              />
            </div>
            <NotificationBell
              userId={profile?.id}
              token={localStorage.getItem(keyToken)}
            />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

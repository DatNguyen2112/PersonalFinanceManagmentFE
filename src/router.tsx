import { Spin } from "antd";
import React, { type FC, Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { routerLinks } from "./router-links";
import NonAuthLayout from "./layout/auth";
import ProtectedLayout from "./layout/ProtectedLayout";

const normalizePath = (path: string) => path?.trim().replace(/^\/+/, "") ?? "";

const LazyWithSuspense: FC<{ component: FC }> = ({ component: Component }) => (
  <Suspense
    fallback={
      <Spin>
        <div className="!w-screen !h-screen" />
      </Spin>
    }
  >
    <Component />
  </Suspense>
);

// Keep lazy components at module scope to avoid remounting pages on parent re-renders.
const LoginPage = React.lazy(() => import("./pages/login"));
const RegisterPage = React.lazy(() => import("./pages/register"));
const DashboardPage = React.lazy(() => import("./pages/Dashboard"));
const TransactionsPage = React.lazy(() => import("./pages/Transactions"));
const BudgetPage = React.lazy(() => import("./pages/Budget"));
const ReportsPage = React.lazy(() => import("./pages/Reports"));
const WalletsPage = React.lazy(() => import("./pages/Wallets"));

const Pages: FC = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={<Navigate to={routerLinks("Login")} replace />}
      />

      {/* Non-auth layout (login/register) */}
      <Route element={<NonAuthLayout>{<Outlet />}</NonAuthLayout>}>
        <Route
          path={normalizePath(routerLinks("Login"))}
          element={<LazyWithSuspense component={LoginPage} />}
        />
        <Route
          path={normalizePath(routerLinks("Register"))}
          element={<LazyWithSuspense component={RegisterPage} />}
        />
      </Route>

      {/* Auth layout (protected) */}
      <Route element={<ProtectedLayout>{<Outlet />}</ProtectedLayout>}>
        <Route
          path={normalizePath(routerLinks("Dashboard"))}
          element={<LazyWithSuspense component={DashboardPage} />}
        />
        <Route
          path={normalizePath(routerLinks("Transactions"))}
          element={<LazyWithSuspense component={TransactionsPage} />}
        />
        <Route
          path={normalizePath(routerLinks("Budget"))}
          element={<LazyWithSuspense component={BudgetPage} />}
        />
        <Route
          path={normalizePath(routerLinks("Reports"))}
          element={<LazyWithSuspense component={ReportsPage} />}
        />
        <Route
          path={normalizePath(routerLinks("Wallets"))}
          element={<LazyWithSuspense component={WalletsPage} />}
        />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={routerLinks("Login")} replace />}
      />
    </Routes>
  );
};

export default Pages;

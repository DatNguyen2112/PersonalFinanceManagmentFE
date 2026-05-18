import { Spin } from 'antd';
import React, { type FC, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { routerLinks } from './router-links';
import { keyToken } from './variable';

interface NormalPage {
    path: string;
    component: FC;
}

interface LayoutPage {
    layout: FC<{ children?: React.ReactNode }>;
    isPublic: boolean;
    path?: string;
    child: (NormalPage | LayoutPage)[];
}

const pages = [
    {
        layout: React.lazy(() => import('../src/layout/auth')),
        isPublic: true,
        child: [
            {
                path: routerLinks('Login'),
                component: React.lazy(() => import('../src/pages/login')),
            },
            {
                path: routerLinks('Register'),
                component: React.lazy(() => import('../src/pages/register')),
            },
        ],
    },
    {
        layout: React.lazy(() => import('../src/layout/MainLayout')),
        isPublic: false,
        child: [
            {
                path: routerLinks('Dashboard'),
                component: React.lazy(() => import('../src/pages/Dashboard')),
            },
            {
                path: routerLinks('Transactions'),
                component: React.lazy(() => import('../src/pages/Transactions')),
            },
            {
                path: routerLinks('Budget'),
                component: React.lazy(() => import('../src/pages/Budget')),
            },
            {
                path: routerLinks('Reports'),
                component: React.lazy(() => import('../src/pages/Reports')),
            },
            {
                path: routerLinks('Wallets'),
                component: React.lazy(() => import('../src/pages/Wallets')),
            },
        ],
    },
    // {
    //     layout: React.lazy(() => import('../src/layouts/admin')),
    //     isPublic: false,
    //     child: [
    //         // {
    //         //   path: '/',
    //         //   component: routerLinks('Dashboard'),
    //         // },
    //         // {
    //         //   path: '/dashboard',
    //         //   component: React.lazy(() => import('../src/pages/quan-tri-nguoi-dung/quan-ly-nguoi-dung')),
    //         // },
    //         {
    //             path: routerLinks('Code'),
    //             component: React.lazy(() => import('../src/pages/codetype')),
    //         },
    //         {
    //             path: routerLinks('SystemUserAdmin'),
    //             component: React.lazy(() => import('../src/pages/quan-tri-nguoi-dung/users')),
    //         },
    //         {
    //             path: routerLinks('SystemUserAdmin') + '/add-user-map-role/:id',
    //             component: React.lazy(() => import('../src/pages/quan-tri-nguoi-dung/users/add-right-map-role-user')),
    //         },
    //         {
    //             path: routerLinks('Project'),
    //             component: React.lazy(() => import('../src/pages/project')),
    //         },
    //         {
    //             path: routerLinks('ResourceView') + '/:id',
    //             component: React.lazy(() => import('../src/pages/resource-view')),
    //         },
    //         {
    //             path: routerLinks('Navigation'),
    //             component: React.lazy(() => import('../src/pages/navigation')),
    //         },
    //         {
    //             path: routerLinks('RightMapRole'),
    //             component: React.lazy(() => import('../src/pages/right-map-role')),
    //         },
    //         {
    //             path: routerLinks('Roles'),
    //             component: React.lazy(() => import('../src/pages/quan-tri-nguoi-dung/quan-ly-nhom-nguoi-dung')),
    //         },
    //     ],
    // },
];

const renderPages = (pages: (NormalPage | LayoutPage)[]) => {
    return (
        <>
            {pages.map((page, index) => {
                const path = page.path?.trim().replace(/^\/+/, '') ?? '';

                if ('layout' in page) {
                    if (page.isPublic || !!localStorage.getItem(keyToken)) {
                        return (
                            <Route
                                key={index}
                                element={
                                    <page.layout>
                                        <Outlet />
                                    </page.layout>
                                }
                                path={path}
                            >
                                {renderPages(page.child || [])}
                            </Route>
                        );
                    }

                    return (
                        <Route key={index} element={<Navigate to={`${routerLinks('Login')}`} />} path={path}>
                            {renderPages(page.child || [])}
                        </Route>
                    );
                }

                return (
                    <Route
                        key={index}
                        index={!path}
                        element={
                            <Suspense
                                fallback={
                                    <Spin>
                                        <div className="!w-screen !h-screen" />
                                    </Spin>
                                }
                            >
                                {<page.component />}
                            </Suspense>
                        }
                        path={path}
                    ></Route>
                );
            })}
        </>
    );
};

const Pages: FC = () => {
    return (
        <Routes>
            <Route path={'/'}>{renderPages(pages)}</Route>
            <Route path="*" element={<Navigate to={`${routerLinks('Login')}`} replace />} />
        </Routes>
    );
};

export default Pages;

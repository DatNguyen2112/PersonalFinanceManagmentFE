import { Spin } from 'antd';
import { type PropsWithChildren, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { routerLinks } from '../../router-links';
import { keyToken } from '../../variable';
import { useGlobalFacade } from '../../store/global/facade';
import { EStatusGlobal } from '../../store/global/slice';
import MainLayout from '../MainLayout';

const ProtectedLayout = ({ children }: PropsWithChildren) => {
    const globalFacade = useGlobalFacade();
    const profileRequestedRef = useRef(false);
    const token = localStorage.getItem(keyToken);

    useEffect(() => {
        if (!token) return;

        const isLoadingProfile = globalFacade.status === EStatusGlobal.profilePending;
        const isAlreadyLoaded = globalFacade.status === EStatusGlobal.profileFulfilled;

        if (isLoadingProfile || isAlreadyLoaded || profileRequestedRef.current) return;

        profileRequestedRef.current = true;
        void globalFacade.profile();
    }, [token, globalFacade.status, globalFacade.profile]);

    if (!token) {
        return <Navigate to={routerLinks('Login')} replace />;
    }

    if (globalFacade.status === EStatusGlobal.profileRejected) {
        return <Navigate to={routerLinks('Login')} replace />;
    }

    const isInitialProfileLoading =
        globalFacade.status === EStatusGlobal.profilePending && !globalFacade.profileUser;

    if (isInitialProfileLoading) {
        return (
            <div className="!w-screen !h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return <MainLayout>{children}</MainLayout>;
};

export default ProtectedLayout;


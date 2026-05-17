import { useEffect, type PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';

const AuthLayout = ({ children }: PropsWithChildren) => {
    const location = useLocation();

    useEffect(() => {
        // Scroll to top on every route change
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div>
            {children}
        </div>
    );
};
export default AuthLayout;

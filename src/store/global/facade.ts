import { useCallback } from 'react';
import { useAppDispatch, useTypedSelector } from '..';
import { getProfileUser, globalAction, type GlobalState, type LoginModel } from './slice';

export const useGlobalFacade = () => {
    const dispatch = useAppDispatch();
    const globalState = useTypedSelector((state: any) => state[globalAction.name]) as GlobalState;

    const set = useCallback((values: GlobalState) => dispatch(globalAction.set(values)), [dispatch]);
    const logout = useCallback(() => dispatch(globalAction.logout()), [dispatch]);
    const profile = useCallback(() => dispatch(globalAction.profile()), [dispatch]);
    const changePasswordProfile = useCallback(
        (values: any) => dispatch(globalAction.changePasswordProfile(values)),
        [dispatch],
    );
    const login = useCallback((values: LoginModel) => dispatch(globalAction.login(values)), [dispatch]);
    const forgottenPassword = useCallback(
        (values: { email: string }) => dispatch(globalAction.forgottenPassword(values)),
        [dispatch],
    );
    const otpConfirmation = useCallback(
        (values: { email: string; otp: string }) => dispatch(globalAction.otpConfirmation(values)),
        [dispatch],
    );
    const resetPassword = useCallback((values: any) => dispatch(globalAction.resetPassword(values)), [dispatch]);
    const register = useCallback((values: any) => dispatch(globalAction.register(values)), [dispatch]);

    return {
        ...globalState,
        profileUser: getProfileUser(globalState),
        set,
        logout,
        profile,
        changePasswordProfile,
        login,
        forgottenPassword,
        otpConfirmation,
        resetPassword,
        register,
    };
};
import { useAppDispatch, useTypedSelector } from '..';
import { globalAction, type GlobalState, type LoginModel, type Auth } from './slice';

export const useGlobalFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[globalAction.name]) as GlobalState),
        set: (values: GlobalState) => dispatch(globalAction.set(values)),
        logout: () => dispatch(globalAction.logout()),
        profile: () => dispatch(globalAction.profile()),
        changePasswordProfile: (values: any) => dispatch(globalAction.changePasswordProfile(values)),
        login: (values: LoginModel) => dispatch(globalAction.login(values)),
        forgottenPassword: (values: { email: string }) => dispatch(globalAction.forgottenPassword(values)),
        otpConfirmation: (values: { email: string; otp: string }) => dispatch(globalAction.otpConfirmation(values)),
        resetPassword: (values: any) => dispatch(globalAction.resetPassword(values)),
        register: (values: any) => dispatch(globalAction.register(values))
    };
};
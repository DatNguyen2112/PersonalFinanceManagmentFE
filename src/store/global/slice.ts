import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';

import { customMessage } from '../../main';
import { routerLinks } from '../../router-links';
import { API } from '../../utils/apis';
import { keyToken, keyRefreshToken, keyUser } from '../../variable';

export const name = 'Auth';

export const EStatusGlobal = {
    idle: 'idle',
    logoutFulfilled: 'logout.fulfilled',
    profilePending: 'profile.pending',
    profileFulfilled: 'profile.fulfilled',
    profileRejected: 'profile.rejected',
    putProfilePending: 'putProfile.pending',
    putProfileFulfilled: 'putProfile.fulfilled',
    putProfileRejected: 'putProfile.rejected',
    changePasswordProfilePending: 'changePasswordProfilePending',
    changePasswordProfileFulfilled: 'changePasswordProfileFulfilled',
    changePasswordProfileRejected: 'changePasswordProfileRejected',
    loginPending: 'login.pending',
    loginFulfilled: 'login.fulfilled',
    loginRejected: 'login.rejected',
    forgottenPasswordPending: 'forgottenPassword.pending',
    forgottenPasswordFulfilled: 'forgottenPassword.fulfilled',
    forgottenPasswordRejected: 'forgottenPassword.rejected',
    otpConfirmationPending: 'otpConfirmation.pending',
    otpConfirmationFulfilled: 'otpConfirmation.fulfilled',
    otpConfirmationRejected: 'otpConfirmation.rejected',
    resetPasswordPending: 'resetPassword.pending',
    resetPasswordFulfilled: 'resetPassword.fulfilled',
    resetPasswordRejected: 'resetPassword.rejected',
    registerPending: 'register.pending',
    registerFulfilled: 'register.fulfilled',
    registerRejected: 'register.rejected',
} as const;

export type EStatusState = typeof EStatusGlobal[keyof typeof EStatusGlobal];

interface ResetPassword {
    password?: string;
    retypedPassword?: string;
    passwordOld?: string;
    email?: string;
    otp?: string;
}

export class RegisterModel {
    public username?: string;
    public email?: string;
    public password?: string;
    public firstName?: string;
    public lastName?: string;
    public phoneNumber?: string;
}

export class User {
    public listRole?: { id?: string; code?: string; name?: string; isSystem?: boolean; level?: number }[];
    public id?: string;
    public userName?: string;
    public name?: string;
    public phoneNumber?: string;
    public countryCode?: string;
    public gender?: string;
    public email?: string;
    public password?: string;
    public avatarUrl?: string;
    public ma?: string;
    public bankAccountNo?: string;
    public bankName?: string;
    public bankUsername?: string;
    public birthdate?: string;
    public lastActivityDate?: string;
    public isLockedOut?: boolean;
    public isActive?: boolean;
    public activeDate?: string;
    public level?: number;
    public facebookUserId?: string;
    public googleUserId?: string;
    public emailVerifyToken?: string;
    public roleListCode?: string[];
    public profileType?: string;
    public createdOnDate?: string;
    public isEmailVerified?: boolean;
    public role?: string;
    public roleCode?: string;
    public phongBan?: any;
    public toThucHien?: any;
}

export class Auth {
    public accessToken?: string;
    public refreshToken?: string;
    public tokenType?: string;
    public expiresIn?: number;
    public user?: {
        id?: string;
        username?: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
        role?: string;
        enabled?: boolean;
        createdAt?: string;
        lastLogin?: string;
    };
}

export type LoginModel = {
    username: string;
    password: string;
};

export interface GlobalState {
    [selector: string]: any;
    user?: Auth;
    isShowConfig?: boolean;
    data?: ResetPassword & Auth;
    routeLanguage?: Record<string, string>;
    isLoading?: boolean;
    isVisible?: boolean;
    status?: EStatusState;
    pathname?: string;
    formatDate?: string;
    language?: string;
    locale?: typeof viVN | typeof enUS;
    headerColor?: string;
    siderColor?: string;
    showHeader?: boolean;
    showSider?: boolean;
    show?: boolean;
    feedbackSuccess?: boolean;
}

export const globalAction = {
    name,
    set: createAsyncThunk(name + '/set', async (values: GlobalState) => values),
    logout: createAsyncThunk(name + '/logout', async () => true),
    profile: createAsyncThunk(name + '/profile', async () => {
        const { data } = await API.post<User>(`${routerLinks(name, 'api')}/jwt/info`);
        return data || {};
    }),
    changePasswordProfile: createAsyncThunk(name + '/changePasswordProfile', async (values: User) => {
        const result = await API.put<{ user: User }>(`/idm/users/${values.id}/password`, values);
        if (result?.isSuccess && result?.message)
            await customMessage.success({ content: result.message });
        return result?.isSuccess;
    }),
    login: createAsyncThunk(name + '/login', async (values: LoginModel) => {
        const result = await API.post<Auth>(
            `${routerLinks(name, 'api')}/login`,
            values,
        );

        if (result.isSuccess) {
            localStorage.setItem(keyToken, result?.accessToken ?? '');
            localStorage.setItem(keyRefreshToken, result?.refreshToken ?? '');
            localStorage.setItem(keyUser, JSON.stringify(result?.user));
            customMessage.success({ content: "Đăng nhập thành công" });
        } else {
            customMessage.error({ content: result?.errorMessage || "Đăng nhập thất bại" });
        }
        return result;
    }),
    register: createAsyncThunk(name + '/register', async (values: RegisterModel) => {
        const result = await API.post<RegisterModel>(
            `${routerLinks(name, 'api')}/register`,
            values,
        );

        if (result.isSuccess) {
            customMessage.success({ content: "Đăng ký thành công" });
        } else {
            customMessage.error({ content: result?.errorMessage || "Đăng ký thất bại" });
        }
        return result;
    }),
    forgottenPassword: createAsyncThunk(name + '/forgotten-password', async (values: { email: string }) => {
        const { message } = await API.post(`${routerLinks(name, 'api')}/forgotten-password`, values);
        if (message) await customMessage.success({ content: message });
        return true;
    }),
    otpConfirmation: createAsyncThunk(name + '/otp-confirmation', async (values: { email: string; otp: string }) => {
        const { message } = await API.post(`${routerLinks(name, 'api')}/otp-confirmation`, values);
        if (message) await customMessage.success({ content: message });
        return true;
    }),
    resetPassword: createAsyncThunk(name + '/reset-password', async (values: ResetPassword) => {
        const { message } = await API.post(`${routerLinks(name, 'api')}/reset-password`, values);
        if (message) await customMessage.success({ content: message });
        return true;
    }),
};

const initialState: GlobalState = {
    data: JSON.parse(localStorage.getItem(keyUser) || '{}'),
    routeLanguage: undefined,
    user: JSON.parse(localStorage.getItem(keyUser) || '{}'),
    isLoading: false,
    isVisible: false,
    status: EStatusGlobal.idle,
    pathname: '',
};

export const globalSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(globalAction.set.fulfilled, (state, action: PayloadAction<GlobalState>) => {
                let key: keyof GlobalState;
                for (key in action.payload) state[key] = action.payload[key];
            })
            .addCase(globalAction.logout.fulfilled, (state: any) => {
                state.user = {};
                state.data = {};
                localStorage.removeItem(keyUser);
                localStorage.removeItem(keyToken);
                localStorage.removeItem(keyRefreshToken);
                state.isLoading = false;
                state.status = EStatusGlobal.logoutFulfilled;
            })
            .addCase(globalAction.profile.pending, (state) => {
                state.isLoading = true;
                state.status = EStatusGlobal.profilePending;
            })
            .addCase(globalAction.profile.fulfilled, (state: any, action: PayloadAction<User>) => {
                if (action.payload) {
                    state.user = action.payload;
                    state.data = action.payload;
                    localStorage.setItem(keyUser, JSON.stringify(action.payload));
                    state.status = EStatusGlobal.profileFulfilled;
                } else state.status = EStatusGlobal.idle;
                state.isLoading = false;
            })
            .addCase(globalAction.profile.rejected, (state) => {
                state.status = EStatusGlobal.profileRejected;
                state.isLoading = false;
            })
            .addCase(globalAction.changePasswordProfile.pending, (state: any, action) => {
                state.data = { ...state.data, ...action.meta.arg };
                state.isLoading = true;
                state.status = EStatusGlobal.changePasswordProfilePending;
            })
            .addCase(globalAction.changePasswordProfile.fulfilled, (state: any, action: PayloadAction<any>) => {
                if (action.payload) state.status = EStatusGlobal.changePasswordProfileFulfilled;
                else state.status = EStatusGlobal.idle;
                state.isLoading = false;
            })
            .addCase(globalAction.changePasswordProfile.rejected, (state) => {
                state.status = EStatusGlobal.changePasswordProfileRejected;
                state.isLoading = false;
            })
            .addCase(globalAction.register.pending, (state: any, action) => {
                state.data = { ...state.data, ...action.meta.arg };
                state.isLoading = true;
                state.status = EStatusGlobal.registerPending;
            })
            .addCase(globalAction.register.fulfilled, (state: any, action: PayloadAction<any>) => {
                if (action.payload) state.status = EStatusGlobal.registerFulfilled;
                else state.status = EStatusGlobal.idle;
                state.isLoading = false;
            })
            .addCase(globalAction.register.rejected, (state) => {
                state.status = EStatusGlobal.registerRejected;
                state.isLoading = false;
            })
            .addCase(globalAction.login.pending, (state: any, action) => {
                state.data = action.meta.arg;
                state.isLoading = true;
                state.status = EStatusGlobal.loginPending;
            })
            .addCase(globalAction.login.fulfilled, (state: any, action: PayloadAction<any>) => {
                if (action.payload) {
                    console.log(action.payload)
                    localStorage.setItem(keyUser, JSON.stringify(action.payload?.user));
                    state.user = action.payload;
                    state.data = {};
                    state.status = EStatusGlobal.loginFulfilled;
                } else state.status = EStatusGlobal.idle;
                state.isLoading = false;
            })
            .addCase(globalAction.login.rejected, (state) => {
                state.status = EStatusGlobal.loginRejected;
                state.isLoading = false;
            })
            .addCase(globalAction.forgottenPassword.pending, (state: any, action) => {
                state.data = action.meta.arg;
                state.isLoading = true;
                state.status = EStatusGlobal.forgottenPasswordPending;
            })
            .addCase(globalAction.forgottenPassword.fulfilled, (state, action: PayloadAction<boolean>) => {
                if (action.payload) state.status = EStatusGlobal.forgottenPasswordFulfilled;
                else state.status = EStatusGlobal.idle;
                state.isLoading = false;
            })
            .addCase(globalAction.forgottenPassword.rejected, (state) => {
                state.status = EStatusGlobal.forgottenPasswordRejected;
                state.isLoading = false;
            })
            .addCase(globalAction.otpConfirmation.pending, (state: any, action) => {
                state.data = action.meta.arg;
                state.isLoading = true;
                state.status = EStatusGlobal.otpConfirmationPending;
            })
            .addCase(globalAction.otpConfirmation.fulfilled, (state, action: PayloadAction<boolean>) => {
                if (action.payload) state.status = EStatusGlobal.otpConfirmationFulfilled;
                else state.status = EStatusGlobal.idle;
                state.isLoading = false;
            })
            .addCase(globalAction.otpConfirmation.rejected, (state) => {
                state.status = EStatusGlobal.otpConfirmationRejected;
                state.isLoading = false;
            })
            .addCase(globalAction.resetPassword.pending, (state: any, action) => {
                state.data = action.meta.arg;
                state.isLoading = true;
                state.status = EStatusGlobal.resetPasswordPending;
            })
            .addCase(globalAction.resetPassword.fulfilled, (state: any, action: PayloadAction<boolean>) => {
                if (action.payload) {
                    state.data = {};
                    state.status = EStatusGlobal.resetPasswordFulfilled;
                } else state.status = EStatusGlobal.idle;
                state.isLoading = false;
            })
            .addCase(globalAction.resetPassword.rejected, (state) => {
                state.status = EStatusGlobal.resetPasswordRejected;
                state.isLoading = false;
            });
    },
});
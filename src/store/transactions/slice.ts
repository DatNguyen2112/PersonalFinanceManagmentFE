import { createAsyncThunk, createSlice, type Draft, type PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../utils/apis';
import { Slice } from '../slice';
import { Action } from '../action';
import { EStatusState } from '../../models/indexs';
import type { Pagination } from '../../models/api';

export const name = 'Transactions';

export const EStatusTransactions = {
    idle: 'idle',
    getListTransactionPending: 'getListTransaction.pending',
    getListTransactionFulfilled: 'getListTransaction.fulfilled',
    getListTransactionRejected: 'getListTransaction.rejected',

    getListCategoriesPending: 'getListCategories.pending',
    getListCategoriesFulfilled: 'getListCategories.fulfilled',
    getListCategoriesRejected: 'getListCategories.rejected',
} as const;

export type EStatusTransactions = typeof EStatusTransactions[keyof typeof EStatusTransactions];

export class Transaction {
    public id?: string;
    public sepayId?: string;
    public accountNumber?: string;
    public bankBrandName?: string;
    public transactionDate?: string;
    public amountIn?: number;
    public amountOut?: number;
    public accumulated?: number;
    public transactionContent?: string;
    public referenceNumber?: string;
    public code?: string;
    public categoryName?: string;
    public note?: string;
    public direction?: string;
    public source?: string;
}

export class TransactionQueryModel {
    public accountNumber?: string;
    public dateMin?: string;
    public dateMax?: string;
    public categoryId?: number;
    public direction?: string;
    public page?: number;
    public size?: number;
}

export class Category {
    public id?: string;
    public name?: string;
    public direction?: string;
    public iconCode?: string;
    public color?: string;
    public system?: boolean;
    public keywords?: string[];
    public createdAt?: string;
}

export interface TransactionsState {
    [selector: string]: any;
    isLoading?: boolean;
    listTransactions?: Pagination<Transaction>;
    listCategories?: Category[];
}

export const action = {
    ...new Action<Transaction, typeof EStatusTransactions>(name),
    getListTransaction: createAsyncThunk(name + 'getListTransaction', async (params: TransactionQueryModel) => {
        const res = await API.get(`/personal-finance/transactions`, params);
        return res;
    }),
    getListCategories: createAsyncThunk(name + 'getListCategories', async () => {
        const res = await API.get(`/personal-finance/categories`);
        console.log(res)
        return res;
    }),
};

export const transactionsSlice = createSlice(
    new Slice<Transaction, typeof EStatusTransactions>(action, { keepUnusedDataFor: 9999 }, (builder) => {
        builder.addCase(action.getListTransaction.pending, (state: TransactionsState) => {
            state.isLoading = true;
            state.status = EStatusTransactions.getListTransactionPending;
        })
        builder.addCase(action.getListTransaction.fulfilled, (state: TransactionsState, action: PayloadAction<any>) => {
            if (action.payload) {
                state.listTransactions = action.payload as Draft<Pagination<Transaction>>;
                state.status = EStatusTransactions.getListTransactionFulfilled;
            } else state.status = EStatusState.idle;
            state.isLoading = false;
        })
        builder.addCase(action.getListTransaction.rejected, (state: TransactionsState) => {
            state.status = EStatusTransactions.getListTransactionRejected;
            state.isLoading = false;
        })
        builder.addCase(action.getListCategories.pending, (state: TransactionsState) => {
            state.isLoading = true;
            state.status = EStatusTransactions.getListCategoriesPending;
        })
        builder.addCase(action.getListCategories.fulfilled, (state: TransactionsState, action: PayloadAction<any>) => {
            if (action.payload) {
                state.listCategories = action.payload as Draft<Category[]>;
                state.status = EStatusTransactions.getListCategoriesFulfilled;
            } else state.status = EStatusState.idle;
            state.isLoading = false;
        })
        builder.addCase(action.getListCategories.rejected, (state: TransactionsState) => {
            state.status = EStatusTransactions.getListCategoriesRejected;
            state.isLoading = false;
        })
    }),
);
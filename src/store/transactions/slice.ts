/* eslint-disable @typescript-eslint/no-explicit-any */
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

    getTransactionDashboardPending: 'getTransactionDashboard.pending',
    getTransactionDashboardFulfilled: 'getTransactionDashboard.fulfilled',
    getTransactionDashboardRejected: 'getTransactionDashboard.rejected',

    getBudgetSummaryPending: 'getBudgetSummary.pending',
    getBudgetSummaryFulfilled: 'getBudgetSummary.fulfilled',
    getBudgetSummaryRejected: 'getBudgetSummary.rejected',

    getIncomeAndExpenseSummaryPending: 'getIncomeAndExpenseSummary.pending',
    getIncomeAndExpenseSummaryFulfilled: 'getIncomeAndExpenseSummary.fulfilled',
    getIncomeAndExpenseSummaryRejected: 'getIncomeAndExpenseSummary.rejected',

    getIncomeAndExpenseCategorySummaryPending: 'getIncomeAndExpenseCategorySummary.pending',
    getIncomeAndExpenseCategorySummaryFulfilled: 'getIncomeAndExpenseCategorySummary.fulfilled',
    getIncomeAndExpenseCategorySummaryRejected: 'getIncomeAndExpenseCategorySummary.rejected',
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

export class TransactionDashboard {
    public monthly?: {
        year: number;
        month: number;
        totalIn: number;
        totalOut: number;
        netBalance: number;
        breakdown: {
            categoryName: string;
            color: string;
            amount: number;
            transactionCount: number;
            sharePercent: number;
        }[];
    }
    public category?: {
        year: number;
        month: number;
        label: string;
        totalExpense: number;
        items: {
            categoryName: string;
            color: string;
            amount: number;
            percentage: number;
            transactionCount: number;
        }[];
    }
    public cashFlow?: {
        label: string;
        year: number;
        month: number;
        income: number;
        expense: number;
    }[]
    public recentTx?: Transaction[];
    public budgets?: {
        budgetId: number;
        categoryName: string;
        year: number;
        month: number;
        limitAmount: number;
        spentAmount: number;
        remainingAmount: number;
        usagePercent: number;
        alertTriggered: boolean;
    }[];
}

export class BudgetSummary {
    public year?: number;
    public month?: number;
    public total?: {
        budgetId: number;
        categoryName: string;
        year: number;
        month: number;
        limitAmount: number;
        spentAmount: number;
        remainingAmount: number;
        usagePercent: number;
        alertTriggered: boolean;
    }
    public items?: {
        budgetId: number;
        categoryName: string;
        year: number;
        month: number;
        limitAmount: number;
        spentAmount: number;
        remainingAmount: number;
        usagePercent: number;
        alertTriggered: boolean;
    }[];
    public alertCount?: number;
    public totalCount?: number;
}

export class IncomeAndExpenseSummary {
    public year?: number;
    public totalIncome?: number;
    public totalExpense?: number;
    public netSavings?: number;
    public savingsRate?: number;
    public avgMonthlyIncome?: number;
    public avgMonthlyExpense?: number;
    public monthlyBars?: {
        label: string;
        year: number;
        month: number;
        income: number;
        expense: number;
    }[];
}

export class IncomeAndExpenseCategorySummary {
    public year?: number;
    public totalExpense?: number;
    public totalIncome?: number;
    public expenseItems?: {
        categoryName: string;
        color: string;
        amount: number;
        percentage: number;
    }[];
    public incomeItems?: {
        categoryName: string;
        color: string;
        amount: number;
        percentage: number;
    }[];
}

export interface TransactionsState {
    [selector: string]: any;
    isLoading?: boolean;
    listTransactions?: Pagination<Transaction>;
    listCategories?: Category[];
    transactionDashboard?: TransactionDashboard;
    budgetSummary?: BudgetSummary;
    incomeAndExpenseSummary?: IncomeAndExpenseSummary;
    incomeAndExpenseCategorySummary?: IncomeAndExpenseCategorySummary;
}

export class BudgetQueryModel {
    public year?: number;
    public month?: number;
}

export const action = {
    ...new Action<Transaction, typeof EStatusTransactions>(name),
    getListTransaction: createAsyncThunk(name + 'getListTransaction', async (params: TransactionQueryModel) => {
        const res = await API.get(`/personal-finance/transactions`, params);
        return res;
    }),
    getListCategories: createAsyncThunk(name + 'getListCategories', async () => {
        const res = await API.get(`/personal-finance/categories`);
        return res;
    }),
    getTransactionDashboard: createAsyncThunk(name + 'getTransactionDashboard', async () => {
        const res = await API.get(`/personal-finance/dashboard`);
        return res;
    }),
    getBudgetSummary: createAsyncThunk(name + 'getBudgetSummary', async (params: BudgetQueryModel) => {
        const res = await API.get(`/personal-finance/budgets`, params);
        return res;
    }),
    getIncomeAndExpenseSummary: createAsyncThunk(name + 'getIncomeAndExpenseSummary', async (params: BudgetQueryModel) => {
        const res = await API.get(`/personal-finance/reports/summary`, params);
        return res;
    }),
    getIncomeAndExpenseCategorySummary: createAsyncThunk(name + 'getIncomeAndExpenseCategorySummary', async (params: BudgetQueryModel) => {
        const res = await API.get(`/personal-finance/reports/categories`, params);
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
        builder.addCase(action.getTransactionDashboard.pending, (state: TransactionsState) => {
            state.isLoading = true;
            state.status = EStatusTransactions.getTransactionDashboardPending;
        })
        builder.addCase(action.getTransactionDashboard.fulfilled, (state: TransactionsState, action: PayloadAction<any>) => {
            if (action.payload) {
                state.transactionDashboard = action.payload as Draft<TransactionDashboard>;
                state.status = EStatusTransactions.getTransactionDashboardFulfilled;
            } else state.status = EStatusState.idle;
            state.isLoading = false;
        })
        builder.addCase(action.getTransactionDashboard.rejected, (state: TransactionsState) => {
            state.status = EStatusTransactions.getTransactionDashboardRejected;
            state.isLoading = false;
        })
        builder.addCase(action.getBudgetSummary.pending, (state: TransactionsState) => {
            state.isLoading = true;
            state.status = EStatusTransactions.getBudgetSummaryPending;
        })
        builder.addCase(action.getBudgetSummary.fulfilled, (state: TransactionsState, action: PayloadAction<any>) => {
            if (action.payload) {
                state.budgetSummary = action.payload as Draft<BudgetSummary>;
                state.status = EStatusTransactions.getBudgetSummaryFulfilled;
            } else state.status = EStatusState.idle;
            state.isLoading = false;
        })
        builder.addCase(action.getBudgetSummary.rejected, (state: TransactionsState) => {
            state.status = EStatusTransactions.getBudgetSummaryRejected;
            state.isLoading = false;
        })
        builder.addCase(action.getIncomeAndExpenseSummary.pending, (state: TransactionsState) => {
            state.isLoading = true;
            state.status = EStatusTransactions.getIncomeAndExpenseSummaryPending;
        })
        builder.addCase(action.getIncomeAndExpenseSummary.fulfilled, (state: TransactionsState, action: PayloadAction<any>) => {
            if (action.payload) {
                state.incomeAndExpenseSummary = action.payload as Draft<IncomeAndExpenseSummary>;
                state.status = EStatusTransactions.getIncomeAndExpenseSummaryFulfilled;
            } else state.status = EStatusState.idle;
            state.isLoading = false;
        })
        builder.addCase(action.getIncomeAndExpenseSummary.rejected, (state: TransactionsState) => {
            state.status = EStatusTransactions.getIncomeAndExpenseSummaryRejected;
            state.isLoading = false;
        })
        builder.addCase(action.getIncomeAndExpenseCategorySummary.pending, (state: TransactionsState) => {
            state.isLoading = true;
            state.status = EStatusTransactions.getIncomeAndExpenseCategorySummaryPending;
        })
        builder.addCase(action.getIncomeAndExpenseCategorySummary.fulfilled, (state: TransactionsState, action: PayloadAction<any>) => {
            if (action.payload) {
                state.incomeAndExpenseCategorySummary = action.payload as Draft<IncomeAndExpenseCategorySummary>;
                state.status = EStatusTransactions.getIncomeAndExpenseCategorySummaryFulfilled;
            } else state.status = EStatusState.idle;
            state.isLoading = false;
        })
        builder.addCase(action.getIncomeAndExpenseCategorySummary.rejected, (state: TransactionsState) => {
            state.status = EStatusTransactions.getIncomeAndExpenseCategorySummaryRejected;
            state.isLoading = false;
        })
    }),
);
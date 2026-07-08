/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useTypedSelector } from '..';
import { BudgetCategoryModel, BudgetQueryModel, type TransactionsState, action } from './slice';

export const useTransactionsFacade = () => {
    const dispatch = useAppDispatch();
    const state = useTypedSelector((state: any) => state[action.name]) as TransactionsState;
    return {
        ...state,
        set: (key: string, value: any) => dispatch(action.set({ [key]: value })),
        getListTransaction: (values: any) => dispatch(action.getListTransaction(values)),
        getListCategories: () => dispatch(action.getListCategories()),
        getTransactionDashboard: () => dispatch(action.getTransactionDashboard()),
        getBudgetSummary: (params: BudgetQueryModel) => dispatch(action.getBudgetSummary(params)),
        getIncomeAndExpenseSummary: (params: BudgetQueryModel) => dispatch(action.getIncomeAndExpenseSummary(params)),
        getIncomeAndExpenseCategorySummary: (params: BudgetQueryModel) => dispatch(action.getIncomeAndExpenseCategorySummary(params)),
        getAccounts: () => dispatch(action.getAccounts()),
        addBudgetCategory: (values: BudgetCategoryModel) => dispatch(action.addBudgetCategory(values)),
    };
};
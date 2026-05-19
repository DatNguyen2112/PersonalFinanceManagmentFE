/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useTypedSelector } from '..';
import { BudgetQueryModel, type TransactionsState, action } from './slice';

export const useTransactionsFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state: any) => state[action.name]) as TransactionsState),
        getListTransaction: (values: any) => dispatch(action.getListTransaction(values)),
        getListCategories: () => dispatch(action.getListCategories()),
        getTransactionDashboard: () => dispatch(action.getTransactionDashboard()),
        getBudgetSummary: (params: BudgetQueryModel) => dispatch(action.getBudgetSummary(params)),
        getIncomeAndExpenseSummary: (params: BudgetQueryModel) => dispatch(action.getIncomeAndExpenseSummary(params)),
        getIncomeAndExpenseCategorySummary: (params: BudgetQueryModel) => dispatch(action.getIncomeAndExpenseCategorySummary(params)),
    };
};
import { useAppDispatch, useTypedSelector } from '..';
import { type TransactionsState, action } from './slice';

export const useTransactionsFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state: any) => state[action.name]) as TransactionsState),
        getListTransaction: (values: any) => dispatch(action.getListTransaction(values)),
        getListCategories: () => dispatch(action.getListCategories()),
    };
};
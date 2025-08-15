import { createReducer, on } from "@ngrx/store";
import { Contract, ContractSummary } from "src/app/models/contracts/contracts.model";
import * as ContractsActions from './contracts.actions';

export const contractsFeatureKey = 'contracts';

export interface ContractsState {
    list: Contract[];   // current paged list
    total: number;      // total items on server
    loading: boolean;   // list loading flag
    error?: string | null;  // error message if any
    cache: Record<string, Contract>;   // any loaded contract by id for quick access in a map
    summary: ContractSummary | null;
    summaryLoading: boolean;
    summaryError?: string | null;
}

const initialState: ContractsState = {
    list: [],
    total: 0,
    loading: false,
    error: null,
    cache: {},
    summary: null,
    summaryLoading: false,
    summaryError: null
}

export const contractsReducer = createReducer(
    initialState,
    // LIST
    on(ContractsActions.loadList, (s) => ({ ...s, loading: true, error: null })),
    on(ContractsActions.loadListSuccess, (s, { items, total }) => {
        const nextCache = { ...s.cache };

        for (const c of items) nextCache[c.id] = c;

        return {
            ...s,
            list: items,
            total,
            loading: false,
            cache: nextCache
        }
    }),
    on(ContractsActions.loadListFailure, (s, { error }) => ({ ...s, loading: false, error })),

    // DETAIL
    on(ContractsActions.loadByIdSuccess, (s, { item }) => {
        const inListIndex = s.list.findIndex(x => x.id === item.id);
        const nextList = (inListIndex >= 0) ? Object.assign([], s.list, { [inListIndex]: item }) : s.list;

        return {
            ...s,
            list: nextList,
            cache: { ...s.cache, [item.id]: item }
        };
    }),
    on(ContractsActions.loadByIdFailure, (s, { error }) => ({ ...s, error })),

    // SUMMARY
    on(ContractsActions.loadSummary, (s) => ({ ...s, summaryLoading: true, summaryError: null })),
    on(ContractsActions.loadSummarySuccess, (s, { summary }) => ({
        ...s,
        summary,
        summaryLoading: false
    })),
    on(ContractsActions.loadSummaryFailure, (s, { error }) => ({
        ...s,
        summaryLoading: false,
        summaryError: error
    })),
);


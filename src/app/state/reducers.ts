import { contractsFeatureKey, contractsReducer, ContractsState } from '../features/contracts/state/data/contracts.reducer';
import { filtersFeatureKey, filtersReducer, FiltersState } from '../features/contracts/state/ui/filters.reducer';
import { ActionReducerMap } from '@ngrx/store';
export interface AppState {
    [contractsFeatureKey]: ContractsState;
    [filtersFeatureKey]: FiltersState;
}

export const reducers: ActionReducerMap<AppState> = {
    [contractsFeatureKey]: contractsReducer,
    [filtersFeatureKey]: filtersReducer
}

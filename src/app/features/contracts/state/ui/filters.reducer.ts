import { createReducer, on } from "@ngrx/store";
import { ListQuery } from "src/app/models/contracts/contracts.model";
import * as FiltersActions from './filters.actions';

export const filtersFeatureKey = 'contractsFilters';        // Seperate Slice for UI filters

export interface FiltersState extends ListQuery {}  // State equals ListQuery shape.

const initialState: FiltersState = {
    page: 0,
    size: 10,
    sort: 'endDate, asc'
}

export const filtersReducer = createReducer(
    initialState,
    on(FiltersActions.setFilters, (_, { filters }) => ({ ...filters }))     // Replace (immmutable)
);

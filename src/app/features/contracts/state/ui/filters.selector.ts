import { createFeatureSelector } from "@ngrx/store";
import { FiltersState } from "./filters.reducer";

export const selectListFilters = createFeatureSelector<FiltersState>('contractsFilters');       // Select filters slice.

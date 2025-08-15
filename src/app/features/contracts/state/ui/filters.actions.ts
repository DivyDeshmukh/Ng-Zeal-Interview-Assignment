import { createAction, props } from "@ngrx/store";
import { ListQuery } from "src/app/models/contracts/contracts.model";

export const setFilters = createAction('[Contracts/Filters] Set', props<{ filters: ListQuery }>());
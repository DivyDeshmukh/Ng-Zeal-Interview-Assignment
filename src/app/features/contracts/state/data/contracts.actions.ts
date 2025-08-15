import { createAction, props } from "@ngrx/store";
import { Contract, ContractSummary, ListQuery } from "src/app/models/contracts/contracts.model";

export const enterList = createAction('[Contracts] Enter List');        // Fired on list route init
export const filtersChanged = createAction('[Contracts] Filters Changed', props<{ filters: ListQuery }>());     // UI changed filters

export const loadList = createAction('[Contracts] Load List', props<{ filters: ListQuery }>());  // Trigger API call
export const loadListSuccess = createAction('[Contracts] Load List Success', props<{ items: Contract[]; total: number }>());  // API call success
export const loadListFailure = createAction('[Contracts] Load List Failure', props<{ error: string }>()); // API call failure

export const loadById = createAction('[Contracts] Load By Id', props<{ id: string }>());    // Fetch Detail
export const loadByIdSuccess = createAction('[Contracts] Load By Id Success', props<{ item: Contract }>()); // Fetch Detail success
export const loadByIdFailure = createAction('[Contracts] Load By Id Failure', props<{ id: string; error: string }>());

export const loadSummary = createAction('[Contracts] Load Summary');

export const loadSummarySuccess = createAction(
    '[Contracts/Summary] Load Success',
    props<{ summary: ContractSummary; }>()
);

export const loadSummaryFailure = createAction(
    '[Contracts/Summary] Load Failure',
    props<{ error: string }>()
);

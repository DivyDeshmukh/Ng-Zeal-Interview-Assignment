import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ContractApiService } from "src/app/core/services/contract-api-service";
import * as ContractsActions from './contracts.actions';
import { catchError, debounceTime, map, of, switchMap, withLatestFrom } from "rxjs";
import { selectListFilters } from "../ui/filters.selector";

@Injectable()
export class ContractsEffects {
    constructor(
        private action$: Actions,
        private api: ContractApiService,
        private store: Store
    ) {}

    // LIST: debounce filter changes, cancel stale requests
    loadList$ = createEffect(() => {
        return (
            this.action$.pipe(
                ofType(ContractsActions.filtersChanged, ContractsActions.enterList),
                debounceTime(250),
                withLatestFrom(this.store.select(selectListFilters)),
                switchMap(([_, filters]) => {
                    return (
                        this.api.list(filters).pipe(
                            map(res => ContractsActions.loadListSuccess({ items: res.content, total: res.totalElements })),
                            catchError(e => of(ContractsActions.loadListFailure({ error: e?.message ?? 'Failed to load' })))
                        )
                    )
                })
            )
        )
    });

    // DETAIL
     loadById$ = createEffect(() =>
        this.action$.pipe(
        ofType(ContractsActions.loadById),
        switchMap(({ id }) =>
            this.api.byId(id).pipe(
            map(item => ContractsActions.loadByIdSuccess({ item })),
            catchError(e => of(ContractsActions.loadByIdFailure({ id, error: e?.message ?? 'Failed to load detail' })))
            )
        )
        )
    );

    // SUMMARY
    loadSummary$ = createEffect(() => {
        console.log("Loading summary...");
        
        return (
            this.action$.pipe(
                ofType(ContractsActions.loadSummary),
                switchMap(() => {
                    return (
                        this.api.summary().pipe(
                            map(summary => ContractsActions.loadSummarySuccess({ summary })),
                            catchError(e => of(ContractsActions.loadSummaryFailure({ error: e?.message ?? 'Failed to load Summary' })))
                        )
                    )
                })
            )
        )
    });
}

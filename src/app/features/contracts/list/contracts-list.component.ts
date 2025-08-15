import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, map, Observable, take } from "rxjs";
import { Contract, ContractStatus, ListQuery } from "src/app/models/contracts/contracts.model";
import * as Sel from "../state/data/contracts.selector";
import * as FiltersSel from "../state/ui/filters.selector";
import * as FiltersAct from "../state/ui/filters.actions";
import * as Act from "../state/data/contracts.actions";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-contracts-list',
    templateUrl: './contracts-list.component.html',
    styleUrls: ['./contracts-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractsListComponent implements OnInit {
    row$: Observable<Contract[]> = this.store.select(Sel.selectContractsList);
    rows$ = this.row$;
    total$: Observable<number> = this.store.select(Sel.selectTotalCount);
    loading$: Observable<boolean> = this.store.select(Sel.selectLoading);
    filter$ = this.store.select(FiltersSel.selectListFilters);

    page$ = this.filter$.pipe(map(f => f.page ?? 0));
    size$ = this.filter$.pipe(map(f => f.size ?? 10));

    constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const p = this.route.snapshot.queryParamMap;

        const num = (v: string | null, def?: number) => {
            if(v == null || v === '') return def;
            const n = Number(v);
            return Number.isFinite(n) ? n : def;
        };
        const sanitizeSort = (s?: string | null) => (s ?? 'endDate, asc').replace(/\s+/g, '');

        const rawStatus = p.get('status');
        const status: ContractStatus[] | undefined = rawStatus ? [rawStatus as ContractStatus] : undefined;

        const filters: ListQuery = {
            q: p.get('q') || undefined,
            party: p.get('party') || undefined,
            status,
            expiringDays: num(p.get('expiringDays')),
            page: num(p.get('page'), 0),
            size: num(p.get('size'), 10),
            sort: sanitizeSort(p.get('sort'))
        };

        this.store.dispatch(FiltersAct.setFilters({ filters }));
        this.store.dispatch(Act.filtersChanged({ filters }));
    }

    onSearch(q: string) {
        this.patchFilters({ q, page: 0 });
    }
    onParty(party: string) {
        this.patchFilters({ party, page: 0 });
    }

    onStatus(status: string) {
        const arr: ContractStatus[] | undefined = status ? [status as ContractStatus] : undefined;
        this.patchFilters({ status: arr, page: 0 });
    }

    onExpiring(days: number)  {
        this.patchFilters({ expiringDays: Number(days) || undefined, page: 0 });
    }

    // pagination
    prevPage() {
        this.page$.pipe(take(1)).subscribe(p => this.setPage(Math.max(0, p - 1)));
    }

    nextPage() {
        combineLatest([this.page$, this.size$, this.total$]).pipe(take(1))
            .subscribe(([p, size, total]) => {
                const max = Math.max(0, Math.ceil(total / size) - 1);
                this.setPage(Math.min(max, p + 1));
            })
    }

    openDetail(c: Contract) {
        this.router.navigate(['./', c.id], { relativeTo: this.route });
    }
    trackById = (_: number, c: Contract) => c.id;

    private setPage(page: number) {
        this.patchFilters({ page });
    }

    // reset
    resetFilters(
            q: HTMLInputElement, party: HTMLInputElement, status: HTMLSelectElement, exp: HTMLInputElement
        ) {
            q.value = ''; party.value = ''; status.value = ''; exp.value = '';
            this.patchFilters({ q: '', party: undefined, status: undefined, expiringDays: undefined, page: 0 });
    }

    private patchFilters(partial: Partial<ListQuery>) {
        this.filter$.pipe(take(1)).subscribe(f => {
            const filters = { ...f, ...partial, size: f.size ?? 10, sort: (f.sort ?? 'endDate, asc').replace(/\s+/g, '')};
            this.store.dispatch(FiltersAct.setFilters({ filters }));
            this.store.dispatch(Act.filtersChanged({ filters }));
            this.router.navigate([], { relativeTo: this.route, queryParams: filters, queryParamsHandling: 'merge' });
        })
    }
}
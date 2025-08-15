import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { ArcElement, BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, PieController, Tooltip } from "chart.js";
import { Observable } from "rxjs";
import { selectCountByStatus, selectExpiringIn30Days, selectSummaryError, selectSummaryLoading, selectTopPartiesByCount, selectTotalSignedCount, selectTotalSignedValue } from '../contracts/state/data/contracts.selector';
import * as ContractsActions from '../contracts/state/data/contracts.actions';

Chart.register(PieController, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

    // KPIs
    totalSignedCount$: Observable<number> = this.store.select(selectTotalSignedCount);
    totalSignedValue$: Observable<number> = this.store.select(selectTotalSignedValue);
    expiring30$: Observable<number> = this.store.select(selectExpiringIn30Days);

    // Loading & error
    loading$ = this.store.select(selectSummaryLoading);
    error$ = this.store.select(selectSummaryError);

    // Charts data
    countByStatus$ = this.store.select(selectCountByStatus);
    topPartiesByCount$ = this.store.select(selectTopPartiesByCount);

    // canvas refs
    @ViewChild('statusPie') statusPieRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('partyBar') partyBarRef!: ElementRef<HTMLCanvasElement>;

    private statusChart?: Chart;
    private partyChart?: Chart;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(ContractsActions.loadSummary());
    }

    ngAfterViewInit(): void {
        this.countByStatus$.subscribe(map => this.renderStatusPie(map));
        this.topPartiesByCount$.subscribe(rows => this.renderPartyBar(rows));
    }

    ngOnDestroy(): void {
        this.statusChart?.destroy();
        this.partyChart?.destroy();
    }

    private palette(n: number): string[] {
        return Array.from({ length: n }, (_, i) =>
            `hsl(${Math.round((360 / Math.max(1, n)) * i)}, 70%, 55%)`
        );
    }

    private renderStatusPie(map: Record<string, number>) {
        if (!this.statusPieRef) return;

        const labels = Object.keys(map);
        const data = Object.values(map);
        const colors = this.palette(labels.length);
        this.statusChart?.destroy();
        this.statusChart = new Chart(this.statusPieRef.nativeElement.getContext('2d')!, {
            type: 'pie',
            data: { labels, datasets: [{ label: 'Contracts by Status', data, backgroundColor: colors }] },
            options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } }
            }
        });
    }

    private renderPartyBar(rows: [string, number][]) {
        if (!this.partyBarRef) return;

        const labels = rows.map(r => r[0]);
        const data = rows.map(r => r[1]);
        const colors = this.palette(labels.length);
        this.partyChart?.destroy();
        this.partyChart = new Chart(this.partyBarRef.nativeElement.getContext('2d')!, {
            type: 'bar',
            data: { labels, datasets: [{ label: 'Count', data, backgroundColor: colors }] },
            options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
            }
        });
    }
}

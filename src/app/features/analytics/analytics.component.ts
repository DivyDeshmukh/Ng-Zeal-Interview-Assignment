import {
  ChangeDetectionStrategy, Component, ElementRef, OnDestroy, AfterViewInit, ViewChild
} from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Subject, takeUntil } from 'rxjs';
import * as Sel from '../contracts/state/data/contracts.selector';
import { Contract } from 'src/app/models/contracts/contracts.model';
import * as Act from '../contracts/state/data/contracts.actions';

import {
  Chart,
  PieController, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarController, BarElement,
  LineController, LineElement, PointElement
} from 'chart.js';

Chart.register(
  PieController, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarController, BarElement,
  LineController, LineElement, PointElement
);

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pie')  pieRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('bar')  barRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('line') lineRef!: ElementRef<HTMLCanvasElement>;

  private pieChart?: Chart;
  private barChart?: Chart;
  private lineChart?: Chart;

  year = new Date().getFullYear();
  month: number | null = null; // 1..12 or null
  years: number[] = [this.year];
  private didAutoPickYear = false;

  private destroy$ = new Subject<void>();
  private lastAll: Contract[] = [];

  // Use ONLY existing store data: cache + current page
  private contracts$ = combineLatest([
    this.store.select(Sel.selectCache),           // Record<string, Contract>
    this.store.select(Sel.selectContractsList)    // Contract[]
  ]).pipe(
    map(([cache, list]) => {
      const mapObj = { ...cache };
      for (const c of list) mapObj[c.id] = c;
      return Object.values(mapObj) as Contract[];
    })
  );

  
  constructor(private store: Store) {}

  ngAfterViewInit(): void {
    // Re-render whenever store changes
    this.contracts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => {
         if (!list.length) {
          this.store.dispatch(Act.filtersChanged({ filters: { page: 0, size: 500, sort: 'endDate,asc' } }));
        }
        this.lastAll = list;
        this.refreshYearOptions();
        this.render(this.compute(this.lastAll, this.year, this.month));
      });
  }

  ngOnDestroy(): void {
    this.pieChart?.destroy();
    this.barChart?.destroy();
    this.lineChart?.destroy();
    this.destroy$.next(); this.destroy$.complete();
  }

  // UI handlers (no casts in template)
  onYearChange(ev: Event) {
    const v = Number((ev.target as HTMLSelectElement).value);
    if (Number.isFinite(v)) {
      this.year = v;
      this.render(this.compute(this.lastAll, this.year, this.month));
    }
  }
  onMonthChange(ev: Event) {
    const raw = (ev.target as HTMLSelectElement).value;
    this.month = raw ? Number(raw) : null;
    this.render(this.compute(this.lastAll, this.year, this.month));
  }

  // ---- helpers ----
  private normalizeDate(c: Contract): Date | null {
   
    const tryDate = (s?: string) => {
      if (!s) return NaN;
      const d = new Date(s);
      return d.getTime();
    };
    const tEnd = tryDate(c.endDate);
    if (!isNaN(tEnd)) return new Date(tEnd);
    const tStart = tryDate(c.startDate);
    return isNaN(tStart) ? null : new Date(tStart);
  }

  private refreshYearOptions() {
    const yearsSet = new Set<number>();
    for (const c of this.lastAll) {
      const d = this.normalizeDate(c);
      if (d) yearsSet.add(d.getFullYear());
    }
    const yrs = Array.from(yearsSet).sort((a,b)=>b-a);
    if (yrs.length) {
      this.years = yrs;
      if (!this.didAutoPickYear || !this.years.includes(this.year)) {
        this.year = this.years[0];
        this.didAutoPickYear = true;
      }
    } else {
      this.years = [new Date().getFullYear()];
    }
  }

  private compute(list: Contract[], year: number, month: number | null) {
    const inWindow = (d: Date) =>
      month == null ? d.getFullYear() === year
                    : d.getFullYear() === year && d.getMonth() === month - 1;

    const filtered: Contract[] = [];
    for (const c of list) {
      const d = this.normalizeDate(c);
      if (d && inWindow(d)) filtered.push(c);
    }

    // Pie: count by status
    const byStatus: Record<string, number> = {};
    for (const c of filtered) byStatus[c.status] = (byStatus[c.status] ?? 0) + 1;

    // BAR: top parties by total value (any status)
    const partyValue = new Map<string, number>();
    for (const c of filtered) {
      const key = c.party || 'Unknown';
      partyValue.set(key, (partyValue.get(key) ?? 0) + (c.amount || 0));
    }
    let topPartyValue: [string, number][] = [...partyValue.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    if (topPartyValue.length === 0) {
      topPartyValue = [['No data', 0]];
    }

    const monthly = new Array(12).fill(0);
    for (const c of list) {
      const d = this.normalizeDate(c);
      if (d && d.getFullYear() === year) {
        monthly[d.getMonth()] += c.amount || 0;
      }
    }

    return { byStatus, topPartyValue, monthly };
  }

  private render(win: { byStatus: Record<string, number>, topPartyValue: [string, number][], monthly: number[] }) {
    // PIE
    let sLabels = Object.keys(win.byStatus);
    let sData   = Object.values(win.byStatus);
    if (!sData.length) { sLabels = ['No data']; sData = [1]; }

    this.pieChart?.destroy();
    this.pieChart = new Chart(this.pieRef.nativeElement.getContext('2d')!, {
      type: 'pie',
      data: {
        labels: sLabels,
        datasets: [{
          label: 'Count',
          data: sData,
          backgroundColor: ['#4CAF50', '#FF9800', '#F44336', '#2196F3', '#9C27B0'] // custom colors
        }]
      },
      options: { responsive: true }
    });

    // BAR
    const pLabels = win.topPartyValue.map(([p]) => p);
    const pData   = win.topPartyValue.map(([_,v]) => v);
    this.barChart?.destroy();
    this.barChart = new Chart(this.barRef.nativeElement.getContext('2d')!, {
      type: 'bar',
      data: { labels: pLabels.length ? pLabels : ['No data'], datasets: [{ label: 'Value', data: pData.length ? pData : [0] }] },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });

    // LINE
    const lLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    this.lineChart?.destroy();
    this.lineChart = new Chart(this.lineRef.nativeElement.getContext('2d')!, {
      type: 'line',
      data: { labels: lLabels, datasets: [{ label: 'Signed value', data: win.monthly }] },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }
}

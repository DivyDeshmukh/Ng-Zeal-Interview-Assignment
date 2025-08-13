import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { ArcElement, BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, PieController, Tooltip } from "chart.js";

Chart.register(PieController, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

    constructor() {}
}


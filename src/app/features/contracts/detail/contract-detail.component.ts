import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, switchMap } from "rxjs";
import { Contract } from "src/app/models/contracts/contracts.model";
import { selectContractById } from "../state/data/contracts.selector";

@Component({
    selector: 'app-contract-detail-page',
    templateUrl: './contract-detail.component.html',
    styleUrls: ['./contract-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractDetailPageComponent {

    contract$: Observable<Contract | undefined> = this.route.paramMap.pipe(
        map(p => p.get("id")!),
        switchMap(id => this.store.select(selectContractById(id)))
    );

    constructor(private route: ActivatedRoute, private router: Router, private store: Store) {}

    isExpired(c: Contract): boolean {
        const today = new Date();
        const end = new Date();
        return end.getTime() < new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
    }

    daysToExpiry(c: Contract): number | null {
        const today = new Date();
        const end = new Date(c.endDate);
        const ms = end.getTime() - today.getTime();
        if (ms < 0) return null;
        return Math.ceil(ms / (1000 * 60 * 60 * 24));
    }

    backToList() {
        this.router.navigate(['/contracts']);
    }
}
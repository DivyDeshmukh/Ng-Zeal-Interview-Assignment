import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";

@Component({
    selector: 'app-contracts-list',
    templateUrl: './contracts-list.component.html',
    styleUrls: ['./contracts-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractsListComponent {
    showModal: boolean = false;

    constructor() {}
}
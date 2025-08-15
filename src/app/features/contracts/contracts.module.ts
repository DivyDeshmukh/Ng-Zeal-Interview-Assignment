import { NgModule } from "@angular/core";
import { ContractDetailPageComponent } from "./detail/contract-detail.component";
import { ContractsListComponent } from "./list/contracts-list.component";
import { ContractsRoutingModule } from "./contracts-routing.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    declarations: [ContractDetailPageComponent, ContractsListComponent],
    imports: [
        ContractsRoutingModule,
        CommonModule,
        SharedModule
    ],
    exports: [ContractDetailPageComponent, ContractsListComponent]
})
export class ContractsModule {}

import { NgModule } from "@angular/core";
import { ContractDetailPageComponent } from "./detail/contract-detail.component";
import { ContractsListComponent } from "./list/contracts-list.component";
import { ContractsRoutingModule } from "./contracts-routing.module";

@NgModule({
    declarations: [ContractDetailPageComponent, ContractsListComponent],
    imports: [ContractsRoutingModule],
    exports: [ContractDetailPageComponent, ContractsListComponent]
})
export class ContractsModule {}

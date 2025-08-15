import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContractsListComponent } from "./list/contracts-list.component";
import { ContractDetailPageComponent } from "./detail/contract-detail.component";
import { contractByIdResolver, contractsBootstrapResolver } from "./contracts.resolvers";

const routes: Routes = [
    {
        path: '',
        component: ContractsListComponent,
        resolve: { init: contractsBootstrapResolver }
    },
    {
        path: ":id",
        component: ContractDetailPageComponent,
        resolve: { contract: contractByIdResolver }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ContractsRoutingModule {}

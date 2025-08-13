import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContractsListComponent } from "./list/contracts-list.component";
import { ContractDetailPageComponent } from "./detail/contract-detail.component";

const routes: Routes = [
    {
        path: '',
        component: ContractsListComponent,
    },
    {
        path: ":id",
        component: ContractDetailPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ContractsRoutingModule {}

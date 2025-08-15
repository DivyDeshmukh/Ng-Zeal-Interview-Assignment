import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [{
    path: '', component: DashboardComponent,
}];

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class DashboardModule {};

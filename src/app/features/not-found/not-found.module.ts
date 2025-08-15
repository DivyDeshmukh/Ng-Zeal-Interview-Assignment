import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path: '',
        component: NotFoundComponent
    }
]
@NgModule({
    declarations: [NotFoundComponent],
    imports: [
        CommonModule, RouterModule.forChild(routes)
    ]
})
export class NotFoundModule {}

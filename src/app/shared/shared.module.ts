import { NgModule } from "@angular/core";
import { MoneyPipe } from "./pipes/money.pipe";
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppHeaderComponent } from "./components/header/header.component";
import { AppFooterComponent } from "./components/footer/footer.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        MoneyPipe,
        KpiCardComponent,
        AppHeaderComponent,
        AppFooterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MoneyPipe,
        KpiCardComponent,
        AppHeaderComponent,
        AppFooterComponent,
    ]
})
export class SharedModule {}
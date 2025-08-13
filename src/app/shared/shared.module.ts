import { NgModule } from "@angular/core";
import { AppHeaderComponent } from "./components/header/header.component";
import { AppFooterComponent } from "./components/footer/footer.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [AppHeaderComponent, AppFooterComponent],
    imports: [RouterModule],
    exports: [AppHeaderComponent, AppFooterComponent, RouterModule]
})
export class SharedModule {}

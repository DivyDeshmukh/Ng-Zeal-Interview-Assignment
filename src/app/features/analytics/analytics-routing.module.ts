import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { analyticsBootstrapResolver } from './analytics.resolver';

const routes: Routes = [
  { path: '', component: AnalyticsComponent, resolve: { init: analyticsBootstrapResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule {}

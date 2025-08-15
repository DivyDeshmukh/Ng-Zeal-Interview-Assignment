import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {
    path: 'contracts',
    loadChildren: () => import('./features/contracts/contracts.module').then(m => m.ContractsModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./features/analytics/analytics.module').then(m => m.AnalyticsModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SecretComponent } from './secret.component';
import { StatisticsComponent } from './statistics/statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    component: SecretComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretRoutingModule {
}

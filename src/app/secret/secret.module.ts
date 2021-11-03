import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretComponent } from './secret.component';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SecretRoutingModule } from './secret.routing';
import { StatisticsComponent } from './statistics/statistics/statistics.component';

@NgModule({
  declarations: [
    SecretComponent,
    DashboardComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SecretRoutingModule
  ]
})
export class SecretModule { }

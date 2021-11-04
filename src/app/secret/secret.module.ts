import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretComponent } from './secret.component';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SecretRoutingModule } from './secret.routing';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RewardsComponent } from './rewards/rewards.component';

@NgModule({
  declarations: [
    SecretComponent,
    DashboardComponent,
    StatisticsComponent,
    RewardsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SecretRoutingModule,
    NgxChartsModule
  ]
})
export class SecretModule { }

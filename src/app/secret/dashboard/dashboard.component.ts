import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SecretService } from '../secret.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard: any;

  constructor(
    public dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.dashboardService.getLatest();
    this.dashboardService.dashboardSubject$.subscribe(result => {
      this.dashboard = result;
    });
  }

}

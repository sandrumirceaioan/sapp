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
  loading$: Observable<any> = of(false);

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.dashboardService.getLatest();
    this.dashboardService.dashboardSubject$.subscribe(result => {
      this.dashboard = result;
    });
    this.loading$ = this.dashboardService.loadingSubject$;
  }

}

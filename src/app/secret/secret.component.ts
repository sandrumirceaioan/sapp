import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DashboardService } from './dashboard/dashboard.service';
import { SecretService } from './secret.service';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit {

  navigationList = [
    {
      title: "Dashboard",
      tab: "dashboard",
      url: "/secret/dashboard",
      icon: "layers"
    },
    {
      title: "Statistics",
      tab: "statistics",
      url: "/secret/statistics",
      icon: "stats-chart"
    },
    {
      title: "Rewards",
      tab: "rewards",
      url: "/secret/rewards",
      icon: "trophy"
    }
  ]

  constructor(
    private router: Router,
    private authService: AuthService,
    private dashboardService: DashboardService,
    public secretService: SecretService
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut();
  }

  goToPage(url: string) {
    this.router.navigate([url]);
  }

  refresh() {
    this.dashboardService.getLatest();
  }

}

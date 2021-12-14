import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DashboardService } from './dashboard/dashboard.service';
import { SecretService } from './secret.service';
import { filter } from 'rxjs/operators';
import { StatisticsService } from './statistics/statistics.service';
import { RewardsService } from './rewards/rewards.service';


@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit {
  refreshPage: string;

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
    private statisticsService: StatisticsService,
    private rewardsService: RewardsService,
    public secretService: SecretService
  ) {

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.refreshPage = event.url.split('/').pop();
      console.log(this.refreshPage);
    });

  }

  ngOnInit(): void {

  }

  signOut() {
    this.authService.signOut();
  }

  goToPage(url: string) {
    this.router.navigate([url]);
  }

  refresh() {
    switch (this.refreshPage) {
      case 'secret':
        this.dashboardService.getLatest();
        break;

      case 'dashboard':
        this.dashboardService.getLatest();
        break;

      case 'statistics':
        this.statisticsService.getLastDayPrices();
        break;

      case 'rewards':
        this.rewardsService.getRewardsStatus();
        break;
    }

  }

}

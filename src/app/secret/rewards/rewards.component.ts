import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RewardsService } from './rewards.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit, AfterViewInit {
  rewards: any = null;
  loading$: Observable<any>;

  constructor(
    private rewardsService: RewardsService
  ) { 
    this.loading$ = this.rewardsService.loadingRewards$;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.rewardsService.getRewardsStatus();
    this.rewardsService.rewardsSubject$.subscribe(result => {
      this.rewards = result;
    });

  }

  run() {
    this.rewardsService.getRewardsStatus();
  }

}

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { RewardsService } from './rewards.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit, AfterViewInit, OnDestroy {
  rewards: any = null;
  loading$: Observable<any>;
  claimConfirm: boolean = false;
  claimInProgress: boolean = false;
  rewardsClaimSubscription: Subscription = new Subscription();

  constructor(
    public rewardsService: RewardsService,
    private toastService: ToastService
  ) { 

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.rewardsService.getRewardsStatus();
    this.rewardsService.rewardsSubject$.subscribe(result => {
      this.rewards = result;
    });

  }

  getColor() {
    return this.claimConfirm ? 'success': null;
  }

  claim() {
    this.claimInProgress = true;
    this.rewardsClaimSubscription = this.rewardsService.claimRewards(this.rewards).subscribe(
      (result) => {
        console.log(result);
        this.toastService.presentToast({ type: 'success', message: 'Rewards claimed' });
      },
      (error) => {
        console.log(error);
        this.toastService.presentToast({ type: 'danger', message: 'Rewards claim error'});
      },
      () => {
        this.claimConfirm = false;
        this.claimInProgress = false;
        this.rewardsService.getRewardsStatus();
      }
    );
    console.log('claim');
  }


  ngOnDestroy() {
    this.rewardsClaimSubscription.unsubscribe();
  }

}

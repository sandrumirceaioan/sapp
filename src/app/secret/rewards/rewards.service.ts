import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable, Subject } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RewardsService {
  apiPath: string = environment.apiPath;
  rewardsSubject$ = new Subject();
  loadingRewards$ = new Subject();

  constructor(
    private http: HttpClient,
  ) { }

  getRewardsStatus() {
    console.log('status');
    this.loadingRewards$.next(true);
    this.http.get(`${this.apiPath}/rewards/status`).pipe(
      map((result: any) => {
        this.rewardsSubject$.next(result);
        this.loadingRewards$.next(false);
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error.error);
      })
    ).subscribe();
  }

}

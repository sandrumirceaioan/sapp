import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable, interval, Subscription, timer, of, Subject } from 'rxjs';
import { map, catchError, delay, switchMap, take, delayWhen, repeat, takeWhile } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {
    apiPath: string = environment.apiPath;
    statisticsSubject$ = new Subject();
    loadingStatistics$ = new Subject();

    constructor(
        private http: HttpClient,
    ) { }

    // getPricesContinously() {
    //     let condition = 0;
    //     return this.getLastDayPrices().pipe(
    //         delayWhen(() => condition === 0 ? timer(0) : timer(10000)),
    //         repeat(),
    //         switchMap(response => {
    //             condition++;
    //             return of(response);
    //         })
    //     )
    // }

    getLastDayPrices() {
        console.log('statistics');
        this. loadingStatistics$.next(true);
        this.http.get(`${this.apiPath}/statistics/prices`).pipe(
            map((result: any) => {
                this.statisticsSubject$.next(result);
                this. loadingStatistics$.next(false);
                return result;
            }),
            catchError((error) => {
                console.log(error);
                return throwError(error.error);
            })
        ).subscribe();

    }



}

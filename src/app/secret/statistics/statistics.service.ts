import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable, interval, Subscription, timer, of } from 'rxjs';
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

    constructor(
        private http: HttpClient,
    ) { }

    getPricesContinously() {
        let condition = 0;
        return this.getLateDayPrices().pipe(
            delayWhen(() => condition === 0 ? timer(0) : timer(10000)),
            repeat(),
            switchMap(response => {
                condition++;
                return of(response);
            })
        )
    }

    getLateDayPrices(): Observable<any> {
        return this.http.get(`${this.apiPath}/statistics/prices`).pipe(
            map((result: any) => {
                return result;
            }),
            catchError((error) => {
                return throwError(error.error);
            })
        );

    }



}

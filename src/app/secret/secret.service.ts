import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable, interval, Subscription, timer, of } from 'rxjs';
import { map, catchError, delay, switchMap, take, delayWhen, repeat, takeWhile } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class SecretService {
    apiPath: string = environment.apiPath;
    refreshButton: boolean = true;

    constructor(
        private http: HttpClient
    ) { }

}

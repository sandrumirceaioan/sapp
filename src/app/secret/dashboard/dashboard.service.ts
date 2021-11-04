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
export class DashboardService {
  apiPath: string = environment.apiPath;
  dashboardSubject$ = new Subject();
  loadingSubject$ = new Subject();

  constructor(
    private http: HttpClient,
  ) { }

  getLatest() {
    this.loadingSubject$.next(true);
    this.http.get(`${this.apiPath}/statistics/latest`).pipe(
      map((result: any) => {
        this.dashboardSubject$.next(result);
        this.loadingSubject$.next(false);
      }),
      catchError((error) => {
        return throwError(error.error);
      })
    ).subscribe();
  }

}

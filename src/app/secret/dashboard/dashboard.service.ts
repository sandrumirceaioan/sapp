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
  public loading: boolean = false;

  constructor(
    private http: HttpClient,
  ) { }

  getLatest() {
    console.log('dashboard');
    this.loading = true;
    this.http.get(`${this.apiPath}/statistics/latest`).pipe(
      map((result: any) => {
        this.dashboardSubject$.next(result);
        this.loading = false;
      }),
      catchError((error) => {
        console.log(error);
        this.loading = false;
        return throwError(error.error);
      })
    ).subscribe();
  }

}

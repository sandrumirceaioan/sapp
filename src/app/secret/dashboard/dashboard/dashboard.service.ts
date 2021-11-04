import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiPath: string = environment.apiPath;

  constructor(
    private http: HttpClient,
  ) { }

  getLatest(): Observable<any> {
    return this.http.get(`${this.apiPath}/statistics/latest`).pipe(
      map((result: any) => {

        return result;
      }),
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }

}

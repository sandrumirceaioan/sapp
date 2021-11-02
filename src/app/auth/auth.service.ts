import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable, Subject, of } from 'rxjs';
import { map, catchError, debounce, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../shared/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { selectUser } from '../store/selectors/user.selectors';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiPath: string = environment.apiPath;
  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  signIn(email: string, password: string): Observable<any> {
    let user: User = null;
    return this.http.post(`${this.apiPath}/auth/login`, { email, password }).pipe(
      map((result: any) => {
        localStorage.setItem('oth2token', result.token);
        user = {
          _id: result.user._id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
          tradingpartners: result.user.tradingPartnersIds,
          token: result.token
        };
        return user;
      }),
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }

  signOut(): Observable<any> {
    this.removeToken();
    return of(true);
  }

  signUp(name:string ,email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiPath}/auth/register`, { name ,email, password }).pipe(
      map((result: any) => {
       return result;
      }),
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }

  verify(): Observable<any> {
    return this.store.select(selectUser).pipe(
      switchMap(user => {
        if(user.token) {
          return of(user);
        } else {
          let user: User = null;
          return this.http.get(`${this.apiPath}/auth/verify`, httpOptions).pipe(
            map((result: any) => {
              user = {
                _id: result._id,
                email: result.email,
                name: result.name,
                role: result.role,
                tradingpartners: result.tradingPartnersIds,
                token: this.getToken()
              };
              return user;
            }),
            catchError((error) => {
              return throwError(error.error);
            })
          );
        }
      })
    );
  }

  public getToken(): string {
    return localStorage.getItem('oth2token');
  }

  private removeToken() {
    localStorage.removeItem('oth2token');
  }

}

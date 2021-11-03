import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../shared/interfaces/user.interface';
import { ToastService } from '../shared/services/toast.service';
import { Router } from '@angular/router';

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
    private toastService: ToastService,
    private router: Router
  ) { }

  signIn(user: { username: string; password: string }) {
    this.http.post(`${this.apiPath}/users/login`, user, httpOptions).pipe(
      map((result: any) => {
        this.setToken(result.token);
        return result.user;
      }),
      catchError((error) => {
        return throwError(error.error);
      })
    ).subscribe(result => {
      this.toastService.presentToast({ type: 'success', message: `Welcome ${result.username}` });
      this.router.navigate(['/secret']);
    },
      error => {
        console.log('eroare');
        this.toastService.presentToast({ type: 'danger', message: error.message });
      });
  }

  signOut() {
    this.router.navigate(['/auth/login']);
    this.removeToken();
  }

  register(user: User): Observable<User> {
    return this.http.post(`${this.apiPath}/users/register`, user, httpOptions).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }

  verify(): Observable<boolean> {
    let token = this.getToken();
    if (token) {
      return of(true);
    } else {
      return of(false);
    }
  }

  private setToken(token: string) {
    localStorage.setItem('secretToken', token);
  }

  private removeToken() {
    localStorage.removeItem('secretToken');
  }

  public getToken() {
    return localStorage.getItem('secretToken');
  }

}

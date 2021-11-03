import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable, Subject, of } from 'rxjs';
import { map, catchError, debounce, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


}

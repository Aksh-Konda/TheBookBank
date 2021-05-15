import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { LoginResponse } from '../shared/login.response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  login(username, password): Observable<LoginResponse> {
    debugger;
    const reqHeaders = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post<LoginResponse>(baseURL.auth + 'login', { username: username, password: password })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}

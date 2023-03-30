import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, finalize } from 'rxjs/operators';
import { HttpService } from '../services/http.service';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  constructor(private httpService: HttpService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addToken(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (this.isRefreshing) {
            return throwError(error);
          }

          this.isRefreshing = true;
          return this.refreshToken().pipe(
            switchMap(() => {
              request = this.addToken(request);
              return next.handle(request);
            }),
            catchError((err) => {
              this.isRefreshing = false;
              return throwError(error);
            }),
            finalize(() => {
              this.isRefreshing = false;
            })
          );
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = localStorage.getItem('access_token');
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }

  private refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return new Observable((observer) => {
      this.httpService
        .post('auth/refresh-token', {
          refresh_token: refreshToken,
        })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.isRefreshing = false;
            return throwError(error);
          })
        )
        .subscribe((response: any) => {
          localStorage.setItem('access_token', response.body.accessToken);
          observer.next();
          observer.complete();
        });
    });
  }
}

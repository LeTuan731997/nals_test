import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): any {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 404) {
                // Show dialog or notication
                return this.router.navigate(['/home']);
            } else {
                if (err.status === 500) {
                    return this.router.navigate(['/404']);
                } else {
                    return throwError(err);
                }
            }
        }));
    }
}
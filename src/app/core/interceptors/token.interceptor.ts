import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/modules/auth/services/auth.service";
import { catchError, throwError } from "rxjs";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const sessionData = inject(AuthService).loadSession();
    let authReq;

    if (sessionData && sessionData !== null) {
        const authToken = sessionData.token;

        authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`
            }
        });
    }

    return (authReq) ? next(authReq) : next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                inject(AuthService).logout();
                inject(Router).navigate(["/login"]);
            }
            return throwError(() => error);
        })
    );
};

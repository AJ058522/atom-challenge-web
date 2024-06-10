import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "@app/modules/auth/services/auth.service";

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

    return (authReq) ? next(authReq) : next(req);
};

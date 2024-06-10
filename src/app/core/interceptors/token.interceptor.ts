import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "@app/modules/auth/services/auth.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const sessionData = inject(AuthService).loadSession();
    const authToken = sessionData.token.accessToken;

    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return next(authReq);
};

import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "environments/environment";

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
    const newRequest = req.clone({
        url: environment.APIURL + req.url
    });
    return next(newRequest);
};

import { inject } from "@angular/core";
import {
    ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot
} from "@angular/router";

import { AuthService } from "../services/auth.service";

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const isAuthenticated = inject(AuthService).isAuthenticated();
    return (isAuthenticated)
        ? true
        : inject(Router).navigate(["login"]);
};

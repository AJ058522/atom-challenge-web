import { Routes } from "@angular/router";

import { AuthGuard } from "./modules/auth/guards/auth-guard";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full"
    },
    {
        path: "login",
        loadComponent: () => import("./modules/auth/pages/login/login.component").then((m) => m.LoginComponent)
    },
    {
        path: "dashboard",
        loadComponent: () => import("./modules/dashboard/pages/dashboard/dashboard.component")
            .then((m) => m.DashboardComponent),
        canActivate: [AuthGuard]
    },
];

import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./modules/example-page/example-page.component").then((m) => m.ExamplePageComponent)

    },
    {
        path: "login",
        loadComponent: () => import("./modules/auth/pages/login/login.component").then((m) => m.LoginComponent)
    },
    {
        path: "dashboard",
        // eslint-disable-next-line max-len
        loadComponent: () => import("./modules/dashboard/pages/dashboard/dashboard.component").then((m) => m.DashboardComponent)
    },
];

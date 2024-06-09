import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./modules/example-page/example-page.component").then((m) => m.ExamplePageComponent)

    },
    {
        path: "login",
        loadComponent: () => import("./modules/auth/pages/login/login.component").then((m) => m.LoginComponent)

    }
];

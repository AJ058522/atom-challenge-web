import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router } from "@angular/router";
import { AuthService } from "@app/modules/auth/services/auth.service";

@Component({
    selector: "app-dashboard-toolbar",
    standalone: true,
    imports: [MatIconModule, MatToolbarModule, MatButtonModule],
    templateUrl: "./dashboard-toolbar.component.html",
    styleUrl: "./dashboard-toolbar.component.scss"
})
export class DashboardToolbarComponent implements OnInit {
    user: string | undefined;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const userSession = this.authService.loadSession();
        this.user = userSession.email;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(["/login"]);
    }
}

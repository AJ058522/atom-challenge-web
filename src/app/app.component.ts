import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "@app/modules/auth/services/auth.service";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss"
})
export class AppComponent implements OnInit {
    title = "atom-challenge-fe-template";

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        const session = this.authService.loadSession();
        if (session) {
            this.authService.authenticate();
        }
    }
}

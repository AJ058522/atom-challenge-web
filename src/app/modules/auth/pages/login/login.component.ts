import { Component, OnInit } from "@angular/core";
import {
    FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {
    MatDialog,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { LoginDialogComponent } from "@app/modules/auth/components/login-dialog/login-dialog.component";
import { AuthService } from "@app/modules/auth/services/auth.service";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        LoginDialogComponent
    ],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss"
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = new FormGroup({});
    errorMessage: string | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
        });
    }

    onSubmit() {
        this.errorMessage = undefined;

        this.authService.login(this.loginForm.value)
            .then((data: any) => {
                console.log(data);

                if (data.msg === "logged in successfully.") {
                    this.router.navigate(["dashboard"]);
                    this.loginForm.reset();
                } else {
                    this.openDialog();
                }
            }, (error) => {
                this.errorMessage = "Ha ocurrido un error.";
            });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(LoginDialogComponent);

        dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(["dashboard"]);
            this.loginForm.reset();
        });
    }
}

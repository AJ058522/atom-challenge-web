import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
    MatDialogActions,
    MatDialogContent, MatDialogRef
} from "@angular/material/dialog";

@Component({
    selector: "app-login-dialog",
    standalone: true,
    imports: [MatDialogContent, MatDialogActions, MatButton],
    templateUrl: "./login-dialog.component.html",
    styleUrl: "./login-dialog.component.scss"
})
export class LoginDialogComponent {
    constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) {}

    closeDialog() {
        this.dialogRef.close();
    }
}

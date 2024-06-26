import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
    MatDialog,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

import { DashboardToolbarComponent } from "../../components/dashboard-toolbar/dashboard-toolbar.component";
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { TasksTableComponent } from "../../components/tasks-table/tasks-table.component";

@Component({
    selector: "app-dashboard",
    standalone: true,
    imports: [MatIconModule, MatButtonModule, TasksTableComponent, TaskFormComponent, DashboardToolbarComponent],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.scss"
})
export class DashboardComponent {
    updateTable: boolean = false;

    constructor(public dialog: MatDialog) {}

    openDialog(data: any = undefined): void {
        const dialogRef = this.dialog.open(TaskFormComponent, {
            data
        });
        this.updateTable = false;

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
        });

        dialogRef.componentInstance.savedStatus.subscribe((result) => {
            if (result) {
                dialogRef.close();
                this.updateTable = true;
            }
        });
    }

    updateTask(event: any) {
        this.openDialog(event);
    }
}

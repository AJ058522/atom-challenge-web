import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";

import { TasksTableComponent } from "../../components/tasks-table/tasks-table.component";

@Component({
    selector: "app-dashboard",
    standalone: true,
    imports: [MatIconModule, MatButtonModule, MatToolbarModule, TasksTableComponent],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.scss"
})
export class DashboardComponent {

}

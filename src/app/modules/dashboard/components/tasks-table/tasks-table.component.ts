import {
    Component, Input, OnChanges, OnInit, SimpleChanges
} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { TasksService } from "@app/modules/dashboard/services/tasks.service";

export interface Task {
    title: string;
    description: string;
    status: string;
    taskId: string;
    userId: string;
    created_at: any;
}

@Component({
    selector: "app-tasks-table",
    standalone: true,
    imports: [MatTableModule, MatIconModule],
    templateUrl: "./tasks-table.component.html",
    styleUrl: "./tasks-table.component.scss"
})
export class TasksTableComponent implements OnInit, OnChanges {
    @Input() update: boolean = false;
    displayedColumns: string[] = ["title", "description", "status", "actions"];
    dataSource = [];

    constructor(private tasksService: TasksService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["update"].previousValue !== changes["update"].currentValue) {
            console.log("updated");

            this.getTasks();
        }
    }

    ngOnInit(): void {
        this.getTasks();
    }

    getTasks() {
        this.tasksService.getAllTasks().then((resp: Task[] | any) => {
            this.dataSource = resp;
            this.update = false;
        }).catch((error) => {
            this.dataSource = [];
        });
    }
}

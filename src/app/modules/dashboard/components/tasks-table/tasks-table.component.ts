import {
    Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { TasksService } from "@app/modules/dashboard/services/tasks.service";

import { StatusDirective } from "../../directives/status.directive";

export interface Task {
    title: string;
    description: string;
    status: string;
    taskId: string;
    userId: string;
    created_at: any;
    formatted_date: string;
}

@Component({
    selector: "app-tasks-table",
    standalone: true,
    imports: [MatTableModule, MatIconModule, StatusDirective],
    templateUrl: "./tasks-table.component.html",
    styleUrl: "./tasks-table.component.scss"
})
export class TasksTableComponent implements OnInit, OnChanges {
    @Input() update: boolean = false;
    @Output() selectedTask = new EventEmitter<Task>();

    displayedColumns: string[] = ["title", "description", "status", "formatted_date", "actions"];
    dataSource = [];

    constructor(private tasksService: TasksService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["update"].previousValue !== changes["update"].currentValue) {
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

    deleteTask(taskId: string) {
        this.tasksService.deleteTask(taskId).then((resp: any) => {
            this.getTasks();
        });
    }

    updateTask(task: Task) {
        this.selectedTask.emit(task);
    }
}

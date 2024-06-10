import {
    Component, EventEmitter, OnInit, Output
} from "@angular/core";
import {
    FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TasksService } from "@app/modules/dashboard/services/tasks.service";

@Component({
    selector: "app-task-form",
    standalone: true,
    imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule],
    templateUrl: "./task-form.component.html",
    styleUrl: "./task-form.component.scss"
})
export class TaskFormComponent implements OnInit {
    taskForm: FormGroup = new FormGroup({});
    errorMessage: string | undefined;
    @Output() savedStatus = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private tasksService: TasksService,
        public dialogRef: MatDialogRef<TaskFormComponent>
    ) { }

    ngOnInit(): void {
        this.taskForm = this.formBuilder.group({
            title: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(191)]],
            description: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(300)]],
        });
    }

    onSubmit() {
        this.errorMessage = undefined;

        this.tasksService.createTask(this.taskForm.value)
            .then((data) => {
                this.taskForm.reset();
                this.savedStatus.emit(true);
            }, (error) => {
                this.errorMessage = "Ha ocurrido un error.";
            });
    }
}

import {
    Component, EventEmitter, Inject, OnInit, Output
} from "@angular/core";
import {
    FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { TasksService } from "@app/modules/dashboard/services/tasks.service";
import {
    ValidatorFeedbackComponent
} from "@app/modules/shared/components/validator-feedback/validator-feedback.component";

@Component({
    selector: "app-task-form",
    standalone: true,
    imports: [
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        ValidatorFeedbackComponent
    ],
    templateUrl: "./task-form.component.html",
    styleUrl: "./task-form.component.scss"
})
export class TaskFormComponent implements OnInit {
    taskForm: FormGroup = new FormGroup({});
    errorMessage: string | undefined;
    @Output() savedStatus = new EventEmitter<boolean>();
    buttonLabel: string | undefined;

    statusList = [
        {
            name: "Pendiente",
            value: "pending",
        },
        {
            name: "Completada",
            value: "completed",
        }
    ];

    constructor(
        private formBuilder: FormBuilder,
        private tasksService: TasksService,
        public dialogRef: MatDialogRef<TaskFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void {
        this.taskForm = this.formBuilder.group({
            title: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(191)]],
            description: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(300)]],
            status: ["pending", [Validators.required,]],
        });

        if (this.data) {
            this.buttonLabel = "Modificar";
            this.fillForm(this.data);
        } else {
            this.buttonLabel = "Crear";
        }
    }

    fillForm(formData: any) {
        const formProperties = this.taskForm.value;
        const keys = Object.keys(formProperties);

        if (keys.length > 0) {
            for (let index = 0; index < keys.length; index += 1) {
                if (
                    Object.prototype.hasOwnProperty.call(formData, keys[index])
                   && !Array.isArray(formData[keys[index]])
                    && `${formData[keys[index]]}` !== "null"
                ) {
                    const field = this.taskForm.get(`${keys[index]}`);
                    if (field) {
                        field.setValue(`${formData[keys[index]]}`);
                    }
                }
            }
        }
    }

    onSubmit() {
        this.errorMessage = undefined;

        if (this.data) {
            const updatedTask = this.data;
            updatedTask.title = this.taskForm.get("title")?.value;
            updatedTask.description = this.taskForm.get("description")?.value;
            updatedTask.status = this.taskForm.get("status")?.value;
            this.updateTask(this.data.taskId, updatedTask);
        } else {
            this.createTask(this.taskForm.value);
        }
    }

    createTask(formData: any) {
        this.tasksService.createTask(formData)
            .then((data) => {
                this.taskForm.reset();
                this.savedStatus.emit(true);
            }, (error) => {
                this.errorMessage = "Ha ocurrido un error.";
            });
    }

    updateTask(taskId: string, formData: any) {
        this.tasksService.updateTask(taskId, formData)
            .then((data) => {
                this.taskForm.reset();
                this.savedStatus.emit(true);
            }, (error) => {
                this.errorMessage = "Ha ocurrido un error.";
            });
    }
}

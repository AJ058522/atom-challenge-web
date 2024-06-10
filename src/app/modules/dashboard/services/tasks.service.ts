import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@app/modules/auth/services/auth.service";

@Injectable({
    providedIn: "root"
})
export class TasksService {
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {}

    createTask(formData: any) {
        const { userId } = this.authService.loadSession();
        formData.userId = userId;

        return new Promise((resolve, reject) => {
            const response = this.http.post("tasks", formData);
            response.subscribe((data: any) => {
                resolve(data);
            }, (err) => { reject(err); });
        });
    }

    updateTask(taskId: string, formData: any) {
        return new Promise((resolve, reject) => {
            const response = this.http.put(`tasks/${taskId}`, formData);
            response.subscribe((data: any) => {
                resolve(data);
            }, (err) => { reject(err); });
        });
    }

    getOneTask(taskId: string) {
        return new Promise((resolve, reject) => {
            const response = this.http.get(`tasks/${taskId}`);
            response.subscribe((data: any) => {
                resolve(data);
            }, (err) => { reject(err); });
        });
    }

    getAllTasks() {
        const { userId } = this.authService.loadSession();

        return new Promise((resolve, reject) => {
            const response = this.http.get("tasks", { headers: { userId } });
            response.subscribe((data: any) => {
                resolve(data);
            }, (err) => { reject(err); });
        });
    }

    deleteTask(taskId: string) {
        return new Promise((resolve, reject) => {
            const response = this.http.delete(`tasks/${taskId}`);
            response.subscribe((data: any) => {
                resolve(data);
            }, (err) => { reject(err); });
        });
    }
}

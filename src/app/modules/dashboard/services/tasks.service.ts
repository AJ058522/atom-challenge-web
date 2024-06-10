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
                const formattedData = data.map((item: any) => {
                    const formattedDate = this.formatDate(item.created_at);
                    item.formatted_date = formattedDate;
                    return item;
                }).sort(this.orderDates);

                resolve(formattedData);
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

    formatDate(
        created_at : {
            _seconds: number,
            _nanoseconds: number,
        }
    ): string {
        // eslint-disable-next-line no-underscore-dangle
        const date = new Date(created_at._seconds * 1000);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    orderDates(a: any, b: any) {
        const fechaA = new Date(Date.parse(a.formatted_date));
        const fechaB = new Date(Date.parse(b.formatted_date));

        if (fechaA > fechaB) {
            return -1;
        } if (fechaA < fechaB) {
            return 1;
        }
        return 0;
    }
}

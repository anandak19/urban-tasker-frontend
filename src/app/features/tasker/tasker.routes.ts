import { Routes } from "@angular/router";
import { TasksComponent } from "./components/tasks/tasks.component";

export const taskerRoutes: Routes = [
    {
        path: 'tasks',
        component: TasksComponent
    }
]
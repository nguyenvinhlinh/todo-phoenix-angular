import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FutureTasksComponent } from './future-tasks/future-tasks.component';
import { DoingTasksComponent } from './doing-tasks/doing-tasks.component';
import { FinishedTasksComponent } from './finished-tasks/finished-tasks.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/doing-tasks', pathMatch: 'full' },
  {
    path: 'finished-tasks', component: FinishedTasksComponent, children: [
      { path: 'new', component: NewTaskComponent },
      { path: ':id', component: TaskInfoComponent },
      { path: ':id/edit', component: EditTaskComponent }
    ]
  },
  {
    path: 'doing-tasks', component: DoingTasksComponent, children: [
      { path: 'new', component: NewTaskComponent },
      { path: ':id', component: TaskInfoComponent },
      { path: ':id/edit', component: EditTaskComponent }
    ]
  },
  {
    path: 'future-tasks', component: FutureTasksComponent, children: [
      { path: 'new', component: NewTaskComponent },
      { path: ':id', component: TaskInfoComponent },
      { path: ':id/edit', component: EditTaskComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouting {
}

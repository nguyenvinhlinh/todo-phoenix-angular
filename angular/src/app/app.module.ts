import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DoingTasksComponent } from './doing-tasks/doing-tasks.component';
import { FutureTasksComponent } from './future-tasks/future-tasks.component';
import { FinishedTasksComponent } from './finished-tasks/finished-tasks.component';
import { AppRouting } from './app-routing.module';

import { TasksService } from './shared/tasks.service';
import { TaskInfoComponent } from './task-info/task-info.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskListComponent } from './task-list/task-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DoingTasksComponent,
    FutureTasksComponent,
    FinishedTasksComponent,
    TaskInfoComponent,
    NewTaskComponent,
    DropdownDirective,
    EditTaskComponent,
    TaskListComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRouting
  ],
  providers: [TasksService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

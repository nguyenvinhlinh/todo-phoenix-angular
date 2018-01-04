import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
import { Task } from './task.model';
import { TaskResponse, TasksResponse, TaskElixir } from './task_response.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable()
export class TasksService {
  tasksChangeEventEmitter: EventEmitter<null> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getTaskById(id: number): Observable<Task> {
    const url = environment.apiServerUrl + "/tasks/" + id;
    return this.http.get<TaskResponse>(url, { observe: 'body' })
      .take(1)
      .map((body: TaskResponse) => {
        const task = body.task;
        return new Task(task.id, task.name, task.description, task.status, task.inserted_at, task.finished_at);
      }
      );
  }

  getTasksByStatus(status: string): Observable<Task[]> {
    const url = environment.apiServerUrl + "/tasks";
    const params = new HttpParams().set('status', status);

    return this.http.get<TasksResponse>(url, { observe: 'body', params: params })
      .take(1)
      .map((body: TasksResponse) => {
        const tasks = _.map(body.tasks,
          (t: TaskElixir) => { return new Task(t.id, t.name, t.description, t.status, t.inserted_at, t.finished_at); }
        );
        return tasks;
      }
      );
  }

  addNewTask(name: string, description: string, status: string): Observable<Task> {
    const url = environment.apiServerUrl + "/tasks";
    let body: any = {
      name: name,
      description: description,
      status: status
    }

    if (status == 'finished') {
      body.finished_at = new Date();
    }
    return this.http.post<TaskResponse>(url, body, { observe: 'body' })
      .take(1)
      .map((body: TaskResponse) => {
        const task = body.task;
        return new Task(task.id, task.name, task.description, task.status, task.inserted_at, task.finished_at);
      }
      );
  }


  updateTask(id: number, changes: { name?: string, description?: string, status?: string, finished_at?: Date }): Observable<Task> {
    const url = environment.apiServerUrl + "/tasks/" + id;
    return this.http.patch<TaskResponse>(url, changes, { observe: 'body' })
      .take(1)
      .map((body: TaskResponse) => {
        const task = body.task;
        return new Task(task.id, task.name, task.description, task.status, task.inserted_at, task.finished_at);
      }
      );
  }

  deleteTask(id: number): Observable<any> {
    const url = environment.apiServerUrl + "/tasks/" + id;
    return this.http.delete(url).take(1);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Task } from '../shared/task.model';

import { TasksService } from '../shared/tasks.service';


@Component({
  selector: 'app-finished-tasks',
  templateUrl: './finished-tasks.component.html',
  styleUrls: ['./finished-tasks.component.css']
})
export class FinishedTasksComponent implements OnInit, OnDestroy {
  tasks: Task[];
  constructor(private tasksService: TasksService, private route: ActivatedRoute, private router: Router) { }
  subscription: Subscription;

  ngOnInit() {
    this.pullTasks();
    this.subscription = this.tasksService.tasksChangeEventEmitter.subscribe(
      () => this.pullTasks()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewButton(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  private pullTasks(): void {
    this.tasksService.getTasksByStatus('finished').subscribe(
      (tasks: Task[]) => this.tasks = tasks
    );
  }
}

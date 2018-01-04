import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { TasksService } from '../shared/tasks.service';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-future-tasks',
  templateUrl: './future-tasks.component.html',
  styleUrls: ['./future-tasks.component.css']
})
export class FutureTasksComponent implements OnInit, OnDestroy {
  tasks: Task[];
  subscription: Subscription;
  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pullTasks();
    this.subscription = this.tasksService.tasksChangeEventEmitter.subscribe(
      () => { this.pullTasks() }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewButton() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  pullTasks(): void {
    this.tasksService.getTasksByStatus('future').subscribe(
      (tasks: Task[]) => { this.tasks = tasks }
    );
  }
}

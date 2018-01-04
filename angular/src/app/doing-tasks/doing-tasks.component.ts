import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Task } from '../shared/task.model';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-doing-tasks',
  templateUrl: './doing-tasks.component.html',
  styleUrls: ['./doing-tasks.component.css']
})
export class DoingTasksComponent implements OnInit, OnDestroy {
  tasks: Task[];
  subscription: Subscription;
  constructor(private tasksService: TasksService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.pullTasks();
    this.subscription = this.tasksService.tasksChangeEventEmitter.subscribe(
      () => { this.pullTasks() }
    );
  }

  onNewButton(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  private pullTasks(): void {
    this.tasksService.getTasksByStatus('doing').subscribe(
      (tasks: Task[]) => { this.tasks = tasks }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

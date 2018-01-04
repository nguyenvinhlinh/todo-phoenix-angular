import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TasksService } from '../shared/tasks.service';
import { Task } from '../shared/task.model';
@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent implements OnInit {
  task: Task;
  constructor(private route: ActivatedRoute, private tasksService: TasksService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        this.pullTask(id);
      }
    );
  }

  onClickEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onClickDelete(): void {
    const id = this.route.snapshot.params['id'];
    this.tasksService.deleteTask(id).
      subscribe(
      () => {
        this.router.navigate(['../'], { relativeTo: this.route });
        this.tasksService.tasksChangeEventEmitter.emit();
      }
      );
  }

  onChangeStatusToFuture(): void {
    const changes = { status: 'future', finished_at: null };
    this.tasksService.updateTask(this.task.id, changes).subscribe(
      (task: Task) => {
        this.task = task;
        this.redirectToShowPage();
      }
    );
  }
  onChangeStatusToDoing(): void {
    const changes = { status: 'doing', finished_at: null };
    this.tasksService.updateTask(this.task.id, changes).subscribe(
      (task: Task) => {
        this.task = task;
        this.redirectToShowPage();
      }
    );
  }
  onChangeStatusToFinished(): void {
    const changes = { status: 'finished', finished_at: new Date() };
    this.tasksService.updateTask(this.task.id, changes).subscribe(
      (task: Task) => {
        this.task = task;
        this.redirectToShowPage();
      }
    );
  }

  private redirectToShowPage() {
    switch (this.task.status) {
      case 'future':
        this.router.navigate(['/future-tasks', this.task.id]);
        break;
      case 'doing':
        this.router.navigate(['/doing-tasks', this.task.id]);
        break;
      case 'finished':
        this.router.navigate(['/finished-tasks', this.task.id]);
        break;
    }
  }

  private pullTask(id: number) {
    this.tasksService.getTaskById(id).subscribe(
      (task: Task) => this.task = task
    );
  }
}

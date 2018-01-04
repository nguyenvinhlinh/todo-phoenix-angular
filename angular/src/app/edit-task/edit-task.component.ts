import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from '../shared/task.model';
import { TasksService } from '../shared/tasks.service';
@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html'
})
export class EditTaskComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  task: Task
  taskStatusOptions = ['future', 'doing', 'finished'];

  constructor(private route: ActivatedRoute, private tasksService: TasksService, private router: Router) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.tasksService.getTaskById(id).subscribe(
      (task: Task) => { this.task = task }
    );
  }

  onSubmit(): void {
    let changes: any = {};
    if (this.task.name != this.editForm.value['name']) {
      changes.name = this.editForm.value['name'];
    }
    if (this.task.description != this.editForm.value['description']) {
      changes.description = this.editForm.value['description'];
    }
    if (this.task.status != this.editForm.value['status']) {
      changes.status = this.editForm.value['status'];
      (changes.status == 'finished') ? changes.finished_at = new Date() : changes.finished_at = null;
    }
    this.tasksService.updateTask(this.task.id, changes).subscribe(
      (task: Task) => {
        this.tasksService.tasksChangeEventEmitter.emit();
        switch (task.status) {
          case "future":
            this.router.navigate(['/future-tasks', task.id]);
            break;
          case "doing":
            this.router.navigate(['/doing-tasks', task.id]);
            break;
          case "finished":
            this.router.navigate(['/finished-tasks', task.id])
            break;
        }
      }
    );
  }
}

import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TasksService } from '../shared/tasks.service';
import { Task } from '../shared/task.model';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  taskStatusOptions = ['future', 'doing', 'finished'];
  defaultTaskStatus: string;

  @ViewChild('newForm') newForm: NgForm;
  constructor(private tasksService: TasksService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    switch (this.route.parent.snapshot.routeConfig.path) {
      case 'future-tasks':
        this.defaultTaskStatus = 'future';
        break;
      case 'doing-tasks':
        this.defaultTaskStatus = 'doing';
        break;
      case 'finished-tasks':
        this.defaultTaskStatus = 'finished';
        break;
    }
  }

  onSubmit() {
    let name = this.newForm.value['name'];
    let description = this.newForm.value['description'];
    let status = this.newForm.value['status'];
    this.tasksService.addNewTask(name, description, status).subscribe(
      (task: Task) => {
        this.tasksService.tasksChangeEventEmitter.emit();
        this.newForm.reset({ 'status': this.defaultTaskStatus });
      }
    );
  }
}

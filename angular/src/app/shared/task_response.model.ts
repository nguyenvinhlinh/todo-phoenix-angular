import { Task } from './task.model';

export interface TasksResponse {
  tasks: TaskElixir[];
}
export interface TaskResponse {
  task: TaskElixir;
}

export interface TaskElixir {
  id: number;
  name: string;
  description: string;
  status: string;
  inserted_at: Date;
  finished_at: Date;
}

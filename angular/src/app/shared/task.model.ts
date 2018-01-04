export class Task {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  finishedAt: Date;

  constructor(id: number, name: string, description: string, status: string, createdAt?: Date, finishedAt?: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;

    if (createdAt) {
      this.createdAt = createdAt;
    }
    if (finishedAt) {
      this.finishedAt = finishedAt;
    }
  }
}

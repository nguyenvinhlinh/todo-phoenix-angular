defmodule Todo.Api.TaskView do
  use Todo.Web, :view

  alias Todo.Task

  def render("task.json", %{task: task}) do
    %{
      task: task_to_json(task)
    }
  end

  def render("tasks.json", %{tasks: tasks}) do
    %{
      tasks: Enum.map(tasks, &task_to_json(&1))
    }
  end

  def task_to_json(task = %Task{}) do
    %{
      id: task.id,
      name: task.name,
      description: task.description,
      status: task.status,
      finished_at: task.finished_at,
      inserted_at: task.inserted_at,
      updated_at: task.updated_at
    }
  end
end

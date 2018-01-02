defmodule Todo.Api.TaskView do
  use Todo.Web, :view

  alias Todo.Task

  def render("task.json", %{task: task}) do
    %{
      task: task_to_json(task)
    }
  end

  def task_to_json(task = %Task{}) do
    %{
      id: task.id,
      name: task.name,
      description: task.description,
      status: task.status,
      inserted_at: task.inserted_at,
      updated_at: task.updated_at
    }
  end
end

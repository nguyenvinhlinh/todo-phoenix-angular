defmodule Todo.Api.TaskController do
  use Todo.Web, :controller

  alias Todo.Task

  def get_tasks(conn, params) do
    tasks = Task.query_all_tasks()
    |> Task.query_by_status(Map.get(params, :status, nil))
    |> Repo.all()

    render(conn, "tasks.json", tasks: tasks)
  end

  def get_task(conn, %{"id" => id}) do
    task = Repo.get(Task, id)
    case task do
      nil -> json(conn, %{ message: "TASK NOT FOUND"})
      task -> render(conn, "task.json", task: task)
    end
  end

  def post_task(conn, %{"name" => name, "description" => description, "status" => status} = params) do
    changeset = Task.changeset(%Task{}, params)
    case Repo.insert(changeset) do
      {:ok, task} -> render(conn, "task.json", task: task)
      {:error, changeset} -> json(conn, %{message: "Cannot create new task"})
    end
  end

  def delete_task(conn, %{"id" => id}) do
    task = Repo.get(Task, id)
    process_detele_task(conn, task)
  end

  def update_task(conn, %{"id"=> id, "task" => task_params}) do
    task = Repo.get(Task, id)
    process_update_task(conn, task, task_params)
  end

  defp process_update_task(conn, nil, _), do: json(conn, %{ message: "TASK NOT FOUND"})
  defp process_update_task(conn, _, nil), do: json(conn, %{ message: "NO TASK FIELDS"})
  defp process_update_task(conn, task, params) do

  end

  defp process_detele_task(conn, nil), do: json(conn, %{ message: "TASK NOT FOUND"})
  defp process_detele_task(conn, task) do
    case Repo.delete(task) do
      {:ok, _} -> json(conn, nil)
      {:error, _} -> json(conn, %{ message: "TASK CANNOT BE DELETED"})
    end
  end
end

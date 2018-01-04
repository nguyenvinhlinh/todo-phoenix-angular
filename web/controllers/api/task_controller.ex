defmodule Todo.Api.TaskController do
  use Todo.Web, :controller
  alias Todo.Task
  alias Plug.Conn
  plug :plug_cors

  def get_tasks(conn, params) do
    tasks = Task.query_all_tasks()
    |> Task.query_by_status(Map.get(params, "status", nil))
    |> Repo.all()

    conn
    |> render("tasks.json", tasks: tasks)
  end

  def get_task(conn, %{"id" => id}) do
    task = Repo.get(Task, id)
    case task do
      nil ->
        conn
        |> Plug.Conn.put_status(404)
        |> json(%{ message: "TASK NOT FOUND"})
      task -> render(conn, "task.json", task: task)
    end
  end

  def post_task(conn, %{"name" => _name, "description" => _description, "status" => _status} = params) do
    changeset = Task.changeset(%Task{}, params)
    case Repo.insert(changeset) do
      {:ok, task} -> render(conn, "task.json", task: task)
      {:error, _changeset} -> json(conn, %{message: "Cannot create new task"})
    end
  end

  def delete_task(conn, %{"id" => id}) do
    task = Repo.get(Task, id)
    process_detele_task(conn, task)
  end

  defp process_detele_task(conn, nil) do
    conn
    |> put_status(404)
    |> json(%{ message: "TASK NOT FOUND"})
  end
  defp process_detele_task(conn, task) do
    case Repo.delete(task) do
      {:ok, _} ->
        conn
        |> Plug.Conn.put_status(204)
        |> json(nil)
      {:error, _} -> json(conn, %{ message: "TASK CANNOT BE DELETED"})
    end
  end

  def update_task(conn, %{"id" => id} = params) do
    task = Repo.get(Task, id)
    process_update_task(conn, task, params)
  end

  defp process_update_task(conn, nil, _) do
    conn
    |> Plug.Conn.put_status(404)
    |> json(%{ message: "TASK NOT FOUND"})
  end
  defp process_update_task(conn, _, nil), do: json(conn, %{ message: "NO TASK FIELDS"})
  defp process_update_task(conn, task, params) do
    changeset = Task.changeset(task, params)
    case Repo.update(changeset) do
      {:ok, task} -> render(conn, "task.json", task: task)
      {:error, _changeset} -> json(conn, %{message: "CANNOT UPDATE"})
    end
  end

  def options(conn, _) do
    conn
    |> Conn.put_resp_header("Access-Control-Allow-Origin", "*")
    |> Conn.put_resp_header("Access-Control-Allow-Methods", "POST, PATCH, DELETE")
    |> Conn.put_resp_header("Access-Control-Allow-Headers", "Content-Type")
    |> Conn.send_resp(204, "")
  end

  def plug_cors(conn, _) do
    conn
    |> Conn.put_resp_header("Access-Control-Allow-Origin", "*")
  end
end

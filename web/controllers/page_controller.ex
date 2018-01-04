defmodule Todo.PageController do
  use Todo.Web, :controller
  
  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> render "index.html"
  end
end

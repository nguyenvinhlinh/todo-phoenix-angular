defmodule Todo.Task do
  use Todo.Web, :model

  schema "tasks" do
    field :name, :string
    field :description, :string
    field :status, :string
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :description, :status])
    |> validate_required([:name, :description, :status])
  end
  
  def query_all_tasks(), do: from t in __MODULE__

  def query_by_status(query, nil), do: query
  def query_by_status(query, ""), do: query
  def query_by_status(query, status) do
    from t in query, where: t.status == ^status
  end
  
end

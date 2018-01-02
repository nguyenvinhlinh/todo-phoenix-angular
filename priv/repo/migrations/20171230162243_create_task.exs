defmodule Todo.Repo.Migrations.CreateTask do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :name, :string
      add :description, :text
      add :status, :string

      timestamps()
    end
  end
end

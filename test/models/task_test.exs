defmodule Todo.TaskTest do
  use Todo.ModelCase

  alias Todo.Task

  @valid_attrs %{description: "some description", name: "some name", status: "some status"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Task.changeset(%Task{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Task.changeset(%Task{}, @invalid_attrs)
    refute changeset.valid?
  end
end

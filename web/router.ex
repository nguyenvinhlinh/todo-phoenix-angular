defmodule Todo.Router do
  use Todo.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Todo do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", Todo.Api do
    pipe_through :api
    scope "/tasks" do
      get "/", TaskController, :get_tasks
      post "/", TaskController, :post_task
      get "/:id", TaskController, :get_task
      patch "/:id", TaskController, :update_task
      delete "/:id", TaskController, :delete_task
      #This section for CORS
      options "/", TaskController, :options
      options "/:id", TaskController, :options
    end
  end
end

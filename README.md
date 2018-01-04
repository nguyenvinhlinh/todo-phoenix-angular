# Todo - Just another TODO application

# Architecture
  The application using phoenix web framework mainly as an API server. However, It also use the phoenix server to render index.html which initialize Angular bundles.


To start your Phoenix app:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Start Phoenix endpoint with `mix phoenix.server`
  * Go to angular directory and install npm dependencies: `cd angular; npm install;`
  * Build and watch file changes with angular-cli: `ng build --watch`

In case your angular-cli does not re-compile, use this command to build `ng build --watch --poll=3000`
  

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

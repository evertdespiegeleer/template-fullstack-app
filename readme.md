# Template fullstack application

## About

This is a WIP template monorepo for a fullstack application.

It's built around the following technologies:
- Typescript
- React with Vite frontend
- Node backend
- Zod for data validation
- zhttp for API definition
- Orval for api client
- Postgres Database
- Kysely for database access
- Docker

### Particular stuff worth mentioning

#### Dependabot automerge
A github job is set up to automatically merge dependabot pull requests if the pipeline succeeds. [This job needs a personal access token](https://github.com/marketplace/actions/dependabot-auto-merge#token-scope).

#### Frontend runtime environment variables
A mechanism is set up so that frontend env vars can be used at runtime. The built container can take in environment variables.
Which environment variables are read is determined by the [env.template.json file in the frontend package](./packages/app/frontend/env.template.json).

## Get started

Run the dev setup
```sh
npm run init
```

Start the application
```
docker compose up
```
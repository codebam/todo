# Todo

First copy `env-sample` to `.env` and edit it to your liking

Then build and start with

```
docker run --rm -w="/home/node/app" -v ./:/home/node/app:z node:current-alpine npm i && npm run build
docker-compose up -d
```

If you're using podman, select docker.io (docker hub) as your source when
prompted.

The react app is accessible on [127.0.0.1:4200](http://127.0.0.1:4200)

The nest api is accessible on [127.0.0.1:3333/api](http://127.0.0.1:3333/api)

The postgresql database is accessible on 127.0.0.1:5432

`nx serve` and therefore `npm run start` doesn't work for `todo` due to a bug
with custom webpack configurations in nx. If you want to use `nx serve` to
serve the app, `git checkout 458fe666a3b9d62520cb3db2eae4189581e4f9fc --
workspace.json` and comment out the `http` service inside the
`docker-compose.yml`. Just note that if you change the API URL, port, or prefix
from the defaults you won't be able to access it on the frontend.

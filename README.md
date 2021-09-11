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

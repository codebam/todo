# Todo

Start with

```
docker run --rm -w="/home/node/app" -v ./:/home/node/app:z node:current-alpine npm i && npm run build
docker-compose up -d
```

If you're using podman, select docker.io (docker hub) as your source when
prompted.

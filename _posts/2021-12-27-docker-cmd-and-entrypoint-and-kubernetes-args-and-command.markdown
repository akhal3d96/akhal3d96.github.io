---
layout: post
title:  Docker CMD and ENTRYPOINT and Kubernetes args and command
---

## Docker

Without passing any commands to `docker run` both do the same job. However, when `docer run` is used CMD is replaced if an argument was provided to `docker run` while ENTRYPOINT will append the arguments to the value defined in the entry point. 

You can use both inside the Dockerfile as the parameters of `CMD` will be appended to `ENTRYPOINT`.

### CMD
```dockerfile
# docker run ubuntu-sleep sleep 10

FROM ubuntu

CMD sleep
```

### ENTRYPOINT
```dockerfile
# docker run ubuntu-sleep 10

FROM ubuntu

ENTRYPOINT ["sleep"]
```

## Kubernetes
It's dead simple, `args` in equivalent to `CMD` and `command` is equivalent to `ENTRYPOINT`
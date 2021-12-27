---
layout: post
title:  Difference between Docker CMD and ENTRYPOINT
---

CMD is replaced if an argument was provided to `docker run` while ENTRYPOINT will append the arguments to the value defined in the entry point. 

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


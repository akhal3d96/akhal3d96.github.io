---
layout: post
title:  Exploring Nanos unikernel
---

![Nanos](/assets/nanos.svg)

A unikernel is an operating system running a single application on top of it, in other terms only one process, there's no multiprocessing in nanos unikernel, however, multithreading is supported.

Using unikernel gives more performance enhancement over monolithic kernel and more security and enormous reduction in the attack surface and also very simplified operations.

![Nanos Security](/assets/nanos_security.png)

What makes *nanos* even more special is that it's written from scratch but it also implements many UNIX system calls so that it can run Linux ELF binaries with minimum and sometimes zero modifications.

It doesn't even stop at that, nanos has an internal in-kernel HTTP server for monitoring, remote management and debugging. The interface uses normal Javascript and WebSocket to pull data from a common information stores that can be updated on-demand from the management interface. It's still a work-in-progress but it's very promising.


## Project architecture

The main driver behind Nano VMs is `nanos` unikernel which is orchestrated using `ops` tool it was confusing for me at first.

`ops` provide some pre-compiled suitable to work with `nanos` without any additional configuration such as Ruby, Node, Python, NGINX, Java.

To get a list of all the packages or pre-compiled binaries

```bash
ops pkg list
```

## Installation


* Dependencies: 

```
sudo apt install qemu-kvm qemu-utils
```


* Ops

I'm not a fan of piping curl output to a shell but that's what I found on their documentation.

```
curl https://ops.city/get.sh -sSfL | sh
```


## Usage

Let's try this simple Python 3 HTTP server


```python
import http.server
import socketserver
from http import HTTPStatus
from pathlib import Path
import os

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(HTTPStatus.OK)
        self.end_headers()
        self.wfile.write(b'Hello world from nanos!\n')

        cwd = "Current directoty: {}\n".format(Path.cwd())
        self.wfile.write(cwd.encode())

        ls = os.listdir()
        self.wfile.write(str(ls).encode())


httpd = socketserver.TCPServer(('', 8000), Handler)
httpd.serve_forever()
```


```bash
ops pkg load python_3.8.6 -p 8000 -a server.py
```

Then from another terminal

```bash
$ curl 127.0.0.1:8000

Hello world from nanos!
Current directoty: /
['dev', 'usr', 'lib64', 'etc', 'lib', 'python_3.8.6', 'proc', 'sys', 'server.py']
```

It works so smooth `ops` making deploying applications so simple and the output is quite interesting.


## Resources

- [From the Ground Up: How We Built the Nanos Unikernel - Will Jhun, NanoVMs, Inc.](https://www.youtube.com/watch?v=0v21hGvCDPY)
- [Nanos: The Book](https://nanos.org/thebook)
- [Ops](https://docs.ops.city/ops/)
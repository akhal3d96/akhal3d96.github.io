---
layout: post
title:  Maintain local domains for your private network
---

I have always wanted to access private servers (accessed only through VPN or SSH tunnels) through domains without going through the hassle of locally modifying hosts files in the client side (me and my colleagues) or the SSH config files, so here's my attempt to solve this problem.

I used a `t3a.nano` AWS EC2 instance to demonstrate the idea with Ubuntu 20.04 on it, with `OpenVPN` as my VPN server and `dnsmasq` as a DNS server.

I used `dnsmasq` instead of something like `BIND` because it's much easier to setup and maintain. 

## OpenVPN
This was made only for demonstration purpose, so to quickly setting up an OpenVPN server without pain I used [angristan/openvpn-install](https://github.com/angristan/openvpn-install) script to do so.

```bash
curl -O https://raw.githubusercontent.com/angristan/openvpn-install/master/openvpn-install.sh

chmod +x openvpn-install.sh

CLIENT=<name of your choice> PORT_CHOICE=2 PORT=443 PROTOCOL_CHOICE=2 AUTO_INSTALL=y ./openvpn-install.sh
```

This will generate an OpenVPN profile with the name you chose in your home directory.


## systemd-resolvd

In order for the DNS server we will use we have to disable `systemd-resolvd` from listening to port 53:

```
# /etc/systemd/resolved.conf

[Resolve]
DNSStubListener=no
```

## dnsmasq

```bash
apt install dnsmasq
```

Set localhost addresses as the only nameservers in `/etc/resolv.conf` to route all the DNS queries to our DNS server 

```
# /etc/resolv.conf

nameserver ::1
nameserver 127.0.0.1
options trust-ad
```

Now for the dnsmasq configuration:

```
# /etc/dnsmasq.conf

no-resolv
local=/lan/
listen-address=::1,127.0.0.1,10.0.1.136
expand-hosts
domain=lan
cache-size=1000
server=8.8.8.8
server=8.8.4.4
```

#### dnsmasq configuration explained:

no-resolv: don't read `/etc/resolv.conf`

listen-address: The addresses we want to listen for a connection from. `10.0.1.136` is the private IP of the EC2 instance dnsmasq is installed in.

domain and local: our custom domain `.lan`

expand-hosts: To read hostnames from `/etc/hosts` and resolve it as `hostname.lan`

cache-size: cache 1000 DNS query. Default is 150.

server: if dnsmasq can't resolve the query call an external server



To add a new host or domain to the network simply add it in the hosts file:

```
# /etc/hosts

...
10.0.1.136 messi
10.0.1.136 salah
...
```

## Test our setup
Now to test if our configuration works I run `dig` from my client machine, which is connected to my private network through VPN, with the domains `messi.lan` and `salah.lan`

messi.lan
```
# dig messi.lan
; <<>> DiG 9.16.8-Ubuntu <<>> messi.lan
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 56241
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;messi.lan.			IN	A

;; ANSWER SECTION:
messi.lan.		0	IN	A	10.0.1.136

;; Query time: 448 msec
;; SERVER: 127.0.0.53#53(127.0.0.53)
;; MSG SIZE  rcvd: 54
```


salah.lan
```
# dig salah.lan
; <<>> DiG 9.16.8-Ubuntu <<>> salah.lan
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 43569
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;salah.lan.			IN	A

;; ANSWER SECTION:
salah.lan.		0	IN	A	10.0.1.136
;; Query time: 384 msec
;; SERVER: 127.0.0.53#53(127.0.0.53)
;; MSG SIZE  rcvd: 54
```

Both returned our server IP address in the answer section. It works perfectly. 

You can even use any web server (e.g: nginx) to test out setup by specifying different server names and request it from our client machine.

## Notes
* You might need to configure your OpenVPN client to use your DNS server address.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1kpqe70y1vjhqt8e94po.png)

## To Do
* Configure OpenVPN to route only internal traffic through the VPN
* Cache the DNS queries locally to improve performance.
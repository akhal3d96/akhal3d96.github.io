---
layout: post
title:  Exploring Ceph in a multi-node setup
---
## Introduction

Caph is the future of data storage whether it was objects, blocks or a file system. It provides a great alternative to self-hosted solutions such as GlusterFS in the realm of file systems and to managed services such as AWS S3 as an object storage where it makes more sense to host your own data because you have to store it on private cloud or simply to reduce costs as S3 costs sometimes grow to be pretty [insane](https://twitter.com/QuinnyPig/status/1443028078196711426).

## Environment setup
 
I used Vagrant to create a declarative configuration of my environment.

My setup consist of three virtual machines with Ubuntu 20.04 and attached disk storage of 10 GiB to each one of them (except the first machine it has two disks). Ceph documentation says the minimum disk size is 5 GiB but I had problems in the past working with storage less than 10 GiB so I wanted to be in the safe side.

I gave the admin host more memory than the others because it's the one I mainly interact with and I wanted to make it fast and smooth as possible.

```ruby
# Vagrantfile

# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  num_of_nodes = 3
  (0..(num_of_nodes - 1)).each do |node|
    
    node_name = "ceph-#{node + 1}"
    
    config.vm.define node_name do |ceph_node|
      ceph_node.vm.box = "ubuntu/focal64"
      ceph_node.vm.hostname = node_name
      ceph_node.vm.network "private_network", type: "dhcp"

      ceph_node.vm.disk :disk, size: "10GB", name: "ceph_storage"

      # CephFS
      ceph_node.vm.disk :disk, size: "10GB", name: "ceph_storage_extra" if node == 0

      ceph_node.vm.provision "shell", path: "install-docker.sh"
      ceph_node.vm.provision "shell", inline: "timedatectl set-ntp on"

      ceph_node.vm.provider "virtualbox" do |vb|
        vb.memory = node == 0 ? "3072" : "2048"
      end
    end
  end
end
```

I used `cephadm` to create my Ceph cluster, which requires Docker (or Podman) to be installed on the machine I want to run it on so I made Vagrant execute [install-docker.sh](https://gist.github.com/EvgenyOrekhov/1ed8a4466efd0a59d73a11d753c0167b#file-install-docker-sh) on all the virtual machines it creates but I edited it to suit my needs.


```bash
# install-docker.sh

#!/bin/sh

set -o errexit
set -o nounset

IFS=$(printf '\n\t')

apt remove --yes docker docker-engine docker.io containerd runc || true
apt update
apt --yes --no-install-recommends install apt-transport-https ca-certificates
wget --quiet --output-document=- https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository --yes "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/ubuntu $(lsb_release --codename --short) stable"
apt update
apt --yes --no-install-recommends install docker-ce docker-ce-cli containerd.io
systemctl enable docker
printf '\nDocker installed successfully\n\n'
```

I also activated time synchronization on all the hosts in the `Vagrantfile` because it was disabled for some reason and Ceph requires it to be activated.

```bash
$ timedatectl set-ntp on
```

After running `vagrant up` you should have three virtual machines on a private network which is also accessible from your host machine in something like this:

```
ceph-1 (admin)
IPv4 address for enp0s8: 172.28.128.7


ceph-2
IPv4 address for enp0s8: 172.28.128.8


ceph-3
IPv4 address for enp0s8: 172.28.128.9
```

## Creating the cluster

On the host machine:

```bash
vagrant ssh ceph-1
```

To create our Ceph cluster using `cephadm` we have to download the script from Github **on the admin host machine** and make it executable:

```bash
curl --silent --remote-name --location https://github.com/ceph/ceph/raw/pacific/src/cephadm/cephadm

chmod +x cephadm
```

The script itself is sufficient enough to bootstrap the cluster but it's more convenient to install it as a package on the system.

```bash
./cephadm add-repo --release pacific
./cephadm install
```

After that we can bootstrap our cluster safely:

```
cephadm bootstrap --mon-ip 172.28.128.7 --ssh-user vagrant
```

Obviously `172.28.128.7` is the IP of the admin host (current host).

From Ceph documentation:

> The --ssh-user *<user>* option makes it possible to choose which ssh user cephadm will use to connect to hosts. The associated ssh key will be added to /home/*<user>*/.ssh/authorized_keys. The user that you designate with this option must have passwordless sudo access.

This is slightly off-topic but Vagrant by default creates a passwordless sudo and passwordless SSH access to the virtual machines in creates, the SSH access is possible through private key which it creates and puts in `.vagrant/machines/*<machine name>*/virtualbox/private_key` in the host Vagrantfile directory. Vagrant also maps Vagrantfile directory to `/vagrant` in the guest virtual machine, so for example `ceph-3` host private SSH key is located in `ceph-1` host in directory `/vagrant/.vagrant/machines/ceph-3/virtualbox/private_key`

Anyway, back to Ceph, after running the bootstrap command you should get your dashboard credentials:

 ![ceph initial credentials](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lwdn39lh829s1nal3k2y.png)

After that, from your host machine, replace `ceph-1` with the IP of the virtual machine of your admin host in order to access the dashboard. The dashboard will ask you to change your password to a new one do it and make sure you can access the dashboard successfully. 

If everything run smoothly we can now add new hosts to the cluster.

First we run `ssh-agent`

```bash
eval $(ssh-agent)
```

Then we add the private keys of the other virtual machines (`ceph-2` and `ceph-3`) we want to add to the cluster.

```bash
ssh-add /vagrant/.vagrant/machines/ceph-2/virtualbox/private_key

ssh-add /vagrant/.vagrant/machines/ceph-3/virtualbox/private_key
```

We now copy Ceph public keys to `authorized_keys` in the other virtual machines to make Ceph able to access those machines and add them to the cluster.

```bash
ssh-copy-id -f -i /etc/ceph/ceph.pub vagrant@172.28.128.9
ssh-copy-id -f -i /etc/ceph/ceph.pub vagrant@172.28.128.8
```


Add them to the clusters.

```bash
sudo ceph orch host add ceph-2 172.28.128.8
sudo ceph orch host add ceph-3 172.28.128.9
```

Notice that the hostname should match the hostname on those machines.

It might take some time (couple of minutes in my case) for Ceph to pull all the images and run all the containers on those machines in order to be added to the cluster.

Make sure all the other hosts are added you should open the dashboard and get something like this:

![ceph dashboard after adding the three hosts](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7ua0d6tbbni1fb7whnst.png)

Notice that the cluster health is yellow because there's no storage yet Ceph can use to store data in it. 

Finally in order to add the disks we attached earlier we have to deploy OSD Service.

```bash
sudo ceph orch apply osd --all-available-devices
```

It might take some time (couple of minutes too) until it propagate in the three hosts and add their attached disks.

After that your cluster status should be healthy and you can run object storage services and file system services in your cluster.

![ceph dashboard showing a healthy ceph cluster](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dpi8agp89cj1qk5op1nk.png)

### Object Storage

To use the Object Gateway a RGW service must be running.

```bash
ceph orch apply rgw s3
```

You should also create a `radosgw` user in order to access the object gateway service whether it was from an API or from Ceph dashboard.

```bash
ceph dashboard set-rgw-credentials

radosgw-admin user create --uid="ahmed" --display-name="Ahmed Khaled" --system
```

You should get a result similar to this:

```json
{
    "user_id": "ahmed",
    "display_name": "Ahmed Khaled",
    "email": "",
    "suspended": 0,
    "max_buckets": 1000,
    "subusers": [],
    "keys": [
        {
            "user": "ahmed",
            "access_key": "05LT3KPECW7E30X2P4UO",
            "secret_key": "bBEJBxiM6JkRDUzCpGzN7EkGaVr9qSjqlDdNZWMp"
        }
    ],
    "swift_keys": [],
    "caps": [],
    "op_mask": "read, write, delete",
    "system": "true",
    "default_placement": "",
    "default_storage_class": "",
    "placement_tags": [],
    "bucket_quota": {
        "enabled": false,
        "check_on_raw": false,
        "max_size": -1,
        "max_size_kb": 0,
        "max_objects": -1
    },
    "user_quota": {
        "enabled": false,
        "check_on_raw": false,
        "max_size": -1,
        "max_size_kb": 0,
        "max_objects": -1
    },
    "temp_url_keys": [],
    "type": "rgw",
    "mfa_ids": []
}
```

The `access_key` and `secret_key` are what we care about the most in the result.

In order to access the object gateway from the dashboard we should import the access key and the secret key.

```bash
echo 05LT3KPECW7E30X2P4UO > /tmp/access_key
echo bBEJBxiM6JkRDUzCpGzN7EkGaVr9qSjqlDdNZWMp > /tmp/secret_key

ceph dashboard set-rgw-api-access-key -i /tmp/access_key 
ceph dashboard set-rgw-api-secret-key -i /tmp/secret_key 
```

![ceph dashbaord showing the radosgw user created](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/it07tkpnmzndsp5znv8v.png)

#### Test Ceph S3-like API using boto

In your host machine setup a virtual Python environment using `virtualenv` in any directory you want.

```bash
virtualenv --python=python2.7 .venv
source .venv/bin/activate
pip install boto
```

I used Python 2.7 because it's what the official documentation supports but I do't think there would ny any issue for Python 3 and boto3 to work with Ceph API.


To make it more real-world-like I added the IP of the Ceph admin virtual machine to my `/etc/hosts` and named it 'objects.lan'

For more information about private networks and private domains check [my article](https://dev.to/akhal3d/maintain-local-domains-for-your-private-networks-47df) on this topic.

```
172.28.128.7    objects.lan
```


After that create the Python test file.

```python
# s3.py

import boto
import boto.s3.connection

# This is for quick demonstration purpose 
# Never write your credentials in a code
access_key = '05LT3KPECW7E30X2P4UO'
secret_key = 'bBEJBxiM6JkRDUzCpGzN7EkGaVr9qSjqlDdNZWMp'


host = 'objects.lan' # /etc/hosts

conn = boto.connect_s3(
        aws_access_key_id = access_key,
        aws_secret_access_key = secret_key,
        host = host,
        is_secure=False,               # uncomment if you are not using ssl
        calling_format = boto.s3.connection.OrdinaryCallingFormat(),
        )

# Create a new nucket
bucket = conn.create_bucket('my-new-bucket')


# List all buckets
for bucket in conn.get_all_buckets():
        print("{name}\t{created}".format(
                name = bucket.name,
                created = bucket.creation_date,
        ))


# Add object to bucket
key = bucket.new_key('hello.txt')
key.set_contents_from_string('Hello World!\n')

# Generate a presigned URL
object_key = bucket.get_key('hello.txt')

# Make the url available for 20 seconds only
object_url = object_key.generate_url(20, query_auth=True, force_http=True)
print(object_url)
```


Run it and you should get a similar result.

```
$ python s3.py 
my-new-bucket	2021-10-08T13:37:03.013Z
http://objects.lan/my-new-bucket/hello.txt?Signature=4ukxcnWqcNjbRKbF1gJ8%2FQ9eJMI%3D&Expires=1633873445&AWSAccessKeyId=05LT3KPECW7E30X2P4UO
```

Test it

```
$ for i in {1..5}; do curl 'http://objects.lan/my-new-bucket/hello.txt?Signature=4ukxcnWqcNjbRKbF1gJ8%2FQ9eJMI%3D&Expires=1633873445&AWSAccessKeyId=05LT3KPECW7E30X2P4UO'; sleep 5; done

Hello World!
Hello World!
Hello World!
<?xml version="1.0" encoding="UTF-8"?><Error><Code>AccessDenied</Code><RequestId>tx000000000000000000043-006162f2c5-455c5-default</RequestId><HostId>455c5-default-default</HostId></Error><?xml version="1.0" encoding="UTF-8"?><Error><Code>AccessDenied</Code><RequestId>tx000000000000000000044-006162f2ca-455c5-default</RequestId><HostId>455c5-default-default</HostId></Error
```

## File System
Creating and testing the files system is much easier and more straightforward.

To create a file system named cfs

```bash
ceph fs volume create cfs
```

Create a client to access the file system

```bash
ceph fs authorize cfs client.cfs / rw > /etc/ceph/ceph.client.cfs.keyring
```


Test it
```
mkdir /mnt/mycephfs/test
```

Now in the dashboard:
![ceph dashboard showing the directory we created](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/buyvxozxpgmx4ltado80.png)



## Notes
* You can send commands to Ceph clusters from a [client host](https://docs.ceph.com/en/latest/cephfs/mount-prerequisites/#general-pre-requisite-for-mounting-cephfs).

* AWS uses SSD (as in `gp2` and `gp3` types) doesn't work natievly with Ceph but there's a workaround for this using [ceph-volume](https://docs.ceph.com/en/pacific/ceph-volume/index.html).

* Ceph is designed by default to be highly available so it by default expects multiple nodes with multiple disks however it can be configured to work in a single node environment.
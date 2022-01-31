---
layout: post
title:  A tale of rsync
---

I was migrating `/var` directory on some on-premises server I was working on from a low space disk to a larger one and I had to use the infamous `rsync` for this. I found the necessary parameters to on this [article](https://linuxconfig.org/how-to-move-var-directory-to-another-partition) but I didn't like the idea of copying & pasting blindly without knowing what each parameters do. So I just looked the man page of rsync and decided to document what I found here for future references.

The full command I used:

```bash
rsync -aqx /var/* /mnt/newvar
```

Here's a table with each flag explained:


| Flag | Usage                                  |
|------|----------------------------------------|
| -a   | Shorthand for `-rlptgoD`               |
| -r   | Recursive                              |
| -l   | Copy symlinks as symlinks              |
| -p   | Preserve permissions                   |
| -t   | Preserve modification time             |
| -g   | Preserve group                         |
| -o   | Preserve user                          |
| -D   | Preserve devices files & special files |
| -x   | Don't cross filesystem boundaries ()   |
| -q   | Make it quiet                          |


The `-x` flag means don't copy other filesystem files and directories like NFS, Samba, ..etc. [1](https://unix.stackexchange.com/questions/107113/meaning-of-crossing-filesystem-boundaries-one-file-system-etc)